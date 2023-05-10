﻿using Enigmatry.Blueprint.Domain.Identity;
using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Enigmatry.Blueprint.Infrastructure.Data.Configurations;

[UsedImplicitly]
public class UserEntityConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.Property(x => x.UserName).IsRequired().HasMaxLength(200);
        builder.Property(x => x.Name).IsRequired().HasMaxLength(200);
        builder.Property(x => x.CreatedOn).IsRequired();

        builder.HasIndex(x => x.UserName).IsUnique();

        builder.HasMany(x => x.CreatedUsers).WithOne(x => x.CreatedBy!).OnDelete(DeleteBehavior.NoAction);
        builder.HasMany(x => x.UpdatedUsers).WithOne(x => x.UpdatedBy!).OnDelete(DeleteBehavior.NoAction);
        builder.HasMany(x => x.CreatedProducts).WithOne(x => x.CreatedBy!).OnDelete(DeleteBehavior.NoAction);
        builder.HasMany(x => x.UpdatedProducts).WithOne(x => x.UpdatedBy!).OnDelete(DeleteBehavior.NoAction);
    }
}