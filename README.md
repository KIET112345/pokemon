# Pokémon Full-stack App (Angular + NestJS + PostgreSQL)

Run everything with Docker Compose:

```bash
docker compose up --build
```

Services:
- **db**: PostgreSQL 16
- **backend**: NestJS + TypeORM + JWT (http://localhost:3000)
- **frontend**: Angular app served by Nginx (http://localhost:8080)

Default credentials after signup (you create your own).

## Import Data
From the frontend **Pokémon List** page, click **Import CSV** and select the provided `pokemon_data.csv`.  
You can also import via API:
```bash
curl -X POST http://localhost:3000/pokemon/import   -H "Authorization: Bearer <token>"   -F "file=@pokemon_data.csv"
```

## Folder Structure
```
pokemon-app/
  docker-compose.yml
  .env
  backend/
  frontend/
```

## Notes
- Uses Angular standalone components + Angular Material + NgRx.
- URL query params are used for filters (name, type, legendary, speed ranges, page, pageSize).
- JWT stored in localStorage; an HTTP interceptor attaches it to API calls.
- PostgreSQL schema auto-synced by TypeORM for convenience. In production, use migrations.

## Quick API Reference
- Auth: `POST /auth/signup`, `POST /auth/login`, `POST /auth/logout` (client-side token drop)
- Pokémon:
  - `POST /pokemon/import` (multipart/form-data, field: `file`)
  - `GET /pokemon` (query: `page`, `pageSize`, `name`, `type`, `legendary`, `speedMin`, `speedMax`)
  - `GET /pokemon/:id`
- Favorites:
  - `POST /favorites/:pokemonId`
  - `DELETE /favorites/:pokemonId`
  - `GET /favorites`

## Environment
See `.env`. You can change DB credentials/ports.


### Tech choices added
- Angular Material for UI
- NgRx Store + Effects for state management (auth, pokemon list, favorites)
- NestJS DTOs with class-validator and global ValidationPipe for robust APIs
# pokemon-app
# pokemon
