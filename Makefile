db-up:
	docker compose -f infra/compose.yaml --env-file apps/api/.env up -d

db-down:
	docker compose -f infra/compose.yaml stop
