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
          <span>Welcome, {{userName}}</span> 
        </div>
        <div>
          <button class="logout-btn" @click="logoutUser">Logout</button>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import cookies from 'js-cookie';
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

      getUsername(){
        const decodedtoken = jwtDecode(cookies.get('clientAccessToken'));
        this.userName = decodedtoken.userName;
      },
      async logoutUser(){
        try{
          await axios.delete("http://localhost:3000/api/user/logout", {
            withCredentials: true
          });
          this.$router.push({name: 'login'});
        }
        catch(error){
          if (error.response.status === 401){
              this.$router.push({ name: 'error', params: { errorMessage: error.response.data.error} });
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
    margin-bottom: 40px;
    padding: 20px 0;
}
.logo-container{
    position: relative;
    padding-bottom: 70px;
    width: 250px;
}

.mylogo{
    position: absolute;
    font-family: var(--logo-font-family);
    font-size: 2.8rem;
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
    font-size: 1.2rem;
}

.profile-container span{
    font-size: 1.4rem;
    font-weight: 600;
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

</style>