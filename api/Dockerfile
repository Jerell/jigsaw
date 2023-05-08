FROM mcr.microsoft.com/dotnet/sdk:6.0-jammy as build
COPY . /app
WORKDIR /app

RUN dotnet restore
RUN dotnet publish -c Release -o publish src

FROM mcr.microsoft.com/dotnet/aspnet:6.0-jammy as run

WORKDIR /app
COPY --from=build /app/publish .

EXPOSE 80

ENTRYPOINT ["dotnet", "api.dll"]