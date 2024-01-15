require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const app = express();
const recipeRouters = require("./routes/recipes");
const databaseConfig = require("./config/database");
const userRouters = require("./routes/users")
const likeRecipeRouters = require("./routes/likerecipes")

const allowedOrigins = ['https://davidangga.github.io', 'https://mercury.swin.edu.au']; // Update with your frontend URL

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

app.use(express.json());
app.use(cookieParser()); // parsing cookies in each request
app.use(helmet());
app.use(helmet.hidePoweredBy()); // Hide the "X-Powered-By" header
app.use(helmet.contentSecurityPolicy()); // Set Content Security Policy headers
app.use(helmet.noSniff()); // Prevent MIME type sniffing
app.use(helmet.xssFilter()); // Enable XSS filter
app.use(cors(corsOptions));

mongoose.connect(databaseConfig["development"].url, databaseConfig["development"].options)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
app.use("/api/recipes", recipeRouters);
app.use("/api/user", userRouters);
app.use("/api/liked", likeRecipeRouters);
app.listen(3000, () => {
    console.log('Server is running on port 3000');}
);
