include("Bathymetry.jl")
using .Bathymetry

using Test

@testset "XY" begin
    a = XY(1.0, 1.0)
    b = XY(2.0, 2.0)

    @test a + b == XY(3.0, 3.0)
    @test b - a == XY(1.0, 1.0)
end

@testset "lengthbetween" begin
    a = XY(1.0, 1.0)
    b = XY(4.0, 5.0)

    @test lengthbetween(a, b) == 5
end

@testset "lengths" begin
    a = XY(1.0, 1.0)
    b = XY(4.0, 5.0)
    c = XY(5.0, 5.0)
    d = XY(5.0, 5.0)

    l = lengths([a, b, c, d])

    @test length(l) == 3
    @test l[1] == 5
    @test l[2] == 1
    @test l[3] == 0
end