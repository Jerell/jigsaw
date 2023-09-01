module Engine
using JSON3
using StructTypes

include("model/Bathymetry.jl")
using Bathymetry

struct Component
    ID::String
    name::String
    outlets::Array{String}
    type::String
end

struct ReqBody
    components::Array{Component}
    bathymetries::Dict{String,Array{XYPoint}}
end

StructTypes.StructType(::Type{ReqBody}) = StructTypes.Struct()

function process_pipe_request(reqbody::String)
    body = JSON3.read(reqbody, ReqBody; parsequoted=true)
    JSON3.pretty(body)

    println("")
    for (pipeid, coords) in body.bathymetries
        println("$pipeid $coords")
    end

    return "end"
end

export XY

end