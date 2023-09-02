module Model

include("Bathymetry.jl")
include("Component.jl")

using StructTypes

struct ReqBody
    components::Vector{Component}
    bathymetries::Dict{String,Bathymetry}
end

StructTypes.StructType(::Type{ReqBody}) = StructTypes.Struct()

function setupparams(rb::ReqBody)
    reshapers = Dict(
        "source" => x -> x,
        "sink" => x -> x,
        "pipe" => function (c)
            (
                c.ID,
                map(enumerate(lengthsandheights(rb.bathymetries[c.ID]))) do (i, lh)
                    (string(c.name, "-$i"), lh)
                end
            )
        end,
    )

    map(c -> reshapers[c.type](c), rb.components)
end

export ReqBody
export Bathymetry
export lengths
export zinzout
export lengthsandheights
export setupparams

end