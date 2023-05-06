FROM julia:latest

ENV JULIA_PROJECT=/app
WORKDIR /app
COPY . .
RUN julia -e 'using Pkg; Pkg.instantiate();'

EXPOSE 3000
CMD ["julia", "src/main.jl"]