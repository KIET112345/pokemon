import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as P from "./pokemon.actions";
import { PokemonService } from "../../core/pokemon.service";
import { catchError, map, of, switchMap, withLatestFrom, tap } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "../../store";
import { selectPokemonState } from "./pokemon.selectors";
import { Router } from "@angular/router";

@Injectable()
export class PokemonEffects {
  constructor(
    private actions$: Actions,
    private api: PokemonService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  initFromUrl$ = createEffect(() =>
    this.actions$.pipe(
      ofType(P.initFromUrl),
      switchMap(() => of(P.load()))
    )
  );

  // Load whenever filters/page changes
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(P.load, P.setSearch, P.setFilters, P.changePage),
      withLatestFrom(this.store.select(selectPokemonState)),
      switchMap(([_, s]) =>
        this.api
          .list({
            page: s.page,
            limit: s.pageSize,
            name: s.name,
            type: s.type,
            legendary: s.legendary,
            speedMin: s.speedMin,
            speedMax: s.speedMax,
          })
          .pipe(
            map((payload) => P.loadSuccess({ payload })),
            catchError((error) => of(P.loadFailure({ error })))
          )
      )
    )
  );

  // Sync query params to URL
  syncUrl$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(P.setSearch, P.setFilters, P.changePage),
        withLatestFrom(this.store.select(selectPokemonState)),
        tap(([_, s]) => {
          const queryParams: any = {
            page: s.page,
            limit: s.pageSize,
          };
          if (s.name) queryParams.name = s.name;
          if (s.type) queryParams.type = s.type;
          if (s.legendary != null) queryParams.legendary = s.legendary;
          if (s.speedMin != null) queryParams.speedMin = s.speedMin;
          if (s.speedMax != null) queryParams.speedMax = s.speedMax;
          // Update URL without navigating away
          const url = this.router
            .createUrlTree(["/pokemon"], { queryParams })
            .toString();
          window.history.replaceState({}, "", url);
        })
      ),
    { dispatch: false }
  );

  toggleFavorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(P.toggleFavorite),
      switchMap(({ id }) =>
        this.api.toggleFavorite(id).pipe(
          // naive approach: reload list after toggle
          map(() => P.load()),
          catchError((err) => of(P.loadFailure({ error: err })))
        )
      )
    )
  );

  importCsv$ = createEffect(() =>
    this.actions$.pipe(
      ofType(P.importCsv),
      switchMap(({ file }) =>
        this.api.importCsv(file).pipe(
          map(() => P.importCsvSuccess()),
          catchError((error) => of(P.importCsvFailure({ error })))
        )
      )
    )
  );

  loadFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(P.loadFavorites),
      switchMap(() =>
        this.api.favorites().pipe(
          map((res: any) => P.loadFavoritesSuccess({ favorites: res.items })),
          catchError((error) => of(P.loadFavoritesFailure({ error })))
        )
      )
    )
  );
}
