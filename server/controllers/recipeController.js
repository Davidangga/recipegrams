// import recipe model
const Recipe = require("../models/recipes");
// import like recipe model
const User = require("../models/users");
// controller functions

// view all recipe

exports.getAllRecipes = async (req, res) => {
    try{
        const recipes = await Recipe.find().select("_id title videolink createdBy");
        const recipeData = [];

        for (const recipe of recipes) {
        const user = await User.findById(recipe.createdBy);
        const userName = user ? user.username : 'Unknown User';

        recipeData.push({
            _id: recipe._id,
            title: recipe.title,
            videolink: recipe.videolink,
            createdBy: userName
        });
        }
        res.status(200).json(recipeData);
    }
    catch (error){
        res.status(500).json({ error: 'Failed to get recipes' });
    }
}

exports.getAllRecipesbyUser = async (req, res) => {
    try{
        const recipes = await Recipe.find({createdBy: req.userId}).select("_id title videolink createdBy");
        const recipeData = [];

        for (const recipe of recipes) {
        const user = await User.findById(recipe.createdBy);
        const userName = user ? user.username : 'Unknown User';

        recipeData.push({
            _id: recipe._id,
            title: recipe.title,
            videolink: recipe.videolink,
            createdBy: userName
        });
        }
        res.status(200).json(recipeData);
    }
    catch (error){
        res.status(500).json({ error: 'Failed to get recipes' });
    }
}

// get recipe by id
exports.getRecipebyId = async (req, res) => {
    try {
        const {id} = req.params;
        const recipe = await Recipe.findOne({ _id: id}).select("_id title createdBy duration ingredients instructions videolink");
        if (!recipe) return res.status(404).json({error: "Recipe not found or has been removed"})
        const recipeData = {...recipe._doc};
        const user = await User.findById(recipe.createdBy);
        recipeData.createdBy = user ? user.username : 'Unknown User';
        res.status(200).json(recipeData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get Recipe by Id' });
    }
}

exports.getRecipebySearch = async (req, res) => {
    try{
        const {search} = req.params;
        const recipes = await Recipe.find({
            $or: [
              { title: { $regex: search, $options: "i" } }, // Case-insensitive search on the 'title' field
              { category: { $regex: search, $options: "i" } }, // Case-insensitive search on the 'category' field
              { area: { $regex: search, $options: "i" } }, // Case-insensitive search on the 'category' field
            ],
          });
        res.status(200).json(recipes);
    }
    catch(error){
        res.status(500).json({ error: 'Failed to get Recipes' });
    }
}

// create recipe
exports.addRecipe = async (req, res) => {
    try{
        const { title, duration, category, area, videolink, ingredients, instructions} = req.body;
        const createdBy = req.userId;
        const recipe = new Recipe({
            title,
            duration,
            category,
            area,
            videolink,
            ingredients,
            instructions,
            createdBy
          });

        await recipe.save();
        res.status(200).json({ message: 'Recipe created successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create recipe' });
    }
}
// edit recipe

exports.editRecipe = async (req, res) => {
    try{
        const {id} = req.params;
        const {title, duration, category, area, videolink, ingredients, instructions} = req.body;
        const recipe = await Recipe.findOne({ _id: id, createdBy: req.userId });
        if (!recipe) return res.status(404).json({error: "Recipe not found"})
    // Update the recipe fields if they are not empty
        if (title) {
        recipe.title = title;
        }
        if (duration){
            recipe.duration = duration;
        }
        if (ingredients) {
        recipe.ingredients = ingredients;
        }

        if (instructions) {
        recipe.instructions = instructions;
        }

        const updatedRecipe = await recipe.save();

        res.json(updatedRecipe);
    }
    catch (error) {
    res.status(500).json({ error: 'Failed to edit recipe' });
  }
}

// delete recipe

exports.deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the recipe by ID and delete it
    const deletedRecipe = await Recipe.findOneAndDelete({ _id: id, createdBy: req.userId })

    if (!deletedRecipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete recipe' });
  }
};

// view all like recipe
exports.getAllLikeRecipes = async (req, res) => {
    try{
        const likerecipes = await User.findById(req.userId).select("likedRecipes");
        res.status(200).json(likerecipes.likedRecipes);
    }
    catch (error){
        res.status(500).json({ error: 'Failed to get liked recipes' });
    }
}
// add like recipe
exports.addLikeRecipe = async (req, res) => {
    try{
        const {id} = req.params;
        const user = await User.findById(req.userId);
        const recipe = await Recipe.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        if (!recipe) return res.status(404).json({ error: 'Recipe not found.' });

        if(user.likedRecipes.includes(id)) return res.status(404).json({ message: 'Recipe has been liked.' });
        await User.findByIdAndUpdate(req.userId, {$push: {likedRecipes : id}});
        res.status(200).json({ message: 'Recipe liked successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to like recipe' });
    }
}

// delete like recipe

exports.deleteLikeRecipe = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(req.userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
    
      if(!user.likedRecipes.includes(id)) return res.status(404).json({ message: 'Like Recipe not found.' });

      const deletedRecipe = await User.findByIdAndUpdate(req.userId, {$pull: {likedRecipes : id}});
      res.json({ message: 'Liked Recipe removed successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to remove like recipe' });
    }
  };
