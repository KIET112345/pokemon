import {
  Controller,
  Get,
  Post,
  Query,
  Param,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from "@nestjs/common";
import { PokemonQueryDto } from "../../common/dto/pagination.dto";
import { PokemonService } from "./pokemon.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { JwtAuthGuard } from "../auth/jwt.guard";
import { Express } from "express";
import { parse } from "csv-parse";

@Controller("pokemon")
export class PokemonController {
  constructor(private service: PokemonService) {}

  @UseGuards(JwtAuthGuard)
  @Post("import")
  @UseInterceptors(FileInterceptor("file"))
  async importCsv(@UploadedFile() file: Express.Multer.File) {
    // Convert to string
    let csv = file.buffer?.toString("utf-8") || "";

    // ✅ Strip BOM if present
    if (csv.charCodeAt(0) === 0xfeff) {
      csv = csv.slice(1);
    }

    const rows: any[] = await new Promise((resolve, reject) => {
      const out: any[] = [];
      parse(csv, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
      })
        .on("readable", function (this: any) {
          let record;
          while ((record = this.read())) out.push(record);
        })
        .on("error", reject)
        .on("end", () => resolve(out));
    });

    return this.service.import(rows);
  }

  @Get()
  list(@Query() q: PokemonQueryDto) {
    return this.service.findAll(q);
  }

  @Get(":id")
  detail(@Param("id") id: string) {
    return this.service.findOne(Number(id));
  }
}
