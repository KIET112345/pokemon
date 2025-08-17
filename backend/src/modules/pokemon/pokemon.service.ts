import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  Repository,
  ILike,
  Between,
  FindOptionsWhere,
  DeepPartial,
} from "typeorm";
import { Pokemon } from "../../entities/pokemon.entity";

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(Pokemon) private pokemons: Repository<Pokemon>
  ) {}

  async import(rows: any[]) {
    const entities: DeepPartial<Pokemon>[] = rows
      .filter((r) => r.name) // ignore bad rows
      .map((r) => {
        return {
          name: r.name?.trim(),
          type1: r.type1?.trim() || null,
          type2: r.type2?.trim() || null,
          total: this.toNumber(r.total),
          hp: this.toNumber(r.hp),
          attack: this.toNumber(r.attack),
          defense: this.toNumber(r.defense),
          spAtk: this.toNumber(r.spAttack),
          spDef: this.toNumber(r.spDefense),
          speed: this.toNumber(r.speed),
          generation: this.toNumber(r.generation),
          legendary: String(r.legendary).toLowerCase() === "true",
          imageUrl: r.image || null,
        };
      });

    console.log("Entity keys:", Object.keys(entities[0] || {}));

    if (entities.length > 0) {
      const batchSize = 1000;
      for (let i = 0; i < entities.length; i += batchSize) {
        const chunk = entities.slice(i, i + batchSize);
        await this.pokemons.save(chunk);
      }
    }

    return { inserted: entities.length };
  }

  private toNumber(value: any): number {
    if (value === null || value === undefined || value === "") {
      return 0;
    }
    const n = Number(value);
    if (isNaN(n) || !isFinite(n)) {
      return 0;
    }
    return Math.floor(n);
  }

  async findAll(query: any) {
    // page (0-based)
    const rawPage = Number(query.page);
    const page = isNaN(rawPage) || rawPage < 0 ? 0 : rawPage;

    // pageSize / limit (fallback to 20)
    const rawLimit = Number(query.pageSize ?? query.limit);
    const pageSize = Math.min(100, rawLimit > 0 ? rawLimit : 20);

    // build filters
    const where: FindOptionsWhere<Pokemon> = {};
    if (query.name) where.name = ILike(`%${query.name}%`);
    const validTypes = [
      "Normal",
      "Fire",
      "Water",
      "Grass",
      "Electric",
      "Ice",
      "Fighting",
      "Poison",
      "Ground",
      "Flying",
      "Psychic",
      "Bug",
      "Rock",
      "Ghost",
      "Dark",
      "Dragon",
      "Steel",
      "Fairy",
    ];

    if (query.type && validTypes.includes(query.type)) {
      where.type1 = ILike(query.type);
    }

    if (query.legendary !== undefined) {
      const v = String(query.legendary).toLowerCase();
      if (v === "true" || v === "false") where.legendary = v === "true";
    }
    if (query.speedMin || query.speedMax) {
      const min = Number(query.speedMin) || 0;
      const max = Number(query.speedMax) || 1000;
      console.log(min, max);
      where.speed = Between(min, max);
    }

    // query DB
    const [items, total] = await this.pokemons.findAndCount({
      where,
      order: { id: "ASC" },
      skip: page * pageSize,
      take: pageSize,
    });

    return {
      success: true,
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
      items,
    };
  }
  findOne(id: number) {
    return this.pokemons.findOne({ where: { id } });
  }
}
