import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DivisionService } from './division.service';
import { CreateDivisionDto } from './DTO/create-division.dto';

@Controller('division')
export class DivisionController {
  constructor(private readonly divisionService: DivisionService) {}

  @Post()
  create(@Body() dto: CreateDivisionDto) {
    return this.divisionService.create(dto);
  }
  @Get()
  findAll() {
    return this.divisionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.divisionService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: Partial<CreateDivisionDto>) {
    return this.divisionService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.divisionService.remove(+id);
  }

  @Get(':id/subdivisiones')
  getSubdivisiones(@Param('id') id: string) {
    return this.divisionService.findSubdivisiones(+id);
  }
}
