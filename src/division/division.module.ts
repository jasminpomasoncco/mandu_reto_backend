import { Module } from '@nestjs/common';
import { DivisionController } from './division.controller';
import { DivisionService } from './division.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Division } from './division.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Division])],
  controllers: [DivisionController],
  providers: [DivisionService],
  exports: [TypeOrmModule],
})
export class DivisionModule {}
