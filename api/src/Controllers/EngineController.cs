using Microsoft.AspNetCore.Mvc;
using api.Requests;

namespace api.Controllers;

[ApiController]
[Route("[controller]")]
public class EngineController : ControllerBase
{
  private static readonly string[] Summaries = new[]
  {
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
  };

  private readonly ILogger<EngineController> _logger;

  public EngineController(ILogger<EngineController> logger)
  {
    _logger = logger;
  }

  [HttpGet(Name = "GetWeatherForecast")]
  public IEnumerable<WeatherForecast> Get()
  {
    return Enumerable.Range(1, 5).Select(index => new WeatherForecast
    {
      Date = DateTime.Now.AddDays(index),
      TemperatureC = Random.Shared.Next(-20, 55),
      Summary = Summaries[Random.Shared.Next(Summaries.Length)]
    })
    .ToArray();
  }

  [HttpPost(Name = "Message")]
  public string Message(MessageRequest messageRequest)
  {
    string response = Client.Message(messageRequest.Message);
    return response;
  }
}
