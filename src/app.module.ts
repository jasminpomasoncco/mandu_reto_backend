import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DivisionModule } from './division/division.module';
import { Division } from './division/division.entity';
import { DivisionSeeder } from './seeds/division.seeder';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT || '3306', 10),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Division],
      synchronize: true,
    }),
    DivisionModule,
  ],
  controllers: [AppController],
  providers: [AppService, DivisionSeeder],
})
export class AppModule {}
