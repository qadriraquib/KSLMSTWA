#!/bin/bash

BACKEND_IMAGE="147.93.111.2:5000/kslmstwa-backend:1.0.0"
FRONTEND_IMAGE="147.93.111.2:5000/kslmstwa-frontend:1.0.0"
SERVER_USER="root"
SERVER_IP="147.93.111.2"
SERVER_PATH="/root/kslmstwa"
SSH_KEY="yaseen_hostinger"

echo " Starting deployment process..."

echo " Removing local images to ensure a fresh build..."
docker rmi $BACKEND_IMAGE $FRONTEND_IMAGE --force 2>/dev/null || true

echo " Building docker images..."
docker compose build

if [ $? -eq 0 ]; then
    echo " Build successful!"
    
    echo " Pushing images to registry..."
    docker push $BACKEND_IMAGE
    docker push $FRONTEND_IMAGE


    echo " Connecting to server ($SERVER_IP) to deploy..."
    ssh -i $SSH_KEY $SERVER_USER@$SERVER_IP << EOF
        cd $SERVER_PATH
        
        echo " Bringing down the running containers..."
        docker compose down
        
        echo " Removing existing images on the server..."
        docker rmi $BACKEND_IMAGE $FRONTEND_IMAGE --force 2>/dev/null || true
        
        echo " Pulling and starting the new containers..."
        docker compose up -d
        
        echo " Deployment finished successfully on the server!"
EOF
else
    echo " Build failed. Deployment aborted."
    exit 1
fi
