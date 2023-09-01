module Engine
using JSON3
using StructTypes

include("model/Model.jl")
using .Model
include("model/Request.jl")
using .Request


function process_pipe_request(reqbody::String)
    body = JSON3.read(reqbody, ReqBody; parsequoted=true)
    JSON3.pretty(body)

    println("")
    for (pipeid, coords) in body.bathymetries
        println("$pipeid $coords")
    end

    return "end"
end

end
