#!/bin/bash

echo "Starting the NestJS application..."

cd /home/ec2-user/javelyn

pm2 start npm --name "javelyn" -- run start
