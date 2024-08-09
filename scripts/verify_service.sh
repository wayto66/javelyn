#!/bin/bash

echo "Verifying the NestJS application..."

# Verifica se o serviço está respondendo (ajuste a URL conforme necessário)
if curl -sSf http://localhost:4000/ > /dev/null; then
  echo "The NestJS application is running and healthy."
else
  echo "The NestJS application failed to start or is unhealthy."
  exit 1
fi
