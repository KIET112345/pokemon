import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PokemonState } from './pokemon.reducer';

export const selectPokemonState = createFeatureSelector<PokemonState>('pokemon');

export const selectPokemons = createSelector(selectPokemonState, s => s.data);
export const selectTotal = createSelector(selectPokemonState, s => s.total);
export const selectLoading = createSelector(selectPokemonState, s => s.loading);
export const selectPage = createSelector(selectPokemonState, s => s.page);
export const selectPageSize = createSelector(selectPokemonState, s => s.pageSize);
export const selectFilters = createSelector(selectPokemonState, s => ({ name: s.name, type: s.type, legendary: s.legendary, speedMin: s.speedMin, speedMax: s.speedMax }));
export const selectFavorites = createSelector(selectPokemonState, s => s.favorites);
