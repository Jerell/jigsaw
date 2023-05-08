using NetMQ.Sockets;
using NetMQ;

namespace api;

public class Client
{
  public static string Message(string outgoing)
  {
    string response = "";
    using (var requester = new RequestSocket())
    {
      requester.Connect("tcp://engine:3000");
      requester.SendFrame(outgoing);
      response = requester.ReceiveFrameString();

      requester.Close();
    }
    return response;
  }
}