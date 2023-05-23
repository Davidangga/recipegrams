import axios from 'axios';
import router from "@/router/router";
import jwt from "jsonwebtoken";
import cookies from "js-cookie";
// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:3000/api/', // Set your API base URL
});

function isTokenExpired(accessToken) {
    const decodedToken = jwt.decode(accessToken);
    const expirationTime = decodedToken.exp * 1000; // Convert expiration time to milliseconds
    const currentTime = Date.now();
    return expirationTime < currentTime;
}
  

// Add an Axios interceptor
api.interceptors.request.use(
  async (config) => {
    // Check if access token has expired
    if (isTokenExpired(cookies.get("clientAccessToken"))) {
      try {
        // Access token has expired, make a request to refresh the token
        const response = await api.post('/token');
        cookies.set("clientAccessToken",response.data.accessToken);
        return config;
      } catch (error) {
        router.push('/login');
        throw error;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
