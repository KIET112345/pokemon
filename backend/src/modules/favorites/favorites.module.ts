import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from '../../entities/favorite.entity';
import { Pokemon } from '../../entities/pokemon.entity';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite, Pokemon])],
  providers: [FavoritesService],
  controllers: [FavoritesController]
})
export class FavoritesModule {}
