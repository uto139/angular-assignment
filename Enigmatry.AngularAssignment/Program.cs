using Enigmatry.AngularAssignment.Api;
using Enigmatry.AngularAssignment.Api.Filters;
using Enigmatry.AngularAssignment.Api.Models.BlogPosts;
using Enigmatry.AngularAssignment.Api.Services.BlogPosts;
using Enigmatry.AngularAssignment.Api.Services.Users;
using Microsoft.Extensions.Options;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwagger();

builder.Services.AddAutoMapper(Assembly.GetExecutingAssembly());

builder.Services.AddBlogPosts();

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
