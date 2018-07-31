﻿using System;
using Enigmatry.Blueprint.Core;
using Enigmatry.Blueprint.Model.Identity;
using Microsoft.EntityFrameworkCore;

namespace Enigmatry.Blueprint.Data.Migrations.Seeding
{
    public class UserSeeding : ISeeding
    {
        public void Seed(ModelBuilder modelBuilder)
        {
            User user = User.Create(new UserCreateOrUpdateCommand
            {
                Name = "Test",
                UserName = "Test"
            });

            user.SetCreated(DateTimeOffset.Now);

            modelBuilder.Entity<User>().HasData(user.WithId(Guid.NewGuid()));
        }
    }
}