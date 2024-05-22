// entity/unit.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Ingredient } from './ingredient.entity';

@Entity()
export class Unit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Ingredient, ingredient => ingredient.unit)
  ingredients: Ingredient[];
}