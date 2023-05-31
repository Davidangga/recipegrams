<template>
    <div class="container-fluid">
        <headerComponent></headerComponent>
        <div class="row">
        <div class="col-2">
            <navComponent></navComponent>
        </div>
        <div class="col-8 content-container">
            <div class="browse-container">
                <form class="search-form" @submit.prevent="searchSubmit">
                    <div class="form-group">
                        <div class="input-container">
                        <input type="text" id="search" v-model="search" placeholder="Search recipes by title, categories, or cuisine area">
                        <button class="submit-btn" type="submit">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.9167 9.66667H10.2583L10.025 9.44167C10.8699 8.46169 11.3343 7.21058 11.3333 5.91667C11.3333 4.84535 11.0157 3.7981 10.4205 2.90733C9.82527 2.01656 8.9793 1.3223 7.98954 0.912322C6.99977 0.502347 5.91066 0.395079 4.85993 0.604082C3.8092 0.813085 2.84404 1.32897 2.08651 2.08651C1.32897 2.84404 0.813085 3.8092 0.604082 4.85993C0.395079 5.91066 0.502347 6.99977 0.912322 7.98954C1.3223 8.9793 2.01656 9.82527 2.90733 10.4205C3.7981 11.0157 4.84535 11.3333 5.91667 11.3333C7.25834 11.3333 8.49167 10.8417 9.44167 10.025L9.66667 10.2583V10.9167L13.8333 15.075L15.075 13.8333L10.9167 9.66667ZM5.91667 9.66667C3.84167 9.66667 2.16667 7.99167 2.16667 5.91667C2.16667 3.84167 3.84167 2.16667 5.91667 2.16667C7.99167 2.16667 9.66667 3.84167 9.66667 5.91667C9.66667 7.99167 7.99167 9.66667 5.91667 9.66667Z" fill="black"/>
                            </svg>
                        </button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="recipes-container" ref="recipesContainer">
                <div v-for="recipe in recipes" :key="recipe._id">
                <recipeComponent :recipedata="recipe"></recipeComponent>
                </div>
            </div>
        </div>
        </div>
        <addformComponent></addformComponent>
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
    data(){
        return {
            recipes: [],
            search: "",
        }
    },
    created(){
        this.getAllRecipes();
    },
    methods:{
        searchSubmit(){
            if(this.search){
                this.searchRecipes();
            }
            else{
                this.getAllRecipes();
            }
            this.$nextTick(() => {
                this.$refs.recipesContainer.scrollTop = 0;
            });
        },
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
        async searchRecipes(){
            try{
                const response = await api.get(`/recipes/search/${this.search}`,{
                    withCredentials: true
                })
                if (response.status === 200){
                    this.recipes = response.data; 
                }
            }
            catch(error){
                console.log(error)
                this.$router.push({ name: 'error', params: { errorMessage: error} });
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
    width: 100%;
    margin-top: 10px;
    padding-top: 10px;
}

.recipes-container::-webkit-scrollbar {
    display: none;
  }

.content-container{
    display: flex;
    flex-direction: column;
    align-items: center;
}

.form-group input{
    width: 30vw ;
    font-size: 1rem;
    padding: 10px 10px;
    border-radius: 50px;
    padding-left: 30px;
    font-family: var(--primary-font-family);
    border: 3px solid #E94C89;
}

.browse-container{
    position: absolute;
    top: 70px;
}
.input-container{
    position: relative;
}
.submit-btn{
    position: absolute;
    top: 50%;
    transform: translate(0%, -50%);
    left: 90%;
    border: none;
    background-color: transparent;
}

.submit-btn svg{
    width: 25px;
    height: 25px;
}


/* For larger tablet screen */
@media (max-width: 1280px) {
    .container-fluid{
        padding: 0 5vh;
    }

    .form-group input{
    font-size: 0.8rem;
    padding-left: 10px; 
    }

    .submit-btn{
        left: 88%;
    }

  }

/* For smaller tablet */
@media (max-width: 1024px){
    .form-group input{
    width: 35vw;
    }

    .recipes-container{
    margin-top: 30px;
    padding-top: 0px;
}
}
/* For mobile phone */
@media (max-width: 428px){
    .container-fluid{
    padding: 0 0vh;
}

.recipes-container{
    position: absolute;
    left: 0;
    width: 100vw;
    margin: 0;
}

.form-group input{
    width: 98vw;
    font-size: 0.9rem;
    padding-left: 20px;
    border-radius: 15px;
}
.form-group{
    position: relative;
    z-index: 2;
    transform: translate(0, -22px);
}
}

</style>