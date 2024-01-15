const express = require('express');
const router = express.Router();

const recipeController = require("../controllers/recipeController");
const userController = require("../controllers/userController");
// Routes path for each recipe database controllers
router.get("/", userController.authenticationUser,recipeController.getAllRecipes);
router.get("/private", userController.authenticationUser,recipeController.getAllRecipesbyUser);
router.get("/:id", userController.authenticationUser,recipeController.getRecipebyId);
router.post("/", userController.authenticationUser, recipeController.addRecipe);
router.put("/edit/:id", userController.authenticationUser,recipeController.editRecipe);
router.delete("/delete/:id", userController.authenticationUser,recipeController.deleteRecipe);
router.get("/search/:search", userController.authenticationUser, recipeController.getRecipebySearch);
module.exports = router;
