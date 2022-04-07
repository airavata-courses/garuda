docker login -u="${DOCKER_USERNAME}" -p="${DOCKER_PASSWORD}"

docker push acharyapranav/garuda:queue_worker_nasa-${PROJECT}
docker push acharyapranav/garuda:web_app-${PROJECT}
docker push acharyapranav/garuda:queue_worker_nasa-${PROJECT}
docker push acharyapranav/garuda:api_gateway-${PROJECT}
docker push acharyapranav/garuda:db_middleware-${PROJECT}
