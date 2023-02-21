.PHONY: up
up:
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


.PHONY: database_up
database_up:
	@docker exec -it peno-entrepreneurship-3d-oclusion-db-1 psql -U docker -W patient_server -f /usr/src/app/database/migrations/database.up.sql
	
