struct Point
    x::Real
    y::Real
end

XY = Point # alias

Base.:+(a::Point, b::Point)::Point = Point(a.x + b.x, a.y + b.y)
Base.:-(a::Point, b::Point)::Point = Point(a.x - b.x, a.y - b.y)
Base.:abs(a::Point)::Real = sqrt(a.x^2 + a.y^2)

Bathymetry = Vector{Point}

function lengthbetween(a::Point, b::Point)
    abs(b - a)
end

function lengths(points::Bathymetry)
    map(lengthbetween, points, points[2:end])
end
