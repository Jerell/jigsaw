module Engine
using JSON3
using StructTypes

include("model/Model.jl")
using .Model

function process_pipe_request(reqbody::String)
    body = JSON3.read(reqbody, ReqBody; parsequoted=true)
    JSON3.pretty(body)

    println("")
    for (pipeid, coords) in body.bathymetries
        println("$pipeid $coords")
        println(lengths(coords))
    end

    return "end"
end

end
