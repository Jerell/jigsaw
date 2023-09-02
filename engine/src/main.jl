include("Server.jl")
include("Engine.jl")
using .Server
using .Engine

Server.start(Engine.process_pipe_request)
