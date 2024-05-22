// entity/ingredient.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Recipe } from './recipe.entity';

@Entity()
export class Ingredient {
  [x: string]: any;
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Recipe, recipe => recipe.ingredients)
  recipes: Recipe[];
}