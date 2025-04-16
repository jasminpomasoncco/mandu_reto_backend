import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DivisionModule } from './division/division.module';
import { Division } from './division/division.entity';
import { DivisionSeeder } from './seeds/division.seeder';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'galeria123',
      database: 'mandu',
      entities: [Division],
      synchronize: true,
    }),
    DivisionModule,
  ],
  controllers: [AppController],
  providers: [AppService, DivisionSeeder],
})
export class AppModule {}
