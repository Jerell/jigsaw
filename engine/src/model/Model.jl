module Model

include("Bathymetry.jl")
include("Component.jl")

using StructTypes

struct ReqBody
    components::Vector{Component}
    bathymetries::Dict{String,Bathymetry}
end

StructTypes.StructType(::Type{ReqBody}) = StructTypes.Struct()

export ReqBody
export Bathymetry
export lengths
export zinzout

end