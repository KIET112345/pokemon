import { Entity, PrimaryGeneratedColumn, ManyToOne, Unique } from 'typeorm';
import { User } from './user.entity';
import { Pokemon } from './pokemon.entity';

@Entity()
@Unique(['user', 'pokemon'])
export class Favorite {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, u => u.favorites, { onDelete: 'CASCADE' })
  user!: User;

  @ManyToOne(() => Pokemon, p => p.favorites, { onDelete: 'CASCADE' })
  pokemon!: Pokemon;
}
