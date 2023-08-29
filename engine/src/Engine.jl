module Engine
using JSON3

function parse_json(json_string::String)
    parsed = JSON3.read(json_string)
    JSON3.pretty(parsed)
    println("")
    return parsed
end

function process_pipe_request(reqbody::String)
    bathymetries = parse_json(reqbody)["bathymetries"]

    for (pipeid, coords) in bathymetries
        print("$pipeid ")
        println(coords)
    end

    return "end"
end

end
