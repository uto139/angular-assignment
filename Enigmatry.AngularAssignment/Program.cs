using Enigmatry.AngularAssignment.Api.Models.BlogPosts;
using Enigmatry.AngularAssignment.Api.Services.BlogPosts;
using Enigmatry.AngularAssignment.Api.Services.Users;
using Microsoft.Extensions.Options;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
options.CustomSchemaIds(type =>
{
    // Check if the type is a nested class
    if (type.IsNested)
    {
        // For nested classes, include both outer and nested class names
        var outerClassName = type.DeclaringType.Name;
        var nestedClassName = type.Name;
        return $"{outerClassName}{nestedClassName}";
    }
    else
    {
        // For non-nested classes, use only the class name
        return type.Name;
    }
}));

builder.Services.AddAutoMapper(Assembly.GetExecutingAssembly());

builder.Services.AddSingleton<List<BlogPost>>();
builder.Services.AddSingleton<BlogPostService>();
builder.Services.AddSingleton<UserService>();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    app.UseCors(builder => builder
    .WithOrigins("http://localhost:4200", "https://localhost:7258/swagger/index.html")
    .AllowCredentials()
    .AllowAnyMethod()
    .AllowAnyHeader());
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
