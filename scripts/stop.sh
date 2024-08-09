#!/bin/bash

echo "Stopping the existing NestJS application..."

# Verifica se o processo do NestJS está em execução e o para
if pgrep -x "node" > /dev/null; then
  pm2 stop all
else
  echo "No NestJS application is running."
fi




