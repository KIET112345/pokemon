import { createReducer, on } from "@ngrx/store";
import * as Actions from "./pokemon.actions";
import { Pokemon } from "../../core/pokemon.service";

export interface PokemonState {
  data: Pokemon[];
  total: number;
  page: number;
  pageSize: number;
  loading: boolean;
  name: string;
  type: string;
  legendary: boolean | null;
  speedMin: number | null;
  speedMax: number | null;
  favorites: Pokemon[];
}

export const initialState: PokemonState = {
  data: [],
  total: 0,
  page: 0,
  pageSize: 20,
  loading: false,
  name: "",
  type: "",
  legendary: null,
  speedMin: null,
  speedMax: null,
  favorites: [],
};

export const pokemonReducer = createReducer(
  initialState,
  on(Actions.setSearch, (s, { name }) => ({ ...s, name, page: 0 })),
  on(
    Actions.setFilters,
    (s, { pokemonType, legendary, speedMin, speedMax }) => ({
      ...s,
      type: pokemonType,
      legendary,
      speedMin,
      speedMax,
      page: 0,
    })
  ),

  on(Actions.changePage, (s, { pageIndex, pageSize }) => ({
    ...s,
    page: pageIndex,
    pageSize,
  })),
  on(Actions.load, (s) => ({ ...s, loading: true })),
  on(Actions.loadSuccess, (s, { payload }) => ({
    ...s,
    loading: false,
    data: payload.items,
    total: payload.total,
    page: payload.page,
    pageSize: payload.pageSize,
  })),
  on(Actions.loadFailure, (s) => ({ ...s, loading: false })),
  on(Actions.loadFavoritesSuccess, (s, { favorites }) => ({
    ...s,
    favorites,
  }))
);
