module Engine
using JSON3
using Ai4EComponentLib
using Ai4EComponentLib.IncompressiblePipe
using DifferentialEquations, ModelingToolkit

include("model/Model.jl")
using .Model

function process_pipe_request(reqbody::String)
    body = JSON3.read(reqbody, ReqBody; parsequoted=true)
    JSON3.pretty(body)
    println("")

    for component in body.components
        println(string(component.name, " ", component.type))

    end

    D = 0.15
    @named staticsource = Source_P(D=D)
    @named staticsink = Sink_P(p=200000)

    for (pipeid, coords) in body.bathymetries
        println("$pipeid $coords")
        c = body.components[findfirst(x -> x.ID == pipeid, body.components)]

        pipes = map(enumerate(lengths(coords))) do (i, l)
            SimplePipe(L=l, D=D, f=0.023, name=Symbol(string(c.name, "-", i)))
        end

        eqs = [
            connect(staticsource.port, pipes[1].in),
            map((a, b) -> connect(a.out, b.in), pipes, pipes[2:end])...,
            connect(pipes[end].out, staticsink.port)
        ]

        @named model = compose(ODESystem(eqs, t, name=:funs), [staticsource, staticsink, pipes...])

        sys = structural_simplify(model)

        prob = ODEProblem(sys, [], (0.0, 0.0))

        println(sys)
        println(prob)
    end

    return "end"
end

end
