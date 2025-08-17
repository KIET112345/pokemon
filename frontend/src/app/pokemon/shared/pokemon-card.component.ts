import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pokemon } from '../../core/pokemon.service';

@Component({
  selector: 'app-pokemon-card',
  template: `
  <mat-card class="pokemon-card">
    <img [src]="pokemon?.imageUrl || 'assets/pokemon/placeholder.png'" [alt]="pokemon?.name" (error)="onImgError($event)"/>
    <h3>{{ pokemon?.name }}</h3>
    <div>
      <button mat-icon-button color="warn" (click)="favorite.emit(pokemon?.id)">
        <mat-icon>favorite</mat-icon>
      </button>
      <button mat-stroked-button color="primary" (click)="open.emit(pokemon?.id)">Details</button>
    </div>
  </mat-card>
  `
})
export class PokemonCardComponent {
  @Input() pokemon: Pokemon | null = null;
  @Output() open = new EventEmitter<number>();
  @Output() favorite = new EventEmitter<number>();
  onImgError(e: any) { e.target.src = 'assets/pokemon/placeholder.png'; }
}
