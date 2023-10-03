﻿using Enigmatry.Blueprint.Api.Tests.Infrastructure.Configuration;
using Enigmatry.Blueprint.Api.Tests.Infrastructure.Impersonation;
using Enigmatry.Blueprint.Infrastructure.Data;
using Enigmatry.Entry.AspNetCore.Tests.Utilities.Database;
using Enigmatry.Entry.AspNetCore.Tests.Utilities;
using Enigmatry.Entry.Core.Data;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Enigmatry.Blueprint.Api.Tests.Infrastructure.Api;

public class IntegrationFixtureBase
{
    private IConfiguration _configuration = null!;
    private IServiceScope _testScope = null!;
    private static BlueprintWebApplicationFactory _factory = null!;
    private bool _seedUsers = true;
    private bool _isUserAuthenticated = true;

    protected HttpClient Client { get; private set; } = null!;

    [SetUp]
    protected void Setup()
    {
        _configuration = new TestConfigurationBuilder()
            .WithDbContextName(nameof(BlueprintContext))
            .Build();

        _factory = new BlueprintWebApplicationFactory(_configuration, _isUserAuthenticated);

        var scopeFactory = _factory.Services.GetRequiredService<IServiceScopeFactory>();
        _testScope = scopeFactory.CreateScope();
        Client = _factory.CreateClient();

        CreateDatabase();
        SeedUsers();
    }

    private void CreateDatabase()
    {
        var dbContext = _testScope.Resolve<BlueprintContext>();
        // On Azure we cannot drop db, we can only delete all tables
        DropAllDbObjects(dbContext.Database);
        // In case that we want to delete db call: dbContext.Database.EnsureDeleted()
        dbContext.Database.Migrate();
    }

    private static void DropAllDbObjects(DatabaseFacade database)
    {
        try
        {
            var dropAllSql = DatabaseHelpers.DropAllSql;
            foreach (var statement in dropAllSql.SplitStatements())
            {
                // WriteLine("Executing: " + statement);
                database.ExecuteSqlRaw(statement);
            }
        }
        catch (SqlException ex)
        {
            const int cannotOpenDatabaseErrorNumber = 4060;
            if (ex.Number == cannotOpenDatabaseErrorNumber)
            {
                WriteLine("Error while trying to drop all objects from database. Maybe database does not exist.");
                WriteLine("Continuing...");
                WriteLine(ex.ToString());
            }
            else
            {
                throw;
            }
        }
    }

    protected void DoNotSeedUsers() => _seedUsers = false;

    protected void DisableUserAuthentication() => _isUserAuthenticated = false;

    private void SeedUsers()
    {
        if (_seedUsers)
        {
            AddCurrentUserToDb();
        }
    }

    private void AddCurrentUserToDb()
    {
        var dbContext = _testScope.Resolve<DbContext>();
        dbContext.Add(TestUserData.CreateTestUser());
        dbContext.SaveChanges();
    }

    [TearDown]
    public void Teardown()
    {
        _factory.Dispose();
        _testScope.Dispose();
        Client.Dispose();
    }

    protected void AddAndSaveChanges<T>(params T[] entities)
    {
        var dbContext = Resolve<DbContext>();

        foreach (var entity in entities)
        {
            dbContext.Add(entity!);
        }

        dbContext.SaveChanges();
    }

    protected void AddAndSaveChanges(params object[] entities)
    {
        var dbContext = Resolve<DbContext>();

        foreach (var entity in entities)
        {
            dbContext.Add(entity);
        }

        dbContext.SaveChanges();
    }

    protected void AddToContext(params object[] entities) =>
        AddToContext(entities.AsEnumerable());

    protected void AddToContext(IEnumerable<object> entities)
    {
        var dbContext = Resolve<DbContext>();

        foreach (var entity in entities)
        {
            dbContext.Add(entity);
        }
    }

    protected async Task SaveChanges()
    {
        var unitOfWork = _testScope.Resolve<IUnitOfWork>();
        await unitOfWork.SaveChangesAsync();
    }

    protected IQueryable<T> QueryDb<T>() where T : class =>
        Resolve<DbContext>().Set<T>();

    protected IQueryable<T> QueryDbSkipCache<T>() where T : class =>
        Resolve<DbContext>().Set<T>().AsNoTracking();

    protected T Resolve<T>() where T : notnull => _testScope.Resolve<T>();

    private static void WriteLine(string message) => TestContext.WriteLine(message);
}
