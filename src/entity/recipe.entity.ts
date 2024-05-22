// entity/recipe.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, JoinColumn } from 'typeorm';
import { Ingredient } from './ingredient.entity';
import { RecipeCategory } from './recipe-category.entity';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => Ingredient, ingredient => ingredient.recipes)
  @JoinTable()
  ingredients: Ingredient[];

  @ManyToOne(() => RecipeCategory, category => category.recipes)
  @JoinColumn({ name: 'categoryId' })
  category: RecipeCategory;

  @Column()
  instructions: string;
}