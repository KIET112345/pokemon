# Inipod Pokémon — Angular 15 UI (NgRx + Angular Material)

This is a ready-to-run **Angular 15** frontend implementing the UI requirements from the assessment:
- Auth pages (Login/Signup)
- Responsive layout with Header / Sidebar / Footer
- Home page with 4 YouTube trailers and a Featured Pokémon grid
- Pokémon List with search (300ms debounce), advanced filters (type, legendary, speed range), pagination, CSV import button, URL query param sync
- Pokémon Detail modal (MatDialog)
- Favorites page
- **NgRx** store/effects wired to `PokemonService`
- Angular Material theme

> Backend endpoints are referenced via `environment.apiUrl`. If backend is not ready, you can stub responses in `PokemonService` or serve mock JSON from `/assets`.

## Getting started

```bash
npm install
npm start
```

Open http://localhost:4200

## Notes
- Angular 15 compatible versions pinned in `package.json`.
- NgRx 15 store with Pokémon slice.
- Material theme configured in `src/styles.scss`.
- Update `environment.ts` to point to your NestJS backend.
# pokemon-ui
