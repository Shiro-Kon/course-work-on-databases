import { AppDataSource } from "./data-source";
import { Recipe } from "./entity/recipe.entity";
import { Ingredient } from "./entity/ingredient.entity";
import { RecipeCategory } from "./entity/recipe-category.entity";

const createRecipe = async (name: string, description: string, instructions: string, categoryId: number, ingredientIds: number[]) => {
  try {
    const category = await AppDataSource.getRepository(RecipeCategory).findOneBy({ id: categoryId });
    if (!category) {
      console.error("Category not found");
      return;
    }

    const ingredients = await AppDataSource.getRepository(Ingredient).findByIds(ingredientIds);

    const recipe = new Recipe();
    recipe.name = name;
    recipe.description = description;
    recipe.instructions = instructions;
    recipe.category = category;
    recipe.ingredients = ingredients;

    await AppDataSource.manager.save(recipe);

    console.log("Recipe created:", recipe);
  } catch (error) {
    console.error("Error creating recipe:", error);
  }
};

const updateRecipe = async (id: number, name: string, description: string, instructions: string, categoryId: number, ingredientIds: number[]) => {
  try {
    const recipe = await AppDataSource.getRepository(Recipe).findOneBy({ id });
    if (!recipe) {
      console.error("Recipe not found");
      return;
    }

    const category = await AppDataSource.getRepository(RecipeCategory).findOneBy({ id: categoryId });
    if (!category) {
      console.error("Category not found");
      return;
    }

    const ingredients = await AppDataSource.getRepository(Ingredient).findByIds(ingredientIds);

    recipe.name = name;
    recipe.description = description;
    recipe.instructions = instructions;
    recipe.category = category;
    recipe.ingredients = ingredients;

    await AppDataSource.manager.save(recipe);

    console.log("Recipe updated:", recipe);
  } catch (error) {
    console.error(`Error updating recipe with id ${id}:`, error);
  }
};

const deleteRecipe = async (id: number) => {
  try {
    const recipe = await AppDataSource.getRepository(Recipe).findOneBy({ id });

    if (!recipe) {
      console.error("Recipe not found");
      return;
    }

    await AppDataSource.manager.remove(recipe);

    console.log(`Recipe with id ${id} deleted successfully`);
  } catch (error) {
    console.error(`Error deleting recipe with id ${id}:`, error);
  }
};

// Пример использования
AppDataSource.initialize()
  .then(async () => {
    // Создание нового рецепта
    await createRecipe(
      "Vegetable Stir-fry",
      "A healthy and tasty stir-fried vegetable dish",
      "1. Chop the vegetables. 2. Heat oil in a pan. 3. Stir-fry the vegetables. 4. Season with salt and pepper.",
      1, // categoryId (предположим, что категория уже существует)
      [1, 2, 3] // ingredientIds (предположим, что ингредиенты уже существуют)
    );

    // Обновление существующего рецепта
    await updateRecipe(
      1, // recipeId
      "Updated Recipe Name",
      "Updated description",
      "Updated instructions",
      1, // categoryId
      [1, 2] // ingredientIds
    );

    // Удаление рецепта
    await deleteRecipe(1); // recipeId
  })
  .catch((error) => console.error("Error initializing data source:", error));