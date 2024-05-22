import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { Recipe } from "./entity/recipe.entity";
import { RecipeCategory } from "./entity/recipe-category.entity";
import { Ingredient } from "./entity/ingredient.entity";

const showRecipes = async () => {
  try {
    // Инициализируем источник данных
    await AppDataSource.initialize();

    // Извлекаем все рецепты из базы данных
    const recipes = await AppDataSource.getRepository(Recipe).find({ relations: ['category', 'ingredients'] });

    // Выводим информацию о рецептах в терминал
    console.log("Available recipes:");
    recipes.forEach(recipe => {
      console.log(`Name: ${recipe.name}`);
      console.log(`Description: ${recipe.description}`);
      console.log(`Category: ${recipe.category.name}`);
      console.log(`Instructions: ${recipe.instructions}`);
      console.log("Ingredients:");
      recipe.ingredients.forEach(ingredient => {
        console.log(`- ${ingredient.name}`);
      });
      console.log("----------------------------------------");
    });
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
};

// Запускаем функцию для вывода рецептов
showRecipes();
