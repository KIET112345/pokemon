import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Favorite } from './favorite.entity';

@Entity()
export class Pokemon {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  type1!: string;

  @Column({ nullable: true })
  type2!: string;

  @Column({ type: 'int' })
  total!: number;

  @Column({ type: 'int' })
  hp!: number;
  @Column({ type: 'int' })
  attack!: number;
  @Column({ type: 'int' })
  defense!: number;
  @Column({ name: 'sp_atk', type: 'int' })
  spAtk!: number;
  @Column({ name: 'sp_def', type: 'int' })
  spDef!: number;
  @Column({ type: 'int' })
  speed!: number;
  @Column({ type: 'int' })
  generation!: number;

  @Column({ default: false })
  legendary!: boolean;

  @Column({ nullable: true })
  imageUrl!: string;

  @OneToMany(() => Favorite, fav => fav.pokemon)
  favorites!: Favorite[];
}
