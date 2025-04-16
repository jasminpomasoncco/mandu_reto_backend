import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Division } from './division.entity';
import { CreateDivisionDto } from './DTO/create-division.dto';
import { UpdateDivisionDto } from './DTO/update-division.dto';

@Injectable()
export class DivisionService {
  constructor(
    @InjectRepository(Division)
    private divisionRepository: Repository<Division>,
  ) {}

  async create(dto: CreateDivisionDto): Promise<Division> {
    const exists = await this.divisionRepository.findOne({
      where: { name: dto.name },
    });
    if (exists) {
      throw new BadRequestException('Ya existe una división con ese nombre');
    }

    const division = this.divisionRepository.create({
      name: dto.name,
      ambassador: dto.ambassador,
      level: Math.floor(Math.random() * 10) + 1,
      number_collaborators: Math.floor(Math.random() * 100) + 1,
    });

    if (dto.upper_division_id) {
      const upper_division = await this.divisionRepository.findOne({
        where: { id: dto.upper_division_id },
      });
      if (!upper_division) {
        throw new NotFoundException('División superior no encontrada');
      }
      division.upper_division = upper_division;
    }

    return this.divisionRepository.save(division);
  }

  async findAll(): Promise<any[]> {
    const divisions = await this.divisionRepository.find({
      relations: ['subdivisions', 'upper_division'],
    });
    return divisions.map((division) => ({
      ...division,
      subdivisionCount: division.subdivisions?.length || 0,
    }));
  }

  async findOne(id: number): Promise<Division> {
    const division = await this.divisionRepository.findOne({
      where: { id },
      relations: ['upper_division', 'subdivisions'],
    });
    if (!division) throw new NotFoundException('División no encontrada');
    return division;
  }

  async update(id: number, dto: UpdateDivisionDto): Promise<Division> {
    const division = await this.findOne(id);

    if (dto.name && dto.name !== division.name) {
      const exists = await this.divisionRepository.findOne({
        where: { name: dto.name },
      });
      if (exists)
        throw new BadRequestException('Ya existe una división con ese nombre');
    }

    if (dto.upper_division_id) {
      const upper = await this.divisionRepository.findOne({
        where: { id: dto.upper_division_id },
      });
      if (!upper)
        throw new NotFoundException('División superior no encontrada');
      division.upper_division = upper;
    }

    Object.assign(division, dto);

    return this.divisionRepository.save(division);
  }

  async remove(id: number): Promise<void> {
    const division = await this.findOne(id);

    if (division.subdivisions && division.subdivisions.length > 0) {
      throw new BadRequestException(
        'No se puede eliminar la división porque tiene subdivisiones asociadas',
      );
    }

    await this.divisionRepository.delete(id);
  }

  async findSubdivisiones(id: number): Promise<Division[]> {
    const division = await this.findOne(id);
    return division.subdivisions;
  }
}
