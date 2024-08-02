# Define variables
DOCKER_COMPOSE = docker compose

# Build the Docker image and start the container
start:
	$(DOCKER_COMPOSE) up -d

logs: start
	$(DOCKER_COMPOSE) logs -f

# Stop the Docker container
stop:
	$(DOCKER_COMPOSE) down

# Clean up Docker images and containers
clean:
	$(DOCKER_COMPOSE) down --rmi all

# Rebuild the Docker image
rebuild: stop
	$(DOCKER_COMPOSE) up -d --build

# Restart the Docker container
restart: stop start

.PHONY: start stop clean rebuild restart
