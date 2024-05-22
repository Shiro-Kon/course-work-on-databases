import { DataSource } from 'typeorm/data-source/DataSource';
import { Ingredient } from './entity/ingredient.entity';
import { RecipeCategory } from './entity/recipe-category.entity';
import { Recipe } from './entity/recipe.entity';
import { Unit } from './entity/unit.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '6756',
  database: 'postgres',
  synchronize: true,
  entities: [Ingredient, RecipeCategory, Recipe, Unit],
  migrations: ['./migration/*.ts'],
    subscribers: [],
    logging: false,
});
