include("Server.jl")
using .Server

println(":)")

function greet(name::AbstractString)
    return "hello, $name"
end

Server.start(greet)
