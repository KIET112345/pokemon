import { IsString, MinLength, MaxLength } from 'class-validator';

export class CredentialsDto {
  @IsString() @MinLength(3) @MaxLength(32) username!: string;
  @IsString() @MinLength(6) @MaxLength(128) password!: string;
}
