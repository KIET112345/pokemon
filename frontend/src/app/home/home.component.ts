import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectPokemons } from "../pokemon/state/pokemon.selectors";
import * as PokemonActions from "../pokemon/state/pokemon.actions";
import { map } from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit {
  trailers = [
    "https://www.youtube.com/embed/uBYORdr_TY8",
    "https://www.youtube.com/embed/bILE5BEyhdo",
    "https://www.youtube.com/embed/EMJ2V9W4V_A",
    "https://www.youtube.com/embed/bvSe6pMvUj8",
  ];
  pokemons$ = this.store
    .select(selectPokemons)
    .pipe(map((pokemons) => pokemons.slice(0, 10)));

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(PokemonActions.initFromUrl());
  }
}
