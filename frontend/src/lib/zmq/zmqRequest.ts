import zmq from 'zeromq';

export default async function zmqRequest(
  message: zmq.MessageLike,
  server: string = 'tcp://engine:3000'
) {
  const sock = new zmq.Request();

  sock.connect(server);
  console.log('Producer bound to port 3000');

  await sock.send(message);
  const [result] = await sock.receive();

  console.log(result);
  return result;
}
