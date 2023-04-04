.PHONY: up
up: migrate
	@docker compose up -d --build --force-recreate backend frontend

.PHONY: down
down:
	@echo "🧹  Cleaning up development environment..."
	@docker compose down

.PHONY: logs
logs:
	@echo "📕  Viewing logs..."
	@docker compose logs -f

.PHONY: buf
buf:
	@docker compose run --rm app "buf lint && buf generate"

.PHONY: shell
shell:
	@docker compose run --rm app /bin/bash

.PHONY: install_frontend
install_frontend:
	@docker compose run --workdir /usr/src/app/frontend --rm app "yarn install"

.PHONY: migrate
migrate:
	@echo "🔄  Running database migrations..."
	@docker compose run --rm flyway migrate

