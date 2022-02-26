#!/bin/bash
aws ecr get-login-password | docker login --username AWS --password-stdin 719823691862.dkr.ecr.ap-northeast-2.amazonaws.com/nest-server
docker-compose --compatibility pull
docker-compose --compatibility down -v
docker-compose --compatibility --env-file docker.env up -d
docker-compose --compatibility logs -f