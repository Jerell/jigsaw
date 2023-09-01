module Request

using StructTypes

include("Bathymetry.jl")
include("Component.jl")

struct ReqBody
    components::Vector{Component}
    bathymetries::Dict{String,Bathymetry}
end

StructTypes.StructType(::Type{ReqBody}) = StructTypes.Struct()

export ReqBody

end