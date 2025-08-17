import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { Pokemon } from '../../core/pokemon.service';
import { selectLoading, selectPage, selectPageSize, selectPokemons, selectTotal, selectFilters } from '../state/pokemon.selectors';
import * as PokemonActions from '../state/pokemon.actions';
import { PokemonDetailDialog } from '../detail/pokemon-detail.dialog';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  pokemons$ = this.store.select(selectPokemons);
  total$ = this.store.select(selectTotal);
  loading$ = this.store.select(selectLoading);
  page$ = this.store.select(selectPage);
  pageSize$ = this.store.select(selectPageSize);
  filters$ = this.store.select(selectFilters);

  searchCtrl = this.fb.control('');
  filterForm = this.fb.group({
    type: [''],
    legendary: [''],
    speed: [0],
    speedMax: [200]
  });

  pageSizeOptions = [10, 20, 50, 100];

  constructor(private fb: FormBuilder, private dialog: MatDialog, private snack: MatSnackBar, private store: Store) {}

  ngOnInit() {
  this.store.dispatch(PokemonActions.initFromUrl());

  this.searchCtrl.valueChanges
    .pipe(debounceTime(300), takeUntil(this.destroy$))
    .subscribe(value => {
      this.store.dispatch(PokemonActions.setSearch({ name: value || '' }));
    });

  this.filterForm.valueChanges
    .pipe(debounceTime(200), takeUntil(this.destroy$))
    .subscribe(v => {
      this.store.dispatch(PokemonActions.setFilters({
        pokemonType: v.type || '',
        legendary: v.legendary === '' ? null : v.legendary === 'true',
        speedMin: v.speed ?? null,
        speedMax: v.speedMax ?? null
      }));
    });
}

  pageChanged(event: any) {
    this.store.dispatch(PokemonActions.changePage({ pageIndex: event.pageIndex, pageSize: event.pageSize }));
  }

  openDetail(id: number | undefined) {
    if (!id) return;
    this.dialog.open(PokemonDetailDialog, { data: { id }, width: '640px' });
  }

  toggleFavorite(id: number | undefined) {
    if (!id) return;
    this.store.dispatch(PokemonActions.toggleFavorite({ id }));
  }

  importCsv(files: FileList | null) {
    const file = files?.item(0);
    if (!file) return;
    this.store.dispatch(PokemonActions.importCsv({ file }));
    this.snack.open('Importing CSV...', undefined, { duration: 2000 });
  }

  ngOnDestroy() { this.destroy$.next(); this.destroy$.complete(); }
}
