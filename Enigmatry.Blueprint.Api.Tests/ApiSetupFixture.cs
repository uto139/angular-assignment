﻿using System.Net.Http.Json;
using Enigmatry.Blueprint.Api.Features.Users;
using Enigmatry.Blueprint.Api.Tests.Infrastructure.Api;
using Enigmatry.BuildingBlocks.AspNetCore.Tests.Http;
using Enigmatry.BuildingBlocks.Core;
using Enigmatry.BuildingBlocks.Core.Paging;
using Enigmatry.Blueprint.Model.Identity;
using Enigmatry.Blueprint.Model.Identity.Commands;
using Enigmatry.Blueprint.Model.Tests.Identity;
using FluentAssertions;
using NUnit.Framework;

namespace Enigmatry.Blueprint.Api.Tests;

[Category("integration")]
// Fixture that validates if Api project has been setup correctly
// Uses arbitrary controller (in this case UserController) and verifies if basic operations, e.g. get, post, validations are correctly setup.  
public class ApiSetupFixture : IntegrationFixtureBase
{
    private DateTimeOffset _createdOn;
    private DateTimeOffset _updatedOn;
    private User _user = null!;

    [SetUp]
    public void SetUp()
    {
        _createdOn = Resolve<ITimeProvider>().Now;
        _updatedOn = _createdOn;
        _user = new UserBuilder()
            .WithUserName("john_doe@john.doe")
            .WithName("John Doe");

        AddAndSaveChanges(_user);
    }

    [Test]
    public async Task TestGetAll()
    {
        var users = (await Client.GetAsync<PagedResponse<GetUsers.Response.Item>>("users"))?.Items.ToList()!;

        users.Should().NotBeNull();
        users.Count.Should().Be(3, "we have three users in the db, one added, one seeded and one created by current user provider");

        var item = users.Single(u => u.UserName == "john_doe@john.doe");
        item.Name.Should().Be("John Doe");
        item.CreatedOn.Should().Be(_createdOn);
        item.UpdatedOn.Should().Be(_updatedOn);
    }

    [Test]
    public async Task GivenValidUserId_GetById_ReturnsUserDetails()
    {
        var user = await Client.GetAsync<GetUserDetails.Response>($"users/{_user.Id}");

        user.Should().NotBeNull();

        user?.Name.Should().Be("John Doe");
        user?.UserName.Should().Be("john_doe@john.doe");
        user?.CreatedOn.Should().Be(_createdOn);
        user?.UpdatedOn.Should().Be(_updatedOn);
    }

    [Test]
    public async Task GivenNonExistingUserId_GetById_ReturnsNotFound()
    {
        var response = await Client.GetAsync($"users/{Guid.NewGuid()}");

        response.Should().BeNotFound();
    }

    [Test]
    public async Task TestCreate()
    {
        var command = new UserCreateOrUpdate.Command { Name = "some user", UserName = "someuser@test.com" };
        var user =
            await Client.PostAsync<UserCreateOrUpdate.Command, GetUserDetails.Response>("users", command);

        user?.UserName.Should().Be(command.UserName);
        user?.Name.Should().Be(command.Name);
        user?.CreatedOn.Date.Should().Be(DateTime.Now.Date);
        user?.UpdatedOn.Date.Should().Be(DateTime.Now.Date);
    }

    [Test]
    public async Task TestUpdate()
    {
        var command = new UserCreateOrUpdate.Command { Id = _user.Id, Name = "some user", UserName = "someuser@test.com" };
        var user =
            await Client.PostAsync<UserCreateOrUpdate.Command, GetUserDetails.Response>("users", command);

        user?.UserName.Should().Be("john_doe@john.doe", "username is immutable");
        user?.Name.Should().Be(command.Name);
        user?.CreatedOn.Date.Should().Be(_user.CreatedOn.Date);
        user?.UpdatedOn.Date.Should().Be(DateTime.Now.Date);
    }

    [TestCase("some user", "invalid email", "userName", "is not a valid email address.")]
    [TestCase("", "someuser@test.com", "name", "must not be empty.")]
    [TestCase("some user", "", "userName", "must not be empty.")]
    [TestCase("John Doe", "john_doe@john.doe", "userName", "Username already taken")]
    public async Task TestCreateReturnsValidationErrors(string name,
        string userName,
        string validationField,
        string validationErrorMessage)
    {
        var command = new UserCreateOrUpdate.Command { Name = name, UserName = userName };
        var response = await Client.PostAsJsonAsync("users", command);

        response.Should().BeBadRequest().And.ContainValidationError(validationField, validationErrorMessage);
    }
}