﻿namespace Enigmatry.Blueprint.Data.Migrations.Seeding;

public static class DevelopmentConnectionsStrings
{
    private static readonly string DatabaseName = "Enigmatry.Blueprint".Replace(".", "-", StringComparison.InvariantCulture).ToLowerInvariant();
    public static string MainConnectionString => $"Server=.;Database={DatabaseName};Trusted_Connection=True;MultipleActiveResultSets=true";
    public static string IntegrationTestsConnectionString => $"Server=.;Database={DatabaseName}-integration-testing;Trusted_Connection=True;MultipleActiveResultSets=true";
}
