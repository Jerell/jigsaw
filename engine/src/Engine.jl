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

    (components, eqs, firstpipesegment, lastpipesegment) = setupcomponents(body)

    println(components)
    println(eqs)

    @named model = compose(ODESystem(eqs, t, name=:funs), components)

    sys = structural_simplify(model)

    prob = ODEProblem(sys, [], (0.0, 0.0))

    println(sys)
    println(prob)

    println("solving")
    sol = solve(prob)
    qin = sol[firstpipesegment.in.q]
    println("qin $qin")

    println(sol)

    return JSON3.write(Dict("retcode" => sol.retcode, "t" => sol.t, "u" => sol.u))
end

end
