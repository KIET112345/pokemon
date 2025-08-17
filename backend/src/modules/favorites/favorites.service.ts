import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from '../../entities/favorite.entity';
import { Pokemon } from '../../entities/pokemon.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite) private favs: Repository<Favorite>,
    @InjectRepository(Pokemon) private pokemons: Repository<Pokemon>,
  ) {}

  async mark(userId: number, pokemonId: number) {
    const pokemon = await this.pokemons.findOne({ where: { id: pokemonId } });
    if (!pokemon) throw new NotFoundException('Pokemon not found');

    // check if already favorited
    const existing = await this.favs.findOne({
      where: { user: { id: userId } as any, pokemon: { id: pokemonId } as any },
    });
    if (existing) {
      throw new ConflictException('Already in favorites');
    }

    const fav = this.favs.create({ user: { id: userId } as any, pokemon });
    await this.favs.save(fav);

    return { success: true, favoriteId: fav.id };
  }

  async unmark(userId: number, pokemonId: number) {
    const fav = await this.favs.findOne({
      where: { user: { id: userId } as any, pokemon: { id: pokemonId } as any },
    });
    if (!fav) {
      throw new NotFoundException('Favorite not found');
    }
    await this.favs.remove(fav);

    return { success: true };
  }

  async list(userId: number) {
    const favorites = await this.favs.find({
      where: { user: { id: userId } as any },
      relations: ['pokemon'],
    });

    return {
      success: true,
      count: favorites.length,
      items: favorites.map(f => ({
        id: f.id,
        pokemon: {
          id: f.pokemon.id,
          name: f.pokemon.name,
          type1: f.pokemon.type1,
          type2: f.pokemon.type2,
          legendary: f.pokemon.legendary,
          imageUrl: f.pokemon.imageUrl
        },
      })),
    };
  }
}
