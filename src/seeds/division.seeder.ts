import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Division } from 'src/division/division.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DivisionSeeder {
  constructor(
    @InjectRepository(Division)
    private divisionRepository: Repository<Division>,
  ) {}

  async seed() {
    const divisionCount = await this.divisionRepository.count();
    if (divisionCount > 0) {
      console.log('Las divisiones ya han sido creadas');
      return;
    }

    const administrativeDivision = this.divisionRepository.create({
      name: 'Gerencia General',
      ambassador: 'Juan Perez',
      level: 1,
      number_collaborators: 10,
    });

    const marketingDivision = this.divisionRepository.create({
      name: 'División de Marketing',
      ambassador: 'Ana Gomez',
      level: 2,
      number_collaborators: 8,
    });

    const techDivision = this.divisionRepository.create({
      name: 'División de Tecnología',
      ambassador: 'Carlos Lopez',
      level: 3,
      number_collaborators: 15,
    });

    const savedAdministrativeDivision = await this.divisionRepository.save(
      administrativeDivision,
    );
    const savedMarketingDivision =
      await this.divisionRepository.save(marketingDivision);
    const savedTechDivision = await this.divisionRepository.save(techDivision);

    const salesDivision = this.divisionRepository.create({
      name: 'División de Ventas',
      ambassador: 'Laura Sanchez',
      level: 3,
      number_collaborators: 12,
      upper_division: savedAdministrativeDivision,
    });

    const supportDivision = this.divisionRepository.create({
      name: 'División de Soporte',
      ambassador: 'Miguel Torres',
      level: 3,
      number_collaborators: 10,
      upper_division: savedMarketingDivision,
    });

    const infraDivision = this.divisionRepository.create({
      name: 'División de Infraestructura',
      ambassador: 'Natalia Rojas',
      level: 4,
      number_collaborators: 6,
      upper_division: savedTechDivision,
    });

    await this.divisionRepository.save([
      salesDivision,
      supportDivision,
      infraDivision,
    ]);

    console.log('Divisiones y subdivisiones creadas exitosamente');
  }
}
