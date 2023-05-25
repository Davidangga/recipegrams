<template>
    <div class="container-fluid">
        <headerComponent></headerComponent>
        <div class="row">
        <div class="col-2">
            <navComponent></navComponent>
        </div>
        <div class="col-8">
            <recipeComponent></recipeComponent>
        </div>
        </div>
        <addformComponent></addformComponent>
    </div>
</template>

<script>
import navComponent from "../components/nav.vue";
import headerComponent from "../components/header.vue";
import addformComponent from "../components/add-form.vue";
import recipeComponent from "../components/recipe.vue"
export default{
    components: {navComponent, headerComponent, addformComponent, recipeComponent},
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

</style>