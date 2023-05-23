<template>
  <nav v-if="showNavigation">
    <router-link to="/">Home</router-link>
  </nav>
  <main>
    <router-view></router-view>
  </main>
</template>

<script>
export default {
  data(){
    return {
      showNavigation: true,
      pagesNoNav : ["login","error"]
    }
  },
  watch: {
    // watch for corrent route if its login then no navigation
    $route: {
      immediate: true,
      handler(to) {
        if (this.pagesNoNav.includes(to.name)) {
          this.showNavigation = false;
        } else {
          this.showNavigation = true;
        }
      }
    }
  }
}

</script>
<style>
@import 'bootstrap/dist/css/bootstrap.css';
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Pacifico&family=Poppins:wght@200;300;400;500;600;700&display=swap');

:root{
  --logo-font-family: 'Pacifico', cursive;
  --primary-font-family: 'Lato', sans-serif;
  --secondary-font-family: 'Poppins', sans-serif;
}
*{
  box-sizing: border-box;
}

</style>
