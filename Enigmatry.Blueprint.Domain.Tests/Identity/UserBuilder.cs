﻿using Enigmatry.Blueprint.Domain.Identity;
using Enigmatry.Blueprint.Domain.Identity.Commands;
using Enigmatry.BuildingBlocks.Core.Entities;

namespace Enigmatry.Blueprint.Model.Tests.Identity;

public class UserBuilder
{
    private string _name = String.Empty;
    private string _userName = String.Empty;
    private Guid _id = SequentialGuidGenerator.Generate();

    public UserBuilder WithUserName(string value)
    {
        _userName = value;
        return this;
    }

    public UserBuilder WithName(string value)
    {
        _name = value;
        return this;
    }

    public UserBuilder WithId(Guid id)
    {
        _id = id;
        return this;
    }

    public static implicit operator User(UserBuilder builder) => ToUser(builder);

    public static User ToUser(UserBuilder builder) => builder.Build();

    public User Build()
    {
        User result = User.Create(new CreateOrUpdateUser.Command
        {
            Name = _name,
            UserName = _userName
        }).WithId(_id);

        return result;
    }
}