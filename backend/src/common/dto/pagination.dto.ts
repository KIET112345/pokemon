import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, IsBooleanString, Min } from 'class-validator';

export class PokemonQueryDto {
  @Type(() => Number) @IsInt() @Min(0) @IsOptional() page?: number = 0;
  @Type(() => Number) @IsInt() @Min(1) @IsOptional() pageSize?: number = 20;

  @IsString() @IsOptional() name?: string;
  @IsString() @IsOptional() type?: string;
  @IsBooleanString() @IsOptional() legendary?: string;

  @Type(() => Number) @IsInt() @IsOptional() speedMin?: number;
  @Type(() => Number) @IsInt() @IsOptional() speedMax?: number;
}
