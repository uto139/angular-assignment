﻿using System;
using System.Linq;
using Autofac;
using Enigmatry.Blueprint.BuildingBlocks.Core.Data;
using Enigmatry.Blueprint.BuildingBlocks.EntityFramework;
using Enigmatry.Blueprint.BuildingBlocks.EntityFramework.Security;
using Enigmatry.Blueprint.Core.Settings;
using Enigmatry.Blueprint.Infrastructure.Api.Init;
using Enigmatry.Blueprint.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Module = Autofac.Module;

namespace Enigmatry.Blueprint.Infrastructure.Autofac.Modules
{
    public class EntityFrameworkModule : Module
    {
        public bool RegisterMigrationsAssembly { get; set; }

        protected override void Load(ContainerBuilder builder)
        {
            if (builder == null)
            {
                throw new ArgumentNullException(nameof(builder));
            }

            builder.RegisterGeneric(typeof(EntityFrameworkRepository<,>))
                .As(typeof(IRepository<>))
                .As(typeof(IRepository<,>))
                .InstancePerLifetimeScope();

            builder.RegisterAssemblyTypes(AssemblyFinder.InfrastructureAssembly)
                .Where(
                    type =>
                        ImplementsInterface(typeof(IRepository<>), type) ||
                        type.Name.EndsWith("Repository", StringComparison.InvariantCulture)
                ).AsImplementedInterfaces().InstancePerLifetimeScope();

            builder.Register(CreateDbContextOptions).As<DbContextOptions>().SingleInstance();

            // needs to be registered both as self and as DbContext or the tests might not work as expected
            builder.RegisterType<BlueprintContext>().AsSelf().As<DbContext>().InstancePerLifetimeScope();
            builder.RegisterType<DbContextUnitOfWork>().As<IUnitOfWork>().InstancePerLifetimeScope();

            // replace with actual implementation from the Building block
            builder.RegisterType<NullDbContextAccessTokenProvider>().As<IDbContextAccessTokenProvider>().InstancePerLifetimeScope();
        }

        private static bool ImplementsInterface(Type interfaceType, Type concreteType) =>
            concreteType.GetInterfaces().Any(
                t =>
                    (interfaceType.IsGenericTypeDefinition && t.IsGenericType
                        ? t.GetGenericTypeDefinition()
                        : t) == interfaceType);

        private DbContextOptions CreateDbContextOptions(IComponentContext container)
        {
            var loggerFactory = container.Resolve<ILoggerFactory>();
            var configuration = container.Resolve<IConfiguration>();
            var dbContextSettings = container.Resolve<DbContextSettings>();

            var optionsBuilder = new DbContextOptionsBuilder();

            optionsBuilder
                .UseLoggerFactory(loggerFactory)
                .EnableSensitiveDataLogging(configuration.SensitiveDataLoggingEnabled());

            optionsBuilder.UseSqlServer(configuration.GetConnectionString("BlueprintContext"),
                sqlOptions => SetupSqlOptions(sqlOptions, dbContextSettings));

            return optionsBuilder.Options;
        }

        private SqlServerDbContextOptionsBuilder SetupSqlOptions(SqlServerDbContextOptionsBuilder sqlOptions,
            DbContextSettings dbContextSettings)
        {
            //Configuring Connection Resiliency: https://docs.microsoft.com/en-us/ef/core/miscellaneous/connection-resiliency 
            sqlOptions = sqlOptions.EnableRetryOnFailure(
                dbContextSettings.ConnectionResiliencyMaxRetryCount,
                dbContextSettings.ConnectionResiliencyMaxRetryDelay,
                null);

            if (RegisterMigrationsAssembly)
            {
                sqlOptions = sqlOptions.MigrationsAssembly("Enigmatry.Blueprint.Data.Migrations");
            }

            return sqlOptions;
        }
    }
}
