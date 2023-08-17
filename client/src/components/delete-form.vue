<template>
    <div class="delete-form-container">
      <!-- add recipe svg button -->
        <div class="clickable-svg" @click="showForm = true">
            <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.47495 3.3999H13.525C13.525 2.86284 13.3116 2.34777 12.9318 1.96801C12.5521 1.58825 12.037 1.3749 11.5 1.3749C10.9629 1.3749 10.4478 1.58825 10.0681 1.96801C9.6883 2.34777 9.47495 2.86284 9.47495 3.3999ZM8.12495 3.3999C8.12495 2.5048 8.48053 1.64635 9.11347 1.01342C9.7464 0.380482 10.6048 0.0249023 11.5 0.0249023C12.3951 0.0249023 13.2535 0.380482 13.8864 1.01342C14.5194 1.64635 14.875 2.5048 14.875 3.3999H21.625C21.804 3.3999 21.9757 3.47102 22.1022 3.59761C22.2288 3.72419 22.3 3.89588 22.3 4.0749C22.3 4.25392 22.2288 4.42561 22.1022 4.5522C21.9757 4.67879 21.804 4.7499 21.625 4.7499H20.2021L18.5902 18.7143C18.4762 19.7014 18.0034 20.6122 17.2616 21.2733C16.5198 21.9345 15.5608 22.2998 14.5672 22.2999H8.43275C7.43909 22.2998 6.48013 21.9345 5.73834 21.2733C4.99654 20.6122 4.52369 19.7014 4.40975 18.7143L2.79785 4.7499H1.37495C1.19593 4.7499 1.02424 4.67879 0.897654 4.5522C0.771067 4.42561 0.699951 4.25392 0.699951 4.0749C0.699951 3.89588 0.771067 3.72419 0.897654 3.59761C1.02424 3.47102 1.19593 3.3999 1.37495 3.3999H8.12495ZM5.7503 18.5604C5.82648 19.2184 6.14186 19.8254 6.63647 20.266C7.13107 20.7066 7.77037 20.95 8.43275 20.9499H14.5672C15.2295 20.95 15.8688 20.7066 16.3634 20.266C16.858 19.8254 17.1734 19.2184 17.2496 18.5604L18.8426 4.7499H4.1573L5.7503 18.5604ZM9.47495 8.1249C9.65397 8.1249 9.82566 8.19602 9.95225 8.32261C10.0788 8.44919 10.15 8.62088 10.15 8.7999V16.8999C10.15 17.0789 10.0788 17.2506 9.95225 17.3772C9.82566 17.5038 9.65397 17.5749 9.47495 17.5749C9.29593 17.5749 9.12424 17.5038 8.99765 17.3772C8.87107 17.2506 8.79995 17.0789 8.79995 16.8999V8.7999C8.79995 8.62088 8.87107 8.44919 8.99765 8.32261C9.12424 8.19602 9.29593 8.1249 9.47495 8.1249ZM14.2 8.7999C14.2 8.62088 14.1288 8.44919 14.0022 8.32261C13.8757 8.19602 13.704 8.1249 13.525 8.1249C13.3459 8.1249 13.1742 8.19602 13.0477 8.32261C12.9211 8.44919 12.85 8.62088 12.85 8.7999V16.8999C12.85 17.0789 12.9211 17.2506 13.0477 17.3772C13.1742 17.5038 13.3459 17.5749 13.525 17.5749C13.704 17.5749 13.8757 17.5038 14.0022 17.3772C14.1288 17.2506 14.2 17.0789 14.2 16.8999V8.7999Z" fill="#FF0000"/>
            </svg>
        </div>
        <!-- Only shown if the Edit svg is clicked -->
        <div class="overlay" v-if="showForm">
            <div class="delete-confirmation">
                <h2>Are You Sure, this recipe will be deleted ?</h2>
                <div class="actions-container">
                    <button @click="showForm = false">No</button>
                    <button @click="deleteRecipe">Yes</button>
                </div>
                <span class="close-icon" @click="showForm = false">
                <svg width="53" height="53" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="26.5" cy="26.5" r="26.5" fill="white"/>
                <path d="M34 20.41L32.59 19L27 24.59L21.41 19L20 20.41L25.59 26L20 31.59L21.41 33L27 27.41L32.59 33L34 31.59L28.41 26L34 20.41Z" fill="black"/>
                </svg>
            </span>
            </div>
            <div class="overlay-background" @click="showForm = false"></div>
        </div>
    </div>
  </template>
  
  <script>
  import api from "../api/index";
  export default {
    data(){
        return {
            showForm: false
        }
    },
    props: {
        recipeId:{
            type: String,
            required: true
        },
        recipeLiked:{
            type: Boolean,
            required: true
        }
    },
    methods: {
        async deleteRecipe(){
            try{
                const response = await api.delete(`/recipes/delete/${this.recipeId}`,{
                    withCredentials: true
                })
                if(response.status === 200){
                    this.removeFromLiked();
                    this.showForm = false;
                }
            }
            catch(error){
            this.$router.push({ name: 'error', params: { errorMessage: error} });
        }
        },

        async removeFromLiked(){
            if(this.recipeLiked){
                try{
                    await api.delete(`/liked/${this.recipeId}`,{withCredentials:true});
                }
                catch(error){
                    this.$router.push({ name: 'error', params: { errorMessage: error} });
                }
            }
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
  margin-left: 10px;
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
  
  .delete-confirmation {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    padding: 50px;
    border-radius: 15px;
    width: 600px;
    height: fit-content;
    position: relative;
    z-index: 100;
    font-family: var(--primary-font-family);
  }

  .delete-confirmation h2{
    font-size: 1.5rem;
  }

  .delete-confirmation .actions-container{
    display: flex;
    justify-content: space-between;
    width: 30%;
    margin-top: 20px;
  }
  .delete-confirmation .actions-container button:nth-of-type(1){
    background-color: blue;
    border: none;
    padding: 10px 20px;
    color: white;
  }

  .delete-confirmation .actions-container button:nth-of-type(2){
    background-color: red;
    border: none;
    padding: 10px 20px;
    color: white;
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
  