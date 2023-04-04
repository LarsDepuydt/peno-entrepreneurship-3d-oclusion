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

.PHONY: migrate_info
migrate_info:
	@echo "Showing database migration history..."
	@docker compose run --rm flyway info

GCP_PROJECT_ID := relu-backend
IMAGE_NAME := patient_server
SERVICE_NAME := relu-vr-backend
REGION := europe-west1

NEW_VERSION_TAG := <new-version-tag>
# make deploy-new-version NEW_VERSION_TAG=<new-version-tag>

.PHONY: deploy-new-version
deploy-new-version: re-tag push-to-gcr deploy-to-cloud-run

.PHONY: re-tag
re-tag:
	docker tag $(IMAGE_NAME) gcr.io/$(GCP_PROJECT_ID)/$(IMAGE_NAME):$(NEW_VERSION_TAG)

.PHONY: push-to-gcr
push-to-gcr:
	docker push gcr.io/$(GCP_PROJECT_ID)/$(IMAGE_NAME):$(NEW_VERSION_TAG)

.PHONY: deploy-to-cloud-run
deploy-to-cloud-run:
	gcloud run deploy $(SERVICE_NAME) --image gcr.io/$(GCP_PROJECT_ID)/$(IMAGE_NAME):$(NEW_VERSION_TAG) --platform managed --region $(REGION) --allow-unauthenticated

