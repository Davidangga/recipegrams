<template>
    <div class="container">
      <div class="row">
        <div class="col-10">
          <div class="recipe-video">
            <div class="video-container">
                <iframe
                    :src="videourl"
                    frameborder="0"
                    allow="autoplay; encrypted-media"
                ></iframe>
            </div>
            <div class="overlay"></div>
            <div class="recipe-description">
                <div class="description-container">
                    <h3>{{recipeTitle}}</h3>
                    <p>{{recipeCreator}}</p>
                </div>
            </div>
          </div>
        </div>
        <div class="col-2">
            <div class="recipe-actions">
                <button class="like-button" @click="likeVideo">
                <div class="circle-icon" :class="{liked : recipeliked}">
                    <svg width="30" height="30" viewBox="0 0 36 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path :class="{liked : recipeliked}" d="M25.8652 0.282227C22.4794 0.282227 19.5863 2.69561 17.9967 4.35946C16.4072 2.69561 13.5205 0.282227 10.1363 0.282227C4.3031 0.282227 0.230713 4.34815 0.230713 10.1684C0.230713 16.5815 5.28848 20.7265 10.1815 24.7359C12.4915 26.6308 14.8823 28.5886 16.7157 30.7597C17.0243 31.1232 17.4766 31.3332 17.9515 31.3332H18.0452C18.5217 31.3332 18.9724 31.1215 19.2793 30.7597C21.116 28.5886 23.5052 26.6292 25.8168 24.7359C30.7082 20.7282 35.7692 16.5831 35.7692 10.1684C35.7692 4.34815 31.6968 0.282227 25.8652 0.282227Z" fill="black"/>
</svg>
                </div>
                </button>
                <recipeContentComponent :recipeId="recipeId" :recipeLiked="recipeliked"></recipeContentComponent>
            </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import api from "../api/index";
  import recipeContentComponent from "../components/recipe-content.vue";
  export default {
    props: {
      recipedata: {
        type: Object,
        required: true
      }
    }
    ,
    name: "recipeComponent",
    components: {
      recipeContentComponent
    },
    data(){
        return{
            videourl: "",
            recipeTitle: "Chicken Parma",
            recipeCreator: "",
            recipeId: "",
            recipeliked: false,

        }
    },
    created(){
        this.checkForLikeVideo();
        this.recipeCreator = "Created by " + this.recipedata.createdBy;
        this.recipeTitle = this.recipedata.title;
        this.recipeId = this.recipedata._id;
        this.extractYouTubeVideoId(this.recipedata.videolink);
    },
    methods: {
      async checkForLikeVideo(){
        try{
          const response = await api.get("/liked", {
            withCredentials: true
          })
          if(response.status === 200){
            const userlikeRecipes = response.data;
            if(userlikeRecipes.includes(this.recipeId)){
              this.recipeliked = true;
            }
            else{
              this.recipeliked = false;
            }
          }
        }
        catch(error){
          this.$router.push({ name: 'error', params: { errorMessage: error} });
        }
      },
      async likeVideo() {
        if(!this.recipeliked){
          try{
            await api.put(`/liked/${this.recipeId}`,null, {
              withCredentials: true
            });
            this.recipeliked = true;
          }
          catch(error){
            this.$router.push({ name: 'error', params: { errorMessage: error} });
          }
        }
        else{
          try{
            await api.delete(`/liked/${this.recipeId}`,{withCredentials:true});
            this.recipeliked = false;
          }
          catch(error){
            this.$router.push({ name: 'error', params: { errorMessage: error} });
          }
        }
      },
      openInfo() {
        // Handle more info button click
      },
     extractYouTubeVideoId(url) {
      
        // Regular expression pattern to match YouTube URLs
        const pattern = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:embed\/|watch\?v=|v\/)|youtu\.be\/)([\w-]{11})(?:\S+)?$/;

        // Extract the video ID using the pattern
        const match = url.match(pattern);

        if (match && match[1]) {
            // Extracted video ID
            const videoId = match[1];
            this.videourl = `https://www.youtube.com/embed/${videoId}?controls=0&showinfo=0&rel=0`;
        }
        else{
            // Return null if the video ID couldn't be extracted
            this.videourl = null;
        }
        }
    }
  };
  </script>
  
  <style scoped>

  .container{
    position: relative;
    display: flex;
    justify-content: center;
    margin-bottom: 7.5vh;
  }
  .recipe-video {
    position: relative;
    width: 370px;
    height: 620px;
    overflow: hidden;
    background-color: black;
    border-radius: 15px;
  }
  
  .video-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  
  .video-container iframe {
    width: 100%;
    height: 100%;
  }
  

  .video-actions {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
  }

  .recipe-actions{
    display: flex;
    position: absolute;
    flex-direction: column;
    bottom: 0;
    margin-left: 35px;
    margin-bottom: 20px;
    width: fit-content;
  }

  .overlay{
    position: absolute;
    background: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
    z-index: 1;
    top: 70%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 20%;
  }
  .recipe-description{
    position: absolute;
    background: black;
    z-index: 1;
    top: 90%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 20%;
    color: white;
    font-family: var(--secondary-font-family);
  }

  .description-container{
    padding: 30px;
    font-size: 0.9rem;
  }

  .description-container h3{
    font-weight: 600;
    font-size: 1.2rem;
    margin-bottom: 10px;
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

  button .liked{
    background-color: #D94646;
  }
  
  svg .liked{
    fill: white;
  }
  .like-button{
    margin-bottom: 20px;
    border: none;
    background-color: transparent;
  }
  
    /* For larger tablet screen */
  @media (max-width: 1280px) {
    .recipe-video{
      width: 330px;
    height: 580px;
    }
}

  /* For smaller tablet */
  @media (max-width: 1024px){
    .recipe-video{
      width: 300px;
      height: 530px;
    }
  }
  </style>
  