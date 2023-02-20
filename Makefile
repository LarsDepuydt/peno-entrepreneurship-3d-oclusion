.PHONY: up
up:
	@docker compose up -d --build --force-recreate backend

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
