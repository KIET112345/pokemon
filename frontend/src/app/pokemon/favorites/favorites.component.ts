import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectFavorites } from "../state/pokemon.selectors";
import * as PokemonActions from "../state/pokemon.actions";

@Component({
  selector: "app-favorites",
  template: `
    <h2>Your Favorites</h2>
    <div class="card-grid">
      <mat-card *ngFor="let p of favorites$ | async" class="pokemon-card">
        <img
          [src]="p.pokemon.imageUrl || 'assets/pokemon/placeholder.png'"
          (error)="onErr($event)"
        />
        <h3>{{ p.pokemon.name }}</h3>
      </mat-card>
    </div>
  `,
})
export class FavoritesComponent implements OnInit {
  favorites$ = this.store.select(selectFavorites);
  

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(PokemonActions.loadFavorites());
    console.log('favorites$', this.favorites$)
  }

  onErr(e: any) {
    e.target.src = "assets/pokemon/placeholder.png";
  }
}
