import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  Req,
  UseGuards,
  BadRequestException,
  UnauthorizedException,
} from "@nestjs/common";
import { FavoritesService } from "./favorites.service";
import { JwtAuthGuard } from "../auth/jwt.guard";

@UseGuards(JwtAuthGuard)
@Controller("favorites")
export class FavoritesController {
  constructor(private favs: FavoritesService) {}

  @Post(":pokemonId")
  async mark(@Param("pokemonId") pokemonId: string, @Req() req: any) {
    const userId = this.parseId(req.user?.userId, "userId");
    const pokeId = this.parseId(pokemonId, "pokemonId");
    await this.favs.mark(userId, pokeId);
    return { ok: true, favorite: true };
  }

  @Delete(":pokemonId")
  async unmark(@Param("pokemonId") pokemonId: string, @Req() req: any) {
    const userId = this.parseId(req.user?.userId, "userId");
    const pokeId = this.parseId(pokemonId, "pokemonId");
    await this.favs.unmark(userId, pokeId);
    return { ok: true, favorite: false };
  }

  @Get()
  list(@Req() req: any) {
    const userId = Number(req.user?.userId);
    if (!userId || isNaN(userId)) {
      throw new UnauthorizedException("Invalid user in token");
    }
    return this.favs.list(userId);
  }

  private parseId(value: any, field: string): number {
    const n = Number(value);
    if (!Number.isInteger(n) || n <= 0) {
      throw new BadRequestException(`Invalid ${field}: ${value}`);
    }
    return n;
  }
}
