using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace api.Requests;

public record MessageRequest
{
  public MessageRequest(string message)
  {
    Message = message;
  }

  [JsonPropertyName("message")][Required] public string Message { get; set; }
}