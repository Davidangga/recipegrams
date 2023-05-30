<template>
    <div class="container-fluid">
        <headerComponent></headerComponent>
        <div class="row">
        <div class="col-2">
            <navComponent></navComponent>
        </div>
        <div class="col-8 recipes-container">
            <div v-for="recipe in recipes" :key="recipe._id">
            <recipeComponent :recipedata="recipe"></recipeComponent>
            </div>
        </div>
        </div>
        <addformComponent @recipe-added="addRecipe"></addformComponent>
    </div>
</template>

<script>
import navComponent from "../components/nav.vue";
import headerComponent from "../components/header.vue";
import addformComponent from "../components/add-form.vue";
import recipeComponent from "../components/recipe.vue";
import api from "../api/index";
export default{
    components: {navComponent, headerComponent, addformComponent, recipeComponent},
    created(){
        this.getAllRecipes();
    },
    data(){
        return {
            recipes: []
        }
    },
    methods: {
        async getAllRecipes(){
            try{
            const response = await api.get("/recipes",{
                withCredentials: true
            })
            if (response.status === 200){
                this.recipes = response.data; 
            }
            }
            catch(error){
                this.$router.push({ name: 'error', params: { errorMessage: error} });
            }
        },
        async addRecipe() {
        try {
        // Send API request to add the new recipe
        const response = await api.get("/recipes", {
            withCredentials: true
        });
        if (response.status === 200) {
            // Update the recipes array with the newly added recipe
            this.recipes = response.data;
        }
        } catch (error) {
        this.$router.push({ name: 'error', params: { errorMessage: error } });
        }
    }
    }
}
</script>

<style scoped>
.container-fluid{
  margin-left:0;
  margin-right: 0;
  width: 100vw;
  height: 100vh;
  padding: 0 10vh;
}

.recipes-container{
    height: 85vh;
    overflow: auto;
    scrollbar-width: none; /* Hide scrollbar for Firefox */
    -ms-overflow-style: none; /* Hide scrollbar for IE and Edge */
}

.recipes-container::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 1200px) {
    .container-fluid{
        padding: 0 5vh;
    }

    .recipes-container{
        
    }
  }

</style>