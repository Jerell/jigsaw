module Request

include("Bathymetry.jl")
include("Component.jl")

struct ReqBody
    components::Vector{Component}
    bathymetries::Dict{String,Bathymetry}
end

export ReqBody

end