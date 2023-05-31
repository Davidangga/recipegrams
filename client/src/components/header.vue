<template>
     <div class="row justify-content-between nav-container">
      <div class="col-3">
        <div class="logo-container">
            <div class="mylogo">
                Recipe<span>Grams</span>
            </div>
        </div>
      </div>
      <div class="col-3 profile-container">
        <div>
          <!-- change this -->
          <span>Welcome, <span class="username">{{userName}}</span></span> 
        </div>
        <div>
          <button class="logout-btn" @click="logoutUser">Logout</button>
        </div>
      </div>
    </div>
</template>

<script>
import api from "../api/index";
export default{
    name: "headerComponent",
    data(){
        return{
            userName: "",
        }
    },
    created(){
      this.getUsername();
    },
    methods: {

      async getUsername(){
        try{
          const response = await api.get("/user/name", {
            withCredentials:true
          });
          if(response.status === 200){
            this.userName = response.data.username
          }
        }
        catch(error){
          this.$router.push({ name: 'error', params: { errorMessage: error} });
        }
      },
      async logoutUser(){
        try{
          await api.delete("/user/logout", {
            withCredentials: true
          });
          this.$router.push({name: 'login'});
        }
        catch(error){
          if (error.response.status === 401){
              this.$router.push({ name: 'error', params: { errorMessage: error} });
          }
        }
      }
  }
}
</script>

<style scoped>

.nav-container{
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding: 15px 0;
}
.logo-container{
    position: relative;
    padding-bottom: 70px;
    width: 250px;
}

.mylogo{
    position: absolute;
    font-family: var(--logo-font-family);
    font-size: 2vw;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.mylogo span{
    color: #E94C89;
}

.profile-container{
    display: flex;
    width: fit-content;
    justify-content: center;
    align-items: center;
    font-family: var(--primary-font-family);
    font-size: 1rem;
}

.profile-container span{
    font-size: 1.2rem;
    font-weight: 600;
}

.username{
  color: #E94C89;
}
.logout-btn{
    margin-left: 70px;
    width: 100px;
    height: 40px;
    border: none;
    border-radius: 10px;
    background-color: #E94C89;
    color: white;

}

@media (max-width: 1200px) {

  .profile-container{
    font-size: 1rem;
  }

  .profile-container span{
    font-size: 1.2rem;
  }

}
/* For smaller tablet */
@media (max-width: 1024px){
  .mylogo{
  font-size: 2rem;
}

.profile-container{
    font-size: 0.8rem;
  }

  .profile-container span{
    font-size: 1rem;
  }

  .nav-container{
    margin-bottom: 0px;
    padding: 10px 0;
}
}

/* For mobile phone */
@media (max-width: 428px){
  .logo-container{
    width: 150px;
    padding: 10px 0;
    margin-left: 10px;
  }
  .mylogo{
    font-size: 1.5rem;
  }
  .profile-container span{
    font-size: 0.8rem;
  }

  .nav-container{
    margin-bottom: 0px;
    padding: 10px 0;
    width: 100vw;
    margin: 0;
}
.logout-btn{
    margin-left: 20px;
    width: 80px;
    height: 30px;
    margin-right: 10px;
}
}


</style>