module Model

include("Bathymetry.jl")
include("Component.jl")

using StructTypes
using Ai4EComponentLib
using Ai4EComponentLib.IncompressiblePipe
using DifferentialEquations, ModelingToolkit
using Match

struct ReqBody
    components::Vector{Component}
    bathymetries::Dict{String,Bathymetry}
end

StructTypes.StructType(::Type{ReqBody}) = StructTypes.Struct()

function setupcomponents(rb::ReqBody)
    function construct(c::Component)
        D = 0.15

        function createpipesegments(i, lh)
            (l, (zin, zout)) = collect(lh)
            SimplePipe(
                L=l, D=D, f=0.023,
                name=Symbol(string(c.name, "-$i")),
                zin=zin,
                zout=zout
            )
        end

        @match c.type begin
            "source" => (c.ID, (c.type, [Source_P(D=D; name=Symbol(c.name))], c.outlets))
            "sink" => (c.ID, (c.type, [Sink_P(p=200000; name=Symbol(c.name))], c.outlets))
            "pipe" => (
                c.ID,
                (
                    c.type,
                    map(enumerate(lengthsandheights(rb.bathymetries[c.ID]))) do (i, lh)
                        createpipesegments(i, lh)
                    end,
                    c.outlets
                )
            )
            _ => error(string("unknown component type ", c.type))
        end
    end

    components = Dict(map(construct, rb.components))

    pipes = [v for v in values(components) if v[1] == "pipe"]
    firstpipesegment = pipes[1][2][1]
    lastpipesegment = pipes[end][2][end]
    function joinpipelist(pipelist)
        map((a, b) -> connect(a.out, b.in), pipelist, pipelist[2:end])
    end
    pipeeqs = collect(Iterators.flatten(map(
        p -> joinpipelist(p[2]),
        pipes
    )))

    function inlet(ctype::String, c)
        @match ctype begin
            "pipe" => c.in
            "source" => c.port
            "sink" => c.port
        end
    end

    function outlet(ctype::String, c)
        @match ctype begin
            "pipe" => c.out
            "source" => c.port
            "sink" => c.port
        end
    end

    function getinletof(id::String)
        cparams = components[id]
        ctype = cparams[1]
        component = cparams[2][1]
        inlet(ctype, component)
    end

    ft = Iterators.flatten([Iterators.product(
        [outlet(ctype, clist[end])],
        map(getinletof, outlets)
    ) for (id, (ctype, clist, outlets)) in pairs(components)])

    println(15)
    eqs = vcat(pipeeqs, [connect(a, b) for (a, b) in ft])
    println(eqs)

    collect(Iterators.flatten(map(x -> x[2], values(components)))), eqs, firstpipesegment, lastpipesegment
end

export ReqBody
export Bathymetry
export lengths
export zinzout
export lengthsandheights
export setupcomponents

end
