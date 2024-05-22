const Init1716206389950 = {
    name: 'Init1716206389950',
    async up(queryRunner) {
      await queryRunner.query(`CREATE TABLE "recipe_category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_c1b4e81bf69aa6e8f3a14c4c2f6" PRIMARY KEY ("id"))`);
      await queryRunner.query(`CREATE TABLE "recipe" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "instructions" character varying NOT NULL, "categoryId" integer, CONSTRAINT "PK_e365a2fedf57238d970e07825ca" PRIMARY KEY ("id"))`);
      await queryRunner.query(`CREATE TABLE "ingredient" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_6f1e945604a0b59f56a57570e98" PRIMARY KEY ("id"))`);
      await queryRunner.query(`CREATE TABLE "unit" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_4252c4be609041e559f0c80f58a" PRIMARY KEY ("id"))`);
      await queryRunner.query(`CREATE TABLE "recipe_ingredients_ingredient" ("recipeId" integer NOT NULL, "ingredientId" integer NOT NULL, CONSTRAINT "PK_6e193bb10a2cd8a65929edf7d07" PRIMARY KEY ("recipeId", "ingredientId"))`);
      await queryRunner.query(`CREATE INDEX "IDX_b67e81a9afa83f2ee13440175c" ON "recipe_ingredients_ingredient" ("recipeId") `);
      await queryRunner.query(`CREATE INDEX "IDX_d2bbcf7bab477bfdcec65465c0" ON "recipe_ingredients_ingredient" ("ingredientId") `);
      await queryRunner.query(`ALTER TABLE "recipe" ADD CONSTRAINT "FK_991484dd8189182dafe91e44413" FOREIGN KEY ("categoryId") REFERENCES "recipe_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE "recipe_ingredients_ingredient" ADD CONSTRAINT "FK_b67e81a9afa83f2ee13440175ce" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
      await queryRunner.query(`ALTER TABLE "recipe_ingredients_ingredient" ADD CONSTRAINT "FK_d2bbcf7bab477bfdcec65465c0c" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    },
  
    async down(queryRunner) {
      await queryRunner.query(`ALTER TABLE "recipe_ingredients_ingredient" DROP CONSTRAINT "FK_d2bbcf7bab477bfdcec65465c0c"`);
      await queryRunner.query(`ALTER TABLE "recipe_ingredients_ingredient" DROP CONSTRAINT "FK_b67e81a9afa83f2ee13440175ce"`);
      await queryRunner.query(`ALTER TABLE "recipe" DROP CONSTRAINT "FK_991484dd8189182dafe91e44413"`);
      await queryRunner.query(`DROP INDEX "public"."IDX_d2bbcf7bab477bfdcec65465c0"`);
      await queryRunner.query(`DROP INDEX "public"."IDX_b67e81a9afa83f2ee13440175c"`);
      await queryRunner.query(`DROP TABLE "recipe_ingredients_ingredient"`);
      await queryRunner.query(`DROP TABLE "unit"`);
      await queryRunner.query(`DROP TABLE "ingredient"`);
      await queryRunner.query(`DROP TABLE "recipe"`);
      await queryRunner.query(`DROP TABLE "recipe_category"`);
    }
  };
  
  module.exports = Init1716206389950;
  