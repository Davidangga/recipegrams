const express = require('express');
const router = express.Router();

const likeRecipeController = require("../controllers/recipeController");
const userController = require("../controllers/userController");

// Routes path for each like recipe database controllers

router.get("/", userController.authenticationUser,likeRecipeController.getAllLikeRecipes);
router.put("/:id", userController.authenticationUser,likeRecipeController.addLikeRecipe);
router.delete("/:id", userController.authenticationUser,likeRecipeController.deleteLikeRecipe);

module.exports = router;

