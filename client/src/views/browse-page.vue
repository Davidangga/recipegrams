<template>
    <div class="container-fluid">
        <headerComponent></headerComponent>
        <div class="row">
        <div class="col-2">
            <navComponent></navComponent>
        </div>
        <div class="col-8">
            This is browse page
        </div>
        <div class="col-2">
            add recipe
        </div>
        </div>
        <addformComponent></addformComponent>
    </div>
</template>

<script>
import navComponent from "../components/nav.vue";
import headerComponent from "../components/header.vue";
import addformComponent from "../components/add-form.vue";
export default{
    components: {navComponent, headerComponent, addformComponent},
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