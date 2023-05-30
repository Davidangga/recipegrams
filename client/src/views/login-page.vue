<template>
    <div id="background">
      <div class="container">
        <div class="row justify-content-center align-items-center">
          <div class="col-md-12">
            <div class="login-container">
                
                <div class="logo-container">
                    <div class="mylogo">
                        Recipe<span>Grams</span>
                    </div>
                </div>

                <div class="radio-container">
                    <label class="btn btn-primary d-flex align-items-center justify-content-center" :class="{ active: formType === 'login' }">
                        <input type="radio" value="login" v-model="formType" class="form-check-input" /> Login
                    </label>
                    <label class="btn btn-primary d-flex align-items-center justify-content-center" :class="{ active: formType === 'register' }">
                        <input type="radio" value="register" v-model="formType" class="form-check-input" /> Register
                    </label>
                </div>
              
              <div v-if="formType === 'login'">
                <form @submit.prevent="login" novalidate>
                  <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" v-model="loginData.email" :class="{'is-invalid': loginErrors.email}" class="form-control" required>
                    <div v-if="loginErrors.email" class="invalid-feedback">{{ loginErrors.email }}</div>
                  </div>
                  <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" v-model="loginData.password" :class="{'is-invalid': loginErrors.password}" class="form-control" required>
                    <div v-if="loginErrors.password" class="invalid-feedback">{{ loginErrors.password }}</div>
                  </div>

                  <div v-if="registerSuccessful" class="success-message">Account has been registered, please log in.</div>
                  <div v-if="loginErrorMessage" class="error-message">{{ loginErrorMessage }}</div>

                  <div class="form-group submit-container">
                    <button type="submit" class="">Login</button>
                  </div>
                </form>
              </div>
  
              <div v-if="formType === 'register'">
                <form @submit.prevent="register" novalidate>
                  <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" v-model="registerData.username" class="form-control" required>
                  </div>
                  <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" v-model="registerData.email" :class="{'is-invalid': resgisterErrors.email}" class="form-control" required>
                    <div v-if="resgisterErrors.email" class="invalid-feedback">{{ resgisterErrors.email }}</div>
                  </div>
                  <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" v-model="registerData.password" :class="{'is-invalid': resgisterErrors.password}" class="form-control" required>
                    <div v-if="resgisterErrors.password" class="invalid-feedback">{{ resgisterErrors.password }}</div>
                  </div>
                  <div v-if="registerErrorMessage" class="error-message">{{ registerErrorMessage }}</div>
                  <div class="form-group submit-container">
                    <button type="submit" class="">Register</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
  


<script>
import axios from "axios";
export default {
    name: 'loginPage',
    data(){
        return{
            loginData: {
                email: "",
                password: ""
            },
            registerData: {
                email: "",
                password: "",
                username:""
            },
            loginErrorMessage: "",
            registerErrorMessage: "",
            loginErrors: {},
            resgisterErrors: {},
            formType: "login",
            registerSuccessful: false,
        }
    },
    methods: {
        async login() {

        // Clear any previous data from register
        this.loginErrors = {}; 
        this.resgisterErrors = {};
        this.loginErrorMessage = "";
        this.registerSuccessful = false;
        // Validate input
        if (!this.loginData.email) {
            this.loginErrors.email = 'Email is required.';
        } else if (!this.isValidEmail(this.loginData.email)) {
            this.loginErrors.email = 'Please enter a valid email address.';
        }
        
        if (!this.loginData.password) {
            this.loginErrors.password = 'Password is required.';
        } else if (!this.isValidPassword(this.loginData.password)) {
            this.loginErrors.password = 'Password must be at least 8 characters long and contain a combination of letters, numbers, and special characters.';
        }
        
        // Check if there are any loginErrors
        if (Object.keys(this.loginErrors).length === 0) {
            try{
                const response = await axios.post("http://localhost:3000/api/user/login", 
                {
                    email: this.loginData.email, 
                    password: this.loginData.password
                },
                {
                  withCredentials: true,
                });
                if (response.status === 200){
                    this.$router.push({ name: 'home' });
                }
            }
            catch(error){
                if (error.response.status === 401){
                    this.loginErrorMessage = error.response.data.error;
                }
                else{
                    this.$router.push({ name: 'error', params: { errorMessage: error} });
                }
            }
        }
        },
        async register() {
          // Clear any previous data from login
        this.loginErrors = {};
        this.resgisterErrors = {};
        this.registerErrorMessage = "";
        // Validate input
        if (!this.registerData.email) {
            this.resgisterErrors.email = 'Email is required.';
        } else if (!this.isValidEmail(this.registerData.email)) {
            this.resgisterErrors.email = 'Please enter a valid email address.';
        }
        
        if (!this.registerData.password) {
            this.resgisterErrors.password = 'Password is required.';
        } else if (!this.isValidPassword(this.registerData.password)) {
            this.resgisterErrors.password = 'Password must be at least 8 characters long and contain a combination of letters, numbers, and special characters.';
        }
        
        // Check if there are any resgisterErrors
        if (Object.keys(this.resgisterErrors).length === 0) {
            try{
                const response = await axios.post("http://localhost:3000/api/user/register", 
                {
                    email: this.registerData.email,
                    password: this.registerData.password,
                    username: this.registerData.username
                });

                if (response.status === 200){
                    this.registerSuccessful = true;
                    this.formType = "login";
                    this.resetForm();
                }
            }
            catch(error){
                if (error.response.status === 400){
                    this.registerErrorMessage = error.response.data.error;
                }
                else{
                    this.$router.push({ name: 'error', params: { errorMessage: error} });
                }
            }
        }
        },
        resetForm(){
            this.loginData.email = "";
            this.loginData.password = "";
            this.registerData.email = "";
            this.registerData.password = "";
            this.registerData.username = "";
            this.loginErrorMessage = "";
            this.registerErrorMessage = "";
        },
        isValidEmail(email) {
        // Regular expression to validate email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
        },
        isValidPassword(password) {
        // Regular expression to validate password format
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        return passwordPattern.test(password);
        },
    }

}

</script>

<style scoped>

#background{
    position: relative;
    background-color: #E94C89;
    min-height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center; 
    justify-content: center; 
}

.login-container {
    position: relative;
    max-width: 90%;
    margin: 0 auto;
    padding: 20px;
    background-color: #ffff;
    border-radius: 20px;
    bottom: 40px;
}

.logo-container{
    position: relative;
    padding-bottom: 70px;
}

.mylogo{
    position: absolute;
    font-family: var(--logo-font-family);
    font-size: 1rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.mylogo span{
    color: #E94C89;
}

.form-group{
    margin-bottom: 15px;
}
.form-group label{
    font-family: var(--primary-font-family);
    margin-bottom: 5px;
    font-weight: 500;
}

form input{
    border-color: #E94C89;
    border-width: 2px;
    border-radius: 10px;
}

.radio-container{
    display: flex;
    width: 280px;
    align-items: center;
    justify-content: space-between;
    margin: 20px auto;
}

.radio-container .btn{
    width: 120px;
    height: 40px;
    border: none;
    border-radius: 50px;
    background-color: #D9D9D9;
    color: #666666;
    font-family: var(--primary-font-family);
    font-size: 1.1rem;
}

.radio-container .active{
    background-color: #E94C89;
    color: white;
}

.radio-container input[type="radio"] {
  opacity: 0;
  position: fixed;
  width: 0;
}

.submit-container{
    display: flex;
    justify-content: center;
}
form button{
    margin-top: 15px;
    font-family: var(--primary-font-family);
    font-size: 1.1rem;
    width: 150px;
    height: 40px;
    border-radius: 50px;
    background-color: #E94C89;
    border: none;
    color: white;

}

.error-message {
  color: red;
  margin-bottom: 10px;
}

.success-message {
  color: green;
  margin-bottom: 10px;
}


.is-invalid {
  border-color: red;
}

.invalid-feedback {
  color: red;
  font-size: 0.8em;
  margin-top: 5px;
}

/* Tablet */
@media (min-width: 768px) {
  /* Add tablet-specific styles here */

  .login-container{
    max-width: 70%;
  }
}

/* Desktop */
@media (min-width: 1200px) {
  /* Add desktop-specific styles here */
  .mylogo{
    font-size: 2.5rem;
  }

  .radio-container{
    width: 350px;
  }

  .radio-container .btn{
    width: 150px;
    height: 50px;
    font-size: 1.1rem;
    }

  form{
    max-width: 70%;
    margin: 0 auto;
    font-size: 1.1rem;
  }

  form input{
    height: 40px;
    font-size: 1.1rem;
  }
  .login-container {
    max-width: 50%;
  }

  form button{
    width: 200px;
    height: 50px;
    margin-top: 30px;

    }
}
</style>