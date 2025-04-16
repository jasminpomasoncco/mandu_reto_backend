import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Division {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 45 })
  name: string;

  @Column({ type: 'int', unsigned: true })
  level: number;

  @Column({ type: 'int', unsigned: true })
  number_collaborators: number;

  @Column({ nullable: true })
  ambassador?: string;

  @ManyToOne(() => Division, (division) => division.subdivisions, {
    nullable: true,
  })
  @JoinColumn({ name: 'upper_division_id' })
  upper_division?: Division;

  @OneToMany(() => Division, (division) => division.upper_division)
  subdivisions: Division[];
}
