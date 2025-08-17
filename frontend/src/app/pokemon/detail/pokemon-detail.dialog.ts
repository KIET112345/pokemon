import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PokemonService, Pokemon } from '../../core/pokemon.service';

@Component({
  selector: 'app-pokemon-detail-dialog',
  template: `
  <h2 mat-dialog-title>Pokémon Details</h2>
  <mat-dialog-content *ngIf="pokemon">
    <div class="flex gap-4">
      <img [src]="pokemon.imageUrl || 'assets/pokemon/placeholder.png'" alt="{{pokemon.name}}" width="160" (error)="onErr($event)">
      <div>
        <h3>{{ pokemon.name }}</h3>
        <p>Type: {{ pokemon.type1 }} <ng-container *ngIf="pokemon.type2">/ {{ pokemon.type2 }}</ng-container></p>
        <p>Speed: {{ pokemon.speed }}</p>
        <p>Legendary: {{ pokemon.legendary ? 'Yes' : 'No' }}</p>
      </div>
    </div>
  </mat-dialog-content>
  <mat-dialog-actions align="end">
    <button mat-stroked-button mat-dialog-close>Close</button>
  </mat-dialog-actions>
  `
})
export class PokemonDetailDialog implements OnInit {
  pokemon: Pokemon | null = null;
  constructor(@Inject(MAT_DIALOG_DATA) private data: { id: number }, private api: PokemonService) {}
  ngOnInit() {
    this.api.byId(this.data.id).subscribe(p => this.pokemon = p);
  }
  onErr(e:any){ e.target.src='assets/pokemon/placeholder.png'; }
}
