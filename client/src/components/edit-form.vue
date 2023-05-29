<template>
    <div class="addform-container">
      <!-- add recipe svg button -->
        <div class="clickable-svg" @click="showForm = true">
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.8334 3.66699H3.66671C3.04787 3.66699 2.45438 3.91282 2.01679 4.35041C1.57921 4.78799 1.33337 5.38149 1.33337 6.00033V22.3337C1.33337 22.9525 1.57921 23.546 2.01679 23.9836C2.45438 24.4212 3.04787 24.667 3.66671 24.667H20C20.6189 24.667 21.2124 24.4212 21.65 23.9836C22.0875 23.546 22.3334 22.9525 22.3334 22.3337V14.167" stroke="#E94C89" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M20.5834 1.91677C21.0475 1.45264 21.677 1.19189 22.3334 1.19189C22.9897 1.19189 23.6192 1.45264 24.0834 1.91677C24.5475 2.3809 24.8082 3.01039 24.8082 3.66677C24.8082 4.32315 24.5475 4.95264 24.0834 5.41677L13 16.5001L8.33337 17.6668L9.50004 13.0001L20.5834 1.91677Z" stroke="#E94C89" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        <!-- Only shown if the Edit svg is clicked -->
        <div class="overlay" v-if="showForm">
            <div class="form-card">
                <div>
                <div class="form-title">
                    Edit<span>Recipe</span>
                    <div class="line"></div>
                </div>
                </div>
                <form ref="recipeform" @submit.prevent="editForm">

                    <div class="oneline-form">
                        <div class="form-group">
                        <label for="title">Meal Name</label>
                        <input type="text" id="title" v-model="recipe.title" required>
                        </div>

                        <div class="form-group">
                        <label for="duration">Duration in Mins</label>
                        <input type="number" id="duration" v-model="recipe.duration" required>
                        </div>
                    </div>

                    <div class="form-group">
                    <label>Ingredients</label>
                    <table>
                        <thead>
                        <tr>
                            <th v-if="ingredients.length > 0">Name</th>
                            <th v-if="ingredients.length > 0">Quantity</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(ingredient, index) in ingredients" :key="index">
                            <td>
                            <input type="text" v-model="ingredients[index].name" required>
                            </td>
                            <td>
                            <input type="text" v-model="ingredients[index].quantity" required>
                            </td>
                            <td>
                            <button class="remove-btn" type="button" @click="removeIngredient(index)">
                                Remove
                            </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <button class="add-btn" type="button" @click="addIngredient">
                        <svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M34.0832 41.5833V52.8333C34.0832 53.8958 34.4432 54.7871 35.1632 55.5071C35.8833 56.2271 36.7733 56.5858 37.8332 56.5833C38.8957 56.5833 39.787 56.2233 40.507 55.5033C41.227 54.7833 41.5858 53.8933 41.5832 52.8333V41.5833H52.8332C53.8957 41.5833 54.787 41.2233 55.507 40.5033C56.227 39.7833 56.5857 38.8933 56.5832 37.8333C56.5832 36.7708 56.2232 35.8796 55.5032 35.1596C54.7832 34.4396 53.8932 34.0808 52.8332 34.0833H41.5832V22.8333C41.5832 21.7708 41.2232 20.8796 40.5033 20.1596C39.7832 19.4396 38.8932 19.0808 37.8332 19.0833C36.7707 19.0833 35.8795 19.4433 35.1595 20.1633C34.4395 20.8833 34.0807 21.7733 34.0832 22.8333V34.0833H22.8333C21.7708 34.0833 20.8795 34.4433 20.1595 35.1633C19.4395 35.8833 19.0808 36.7733 19.0833 37.8333C19.0833 38.8958 19.4433 39.7871 20.1633 40.5071C20.8833 41.2271 21.7733 41.5858 22.8333 41.5833H34.0832ZM37.8332 75.3333C32.6457 75.3333 27.7708 74.3483 23.2083 72.3783C18.6458 70.4083 14.677 67.7371 11.302 64.3646C7.927 60.9896 5.25575 57.0208 3.28825 52.4583C1.32075 47.8958 0.335752 43.0208 0.333252 37.8333C0.333252 32.6458 1.31825 27.7708 3.28825 23.2083C5.25825 18.6458 7.9295 14.6771 11.302 11.3021C14.677 7.92709 18.6458 5.25584 23.2083 3.28834C27.7708 1.32084 32.6457 0.335844 37.8332 0.333344C43.0207 0.333344 47.8957 1.31834 52.4582 3.28834C57.0207 5.25834 60.9895 7.92959 64.3645 11.3021C67.7395 14.6771 70.412 18.6458 72.382 23.2083C74.352 27.7708 75.3357 32.6458 75.3332 37.8333C75.3332 43.0208 74.3482 47.8958 72.3783 52.4583C70.4082 57.0208 67.737 60.9896 64.3645 64.3646C60.9895 67.7396 57.0207 70.4121 52.4582 72.3821C47.8957 74.3521 43.0207 75.3358 37.8332 75.3333Z" fill="#E94C89"/>
                        </svg>
                        <span>Add Ingredient</span>
                    </button>
                    </div>

                    <div class="form-group">
                    <label>Instructions</label>
                    <table>
                        <thead>
                        <tr>
                            <th v-if="instructions.length > 0">Instruction</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(instruction, index) in instructions" :key="index">
                            <td>
                            <input class="instruction-input" type="text" v-model="instructions[index]" required>
                            </td>
                            <td>
                            <button class="remove-btn" type="button" @click="removeInstruction(index)">
                                Remove
                            </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <button class="add-btn" type="button" @click="addInstruction">
                        <svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M34.0832 41.5833V52.8333C34.0832 53.8958 34.4432 54.7871 35.1632 55.5071C35.8833 56.2271 36.7733 56.5858 37.8332 56.5833C38.8957 56.5833 39.787 56.2233 40.507 55.5033C41.227 54.7833 41.5858 53.8933 41.5832 52.8333V41.5833H52.8332C53.8957 41.5833 54.787 41.2233 55.507 40.5033C56.227 39.7833 56.5857 38.8933 56.5832 37.8333C56.5832 36.7708 56.2232 35.8796 55.5032 35.1596C54.7832 34.4396 53.8932 34.0808 52.8332 34.0833H41.5832V22.8333C41.5832 21.7708 41.2232 20.8796 40.5033 20.1596C39.7832 19.4396 38.8932 19.0808 37.8332 19.0833C36.7707 19.0833 35.8795 19.4433 35.1595 20.1633C34.4395 20.8833 34.0807 21.7733 34.0832 22.8333V34.0833H22.8333C21.7708 34.0833 20.8795 34.4433 20.1595 35.1633C19.4395 35.8833 19.0808 36.7733 19.0833 37.8333C19.0833 38.8958 19.4433 39.7871 20.1633 40.5071C20.8833 41.2271 21.7733 41.5858 22.8333 41.5833H34.0832ZM37.8332 75.3333C32.6457 75.3333 27.7708 74.3483 23.2083 72.3783C18.6458 70.4083 14.677 67.7371 11.302 64.3646C7.927 60.9896 5.25575 57.0208 3.28825 52.4583C1.32075 47.8958 0.335752 43.0208 0.333252 37.8333C0.333252 32.6458 1.31825 27.7708 3.28825 23.2083C5.25825 18.6458 7.9295 14.6771 11.302 11.3021C14.677 7.92709 18.6458 5.25584 23.2083 3.28834C27.7708 1.32084 32.6457 0.335844 37.8332 0.333344C43.0207 0.333344 47.8957 1.31834 52.4582 3.28834C57.0207 5.25834 60.9895 7.92959 64.3645 11.3021C67.7395 14.6771 70.412 18.6458 72.382 23.2083C74.352 27.7708 75.3357 32.6458 75.3332 37.8333C75.3332 43.0208 74.3482 47.8958 72.3783 52.4583C70.4082 57.0208 67.737 60.9896 64.3645 64.3646C60.9895 67.7396 57.0207 70.4121 52.4582 72.3821C47.8957 74.3521 43.0207 75.3358 37.8332 75.3333Z" fill="#E94C89"/>
                        </svg>
                        <span>Add Instruction</span>
                    </button>
                    </div>
                    <div class="btn-container">
                    <button class="submit-btn" type="submit">Edit Recipe</button>
                    </div>
                </form>
                <span class="close-icon" @click="closeForm">
                    <svg width="53" height="53" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="26.5" cy="26.5" r="26.5" fill="white"/>
                    <path d="M34 20.41L32.59 19L27 24.59L21.41 19L20 20.41L25.59 26L20 31.59L21.41 33L27 27.41L32.59 33L34 31.59L28.41 26L34 20.41Z" fill="black"/>
                    </svg>
                </span>
            </div>
            <div class="overlay-background" @click="closeForm"></div>
        </div>
    </div>
  </template>
  
  <script>
  import api from "../api/index";
  export default {
    data() {
      return {
        showForm: false,
        recipe: {
        title: '',
        duration: '',
        ingredients: [],
        instructions: []
      },
      message: ""
      };
    },
    props: {
        recipeId: {
            type: String,
            required: true
        }
    },
    created(){
        this.fillForm();
    }
    ,
    computed: {
    ingredients: {
      get() {
        return this.recipe.ingredients;
      },
      set(value) {
        this.recipe.ingredients = value;
      }
    },
    instructions: {
      get() {
        return this.recipe.instructions;
      },
      set(value) {
        this.recipe.instructions = value;
      }
    }
  },

    methods: {
      closeForm() {
        this.fillForm();
        this.showForm = false;
      },
      addIngredient() {
          this.ingredients.push({
            name: '',
            quantity: ''
          });
        },
      removeIngredient(index) {
        this.ingredients.splice(index, 1);
      },
      addInstruction() {
        this.instructions.push('');
      },
      removeInstruction(index) {
        this.instructions.splice(index, 1);
      },
      async fillForm(){
        try{
            const response = await api.get(`/recipes/${this.recipeId}`, {
                    withCredentials: true
            })
            if (response.status === 200){
                this.recipe.title = response.data.title;
                this.recipe.duration = response.data.duration.split(" ")[0];
                this.recipe.instructions = response.data.instructions;
                this.recipe.ingredients = response.data.ingredients;
            }
        }
        catch(error){
            this.$router.push({ name: 'error', params: { errorMessage: error} });
        }
      }
      ,
      async editForm() {
        // Handle form submission logic here
        this.recipe.duration = this.recipe.duration + " Minutes";
        try{
            const response = await api.put(`/recipes/edit/${this.recipeId}`,{
                title: this.recipe.title,
                duration: this.recipe.duration,
                instructions: this.recipe.instructions,
                ingredients: this.recipe.ingredients
            }, {
                withCredentials: true
            })

            if (response.status === 200){
                location.reload();
            }

        }
        catch(error){
          this.$router.push({ name: 'error', params: { errorMessage: error} });
        }
        // You can send the form data to an API or perform any other actions
      }
  }
  };
  </script>
  
  <style scoped>

  .clickable-svg {
  display: inline-block;
  position: relative;
  transition: transform 0.3s;
  cursor: pointer;
}

.clickable-svg:hover {
  transform: scale(1.2); /* Adjust the scale value as needed */
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
  
  /* Form style */
  
  form{
    width: 90%;
    font-family: var(--secondary-font-family);
  }
  .form-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    padding: 20px;
    border-radius: 15px;
    width: 600px;
    height: fit-content;
    position: relative;
    z-index: 100;
  }

  .form-title{
    font-family: var(--logo-font-family);
    font-size: 2.5rem;
    width: fit-content;
    margin-bottom: 30px;
  }

  .form-title span{
    color: #E94C89;
  }

  .form-title .line{
    width: 100%;
    height: 3px;
    background-color: #E94C89;
    transform: translate(0, -5px);
  }

  .oneline-form{
    display: flex;
    justify-content: space-between;
    
  }

  .form-group label{
    font-weight: 600;
    font-size: 1.2rem;
  }
  .form-group input{
    border: 3px solid #E94C89;
    height: 35px;
    border-radius: 8px;
    margin-top: 5px;
    font-size: 1.1rem;
    
  }

  .add-btn{
    width: fit-content;
    border: none;
    background-color: transparent;
    display: flex;
    align-items: center;
  }

  .add-btn svg{
    width: 30px;
    height: 30px;
  }

  .add-btn span{
    margin-left: 15px;
    font-size: 1.1rem ;
    
  }

  .form-group .remove-btn{
    width: fit-content;
    padding: 8px 15px;
    border: none;
    color: white;
    border-radius: 5px;
    background-color: rgb(197, 47, 47);
  }
  .form-group table{
    margin: 5px 0;
  }

  .form-group table:nth-of-type(2){
    border: 1px solid red;
  }
  /* name input */
  .oneline-form .form-group:nth-of-type(1){
    width: 300px;

  }

  .instruction-input{
    width: 400px;
  }

  .form-group{
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  .btn-container{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .btn-container .submit-btn{
    position: relative;
    padding: 8px 20px;
    font-size: 1.2rem;
    border: none;
    color: white;
    border-radius: 15px;
    background-color: #E94C89;
  }

  .close-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    font-size: 20px;
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
  </style>
  