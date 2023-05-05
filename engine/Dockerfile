FROM julia:latest

WORKDIR /app
COPY . .
RUN julia install.jl

EXPOSE 3000
CMD ["julia", "src/main.jl"]