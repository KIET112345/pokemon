import { createAction, props } from '@ngrx/store';
import { Pokemon, PaginatedPokemon } from '../../core/pokemon.service';

export const initFromUrl = createAction('[Pokemon] Init From URL');

export const load = createAction('[Pokemon] Load');
export const loadSuccess = createAction('[Pokemon] Load Success', props<{ payload: PaginatedPokemon }>());
export const loadFailure = createAction('[Pokemon] Load Failure', props<{ error: any }>());

export const setSearch = createAction('[Pokemon] Set Search', props<{ name: string }>());
export const setFilters = createAction(
  '[Pokemon] Set Filters',
  props<{
    pokemonType: string;
    legendary: boolean | null;
    speedMin: number | null;
    speedMax: number | null;
  }>()
);

export const changePage = createAction('[Pokemon] Change Page', props<{ pageIndex: number; pageSize: number }>());

export const toggleFavorite = createAction('[Pokemon] Toggle Favorite', props<{ id: number }>());

export const importCsv = createAction('[Pokemon] Import CSV', props<{ file: File }>());
export const importCsvSuccess = createAction('[Pokemon] Import CSV Success');
export const importCsvFailure = createAction('[Pokemon] Import CSV Failure', props<{ error: any }>());
export const loadFavorites = createAction('[Pokemon] Load Favorites');
export const loadFavoritesSuccess = createAction('[Pokemon] Load Favorites Success', props<{ favorites: Pokemon[] }>());
export const loadFavoritesFailure = createAction('[Pokemon] Load Favorites Failure', props<{ error: any }>());

