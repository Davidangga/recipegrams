import {createRouter, createWebHistory} from 'vue-router';
import HomePage from '../views/home-page.vue';
import LoginPage from '../views/login-page.vue';
import ErrorPage from "../views/error-page.vue";
import BrowsePage from "../views/browse-page.vue";
import LikePage from "../views/like-page.vue";
import PrivatePage from "../views/private-page.vue";
import NotFound from "../views/notfound-page.vue";
import api from "../api/index";
const routes = [
    {
        path: "/",
        name: "home",
        component: HomePage,
        meta: { requiresAuth: true },
    },
    {
        path: "/browse",
        name: "browse",
        component: BrowsePage,
        meta: { requiresAuth: true },
    },
    {
        path: "/like",
        name: "like",
        component: LikePage,
        meta: { requiresAuth: true },
    },
    {
        path: "/private",
        name: "private",
        component: PrivatePage,
        meta: { requiresAuth: true },
    },
    {
        path: "/login",
        name: "login",
        component: LoginPage,
        meta: {userHasLogin: true},
    },
    {
        path: "/error/:errorMessage",
        name: "error",
        component: ErrorPage,
        props: true
    },
    { path: '/:pathMatch(.*)*', component: NotFound },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  

router.beforeEach( async (to, from, next) => {
    let isAuthenticated = false;
        try{
            const response = await api.post("user/auth", null, {
            withCredentials: true,
            });
            if (response.status === 200){
                isAuthenticated = true;
            }
        }
        catch (error){
            isAuthenticated = false;
        }
    if (to.meta.requiresAuth) {
        // Route requires authentication
        if (isAuthenticated) {
        next();
        } else {
        // Redirect to login page
            next({ name: 'login' });
        }
    } 
    else if(to.meta.userHasLogin){
        //Login page doesn required authentication but check if user is still has access token
        if (isAuthenticated){
            // Redirect to home page
            next({ name: 'home' });
        }
        else{
            next();
        }
    }
    else {
        // Route does not require any authentication
        next();
    }

})
export default router;


