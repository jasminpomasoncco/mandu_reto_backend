import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, MaxLength, IsInt } from 'class-validator';

export class CreateDivisionDto {
  @ApiProperty()
  @IsString()
  @MaxLength(45)
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  ambassador?: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  upper_division_id?: number;
}
