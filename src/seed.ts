import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { Ingredient } from "./entity/ingredient.entity";
import { RecipeCategory } from "./entity/recipe-category.entity";
import { Recipe } from "./entity/recipe.entity";
import { Unit } from "./entity/unit.entity";

const seed = async () => {
  try {
    await AppDataSource.initialize();

    // Проверка и создание единиц измерения
    let gramUnit = await AppDataSource.getRepository(Unit).findOneBy({ name: 'gram' });
    if (!gramUnit) {
      gramUnit = new Unit();
      gramUnit.name = "gram";
      await AppDataSource.manager.save(gramUnit);
    }

    let pieceUnit = await AppDataSource.getRepository(Unit).findOneBy({ name: 'piece' });
    if (!pieceUnit) {
      pieceUnit = new Unit();
      pieceUnit.name = "piece";
      await AppDataSource.manager.save(pieceUnit);
    }

    // Проверка и создание ингредиентов
    let tomatoIngredient = await AppDataSource.getRepository(Ingredient).findOneBy({ name: 'Tomato' });
    if (!tomatoIngredient) {
      tomatoIngredient = new Ingredient();
      tomatoIngredient.name = "Tomato";
      tomatoIngredient.unit = gramUnit;
      await AppDataSource.manager.save(tomatoIngredient);
    }

    let cheeseIngredient = await AppDataSource.getRepository(Ingredient).findOneBy({ name: 'Cheese' });
    if (!cheeseIngredient) {
      cheeseIngredient = new Ingredient();
      cheeseIngredient.name = "Cheese";
      cheeseIngredient.unit = gramUnit;
      await AppDataSource.manager.save(cheeseIngredient);
    }

    let eggIngredient = await AppDataSource.getRepository(Ingredient).findOneBy({ name: 'Egg' });
    if (!eggIngredient) {
      eggIngredient = new Ingredient();
      eggIngredient.name = "Egg";
      eggIngredient.unit = pieceUnit;
      await AppDataSource.manager.save(eggIngredient);
    }

    let lettuceIngredient = await AppDataSource.getRepository(Ingredient).findOneBy({ name: 'Lettuce' });
    if (!lettuceIngredient) {
      lettuceIngredient = new Ingredient();
      lettuceIngredient.name = "Lettuce";
      lettuceIngredient.unit = gramUnit;
      await AppDataSource.manager.save(lettuceIngredient);
    }

    // Проверка и создание категорий рецептов
    let saladCategory = await AppDataSource.getRepository(RecipeCategory).findOneBy({ name: 'Salad' });
    if (!saladCategory) {
      saladCategory = new RecipeCategory();
      saladCategory.name = "Salad";
      await AppDataSource.manager.save(saladCategory);
    }

    let omeletCategory = await AppDataSource.getRepository(RecipeCategory).findOneBy({ name: 'Omelet' });
    if (!omeletCategory) {
      omeletCategory = new RecipeCategory();
      omeletCategory.name = "Omelet";
      await AppDataSource.manager.save(omeletCategory);
    }

    // Проверка и создание рецептов
    let existingSaladRecipe = await AppDataSource.getRepository(Recipe).findOneBy({ name: 'Tomato Salad' });
    if (!existingSaladRecipe) {
      const saladRecipe = new Recipe();
      saladRecipe.name = "Tomato Salad";
      saladRecipe.description = "A simple and healthy tomato salad.";
      saladRecipe.ingredients = [tomatoIngredient, lettuceIngredient];
      saladRecipe.category = saladCategory;
      saladRecipe.instructions = "1. Cut the tomatoes and lettuce. 2. Mix them together. 3. Serve fresh.";
      await AppDataSource.manager.save(saladRecipe);
    }

    let existingOmeletRecipe = await AppDataSource.getRepository(Recipe).findOneBy({ name: 'Cheese Omelet' });
    if (!existingOmeletRecipe) {
      const omeletRecipe = new Recipe();
      omeletRecipe.name = "Cheese Omelet";
      omeletRecipe.description = "A delicious cheese omelet.";
      omeletRecipe.ingredients = [eggIngredient, cheeseIngredient];
      omeletRecipe.category = omeletCategory;
      omeletRecipe.instructions = "1. Beat the eggs. 2. Cook the eggs in a pan. 3. Add cheese. 4. Fold and serve hot.";
      await AppDataSource.manager.save(omeletRecipe);
    }

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await AppDataSource.destroy(); // Отключаем источник данных
  }
};

seed();
