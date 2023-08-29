include("Server.jl")
using .Server
include("Engine.jl")
using .Engine

Server.start(Engine.process_pipe_request)
