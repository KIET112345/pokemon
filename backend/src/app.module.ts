import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Pokemon } from './entities/pokemon.entity';
import { Favorite } from './entities/favorite.entity';
import { AuthModule } from './modules/auth/auth.module';
import { PokemonModule } from './modules/pokemon/pokemon.module';
import { FavoritesModule } from './modules/favorites/favorites.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT || 5432),
        username: process.env.DB_USER || 'pokemon',
        password: process.env.DB_PASS || 'pokemon',
        database: process.env.DB_NAME || 'pokemondb',
        entities: [User, Pokemon, Favorite],
        synchronize: true
      }),
    }),
    TypeOrmModule.forFeature([User, Pokemon, Favorite]),
    AuthModule,
    PokemonModule,
    FavoritesModule,
  ],
})
export class AppModule {}
