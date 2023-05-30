<template>
    <div class="recipe-content-container">
        <button class="info-button" @click="openRecipe">
                <div class="circle-icon">
                    <svg width="25" height="25" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.875 30.125V17.125H4.125V24.6L24.6 4.125H17.125V0.875H30.125V13.875H26.875V6.4L6.4 26.875H13.875V30.125H0.875Z" fill="black"/>
                    </svg>
                </div>
        </button>
        <div class="overlay" v-if="showDetails">
        <div class="recipe-details">
            <div class="recipe-card">
                <div class="container">
                    <div class="row">
                        <div class="col-8">
                            <div class="recipe-title">
                                <div class="title-container">
                                    <h2>{{recipeData.title}}</h2>
                                    <editComponent v-if="owning" :recipeId="recipeData._id"></editComponent>
                                    <deleteComponent v-if="owning" :recipeId="recipeData._id" :recipeLiked="recipeLiked"></deleteComponent>
                                </div>
                            </div>
                            <p class="recipe-creator">Created By <span>{{ recipeData.createdBy }}</span></p>
                        </div>
                        <div class="col-4">
                            <div class="duration-container">
                                <span>{{recipeData.duration}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-7">
                            <div class="instructions-container">
                                <h2>Instructions</h2>
                                <div class="instructions">
                                    <div v-for="(instruction, index) in recipeData.instructions" :key="index" class="instruction-item">
                                        <div class="instruction">
                                            <div class="list-decoration">
                                                <div class="dot"></div>
                                                <div v-if="index < recipeData.instructions.length - 1" class="line"></div>
                                            </div>
                                            <div class="content">
                                                <h3>Step {{index+1}}</h3>
                                                <p>{{ instruction }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-5">
                            <div class="ingredients-container">
                                <h2>Ingredients</h2>
                                <div class="ingredients">
                                    <div v-for="(ingredient, index) in recipeData.ingredients" :key="index" class="ingredient-item">
                                        <div class="dot"></div>
                                        <div class="content">
                                            {{ingredient.name}} <span>{{ingredient.quantity}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <span class="close-icon" @click="showDetails = false">
                        <svg width="53" height="53" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="26.5" cy="26.5" r="26.5" fill="white"/>
                        <path d="M34 20.41L32.59 19L27 24.59L21.41 19L20 20.41L25.59 26L20 31.59L21.41 33L27 27.41L32.59 33L34 31.59L28.41 26L34 20.41Z" fill="black"/>
                        </svg>
                </span>
            </div>
        </div>
        <div class="overlay-background" @click="showDetails = false"></div>
        </div>
    </div>
</template>

<script>
import api from "../api/index";
import editComponent from "../components/edit-form.vue";
import deleteComponent from "../components/delete-form.vue";
export default {
    data(){
        return {
            showDetails: false,
            recipeData: {},
            owning: false
        }
    },
    components: {
        editComponent,
        deleteComponent
    },
    props:{
        recipeId: {
            type: String,
            required: true
        },
        recipeLiked:{
            type: Boolean,
            required: true
        }
    },
    created(){
        this.checkRecipeOwner();
    },
    methods: {
        async openRecipe(){
            try{
                const response = await api.get(`/recipes/${this.recipeId}`, {
                    withCredentials: true
                })
                if (response.status === 200){
                    this.showDetails = true;
                    this.recipeData = response.data;
                }
            }
            catch(error){
                this.$router.push({ name: 'error', params: { errorMessage: error} });
            }
        },
        async checkRecipeOwner(){
            try{
                const response = await api.get("/recipes/private", {
                    withCredentials: true
                })
                if(response.status === 200){
                    this.owning =  response.data.some(obj => obj._id === this.recipeId);
                }
            }
            catch(error){
                this.$router.push({ name: 'error', params: { errorMessage: error} });
            }
        }
    }
}
</script>

<style scoped>

.row:nth-of-type(1){
    margin-bottom: 30px;
    margin-top: 10px;
}
.recipe-card{
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    border: 1px solid black;
    padding: 40px;
    border-radius: 15px;
    width: 750px;
    height: fit-content;
    position: relative;
    z-index: 100;
    font-family: var(--primary-font-family);
}

.recipe-title{
    display: flex;
    align-items: center;
}
.recipe-title h2{
    font-weight: 600;
    margin-right: 15px;
}

.title-container{
    display: flex;
    align-items: center;
}

.recipe-creator{
    font-size: 1.1rem;
}

.recipe-creator span{
    color: #E94C89;
    font-weight: 600;
}

.duration-container{
    border: 1px solid red;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 30px;
    border-radius: 50px;
    width: fit-content;
    background-color: #E94C89;
}


.duration-container span{
    font-size: 1rem;
    font-weight: 600;
    color: white;
}
.instructions-container h2{
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 20px;
}


.instruction{
    display: flex;
}
.instructions-container .dot{
    height: 15px;
    width: 15px;
    border-radius: 50%;
    border: 3px solid #E94C89;
    transform: translate(0, 20%);
}

.instruction-item .content{
    padding-left: 20px;
}

.instruction-item .content h3{
   font-size: 1.1rem;
   font-weight: 600;
   margin-bottom: 0;
}

.instruction-item .content p{
    font-size: 0.9rem;
    color: #565656;
}

.instruction-item .line{
    height: 40px;
    width: 15px;
    border-left: 3px dashed #E94C89;
    transform: translate(40%, 10%);
}
.ingredients-container h2{
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 20px;
}

.ingredient-item{
    display: flex;
    align-items: center;
    width: fit-content;
    margin-bottom: 20px;
}

.ingredient-item .dot{
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #E94C89;
    margin-right: 20px;
}
.ingredient-item .content{
    width: fit-content;
    font-size: 1rem;
}

.ingredient-item .content span{
    padding-left: 10px;
    font-weight: 600;
}
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  }

  .overlay-background {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 90;
  }

  .close-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    font-size: 20px;
  }

  .info-button {
    border: none;
    background-color: transparent;
  }

  .circle-icon{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 55px;
    width: 55px;
    background-color: #eaeaea;
    border-radius: 50%;
    transition: all ease 0.1s;
  }
</style>