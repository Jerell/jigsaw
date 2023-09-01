module Bathymetry

struct Point
    x::Real
    y::Real
end

XY = Point

Base.:+(a::Point, b::Point)::Point = Point(a.x + b.x, a.y + b.y)
Base.:-(a::Point, b::Point)::Point = Point(a.x - b.x, a.y - b.y)
Base.:abs(a::Point)::AbstractFloat = sqrt(a.x^2 + a.y^2)

function lengthbetween(a::Point, b::Point)
    abs(b - a)
end

function lengths(points::Vector{Point})
    map((a, b) -> lengthbetween(a, b), points, points[2:end])
end

export XY
export lengthbetween
export lengths

end