include("Server.jl")
using .Server
include("Engine.jl")
using .Engine

function greet(name::AbstractString)
    return "o, $name"
end

Server.start(Engine.process_pipe_request)
