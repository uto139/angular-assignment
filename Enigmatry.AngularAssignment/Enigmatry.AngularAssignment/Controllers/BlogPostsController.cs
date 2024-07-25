using Microsoft.AspNetCore.Mvc;

namespace Enigmatry.AngularAssignment.Controllers;
[ApiController]
[Route("[controller]")]
public class BlogPostsController : ControllerBase
{
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private readonly ILogger<BlogPostsController> _logger;

    public BlogPostsController(ILogger<BlogPostsController> logger)
    {
        _logger = logger;
    }

    [HttpGet(Name = "GetWeatherForecast")]
    public IEnumerable<WeatherForecast> Get()
    {
        return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        {
            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            TemperatureC = 1,
            Summary = Summaries[1]
        })
        .ToArray();
    }
}
