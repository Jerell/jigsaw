module Server
using ZMQ

function start(process_message::Function)
    context = Context()
    socket = Socket(context, REP)
    ZMQ.bind(socket, "tcp://*:3000")
    println("starting socket server")

    while true
        # Wait for next request from client
        message = String(ZMQ.recv(socket))
        println("Received request: $message")

        result = process_message(message)
        println("result: $result")
        response = result
        # Send reply back to client
        if isopen(socket)
            println("\nresponse:")
            println(response)
            ZMQ.send(socket, response)
            println("")
        else
            println("socket was closed")
            println(socket)
            println(context)
        end
    end

    println("stopping")
    ZMQ.close(socket)
    ZMQ.close(context)
end

end
