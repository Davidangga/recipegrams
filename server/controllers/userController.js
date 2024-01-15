// import user modal
const User = require("../models/users");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const refreshTokens = new Set();
// controller functions

// add user
exports.registerUser = async (req, res) => {
    try{
        const { email, password, username} = req.body;
        // Check if the user already exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
        return res.status(400).json({ error: 'Email already exists' });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
        return res.status(400).json({ error: 'Username already exists' });
        }
        const user = new User({
            email,
            password,
            username
        });
        await user.save();
        return res.status(200).json({ message: 'User registered successfully' });
    }
    catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    } 
}

// User login
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Compare passwords
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // User authenticated, generate access token and referesh token
      const accessToken = generateAccessToken({ userId: user._id});
      const refreshToken = jwt.sign({userId : user._id}, process.env.REFRESH_TOKEN_SECRET);
      refreshTokens.add(refreshToken);

      // Make cookies for token
      res.cookie('accessToken', accessToken, {
        httpOnly: true, //cannot be accessed or modified by client-side JavaScript
        secure: true, // Set this to true when using HTTPS
        sameSite: 'none', //prevent cookie to be included in request when comming from other domain
      });

      res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: true, // Set this to true when using HTTPS
          sameSite: 'none'
      });

      // // client can access the copy of access token
      // res.cookie('clientAccessToken', accessToken, {
      //   secure: true
      // });
      
      return res.status(200).json({message: "login succesfully"});
    }catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

// get username

exports.getUsername = async (req, res) => {
  try{
    const user = await User.findById(req.userId);
    if(!user) return res.status(401).json({error: "User not found"})
    return res.status(200).json({username: user.username});
  }
  catch(error){
    return res.status(500).json({ error: 'Internal server error' });
  }
}
// User refresh access token

exports.tokenRefresh = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json({ error: 'Refresh token not found' });
  try {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403).json({ error: 'Invalid or expired refresh token' });
      if (!refreshTokens.has(refreshToken)) return res.status(403).json({ error: 'Invalid refresh token' });

      // Check if the access token is expired
      const accessToken = req.cookies.accessToken;
      const isAccessTokenExpired = isTokenExpired(accessToken);
      if (isAccessTokenExpired) {
        // Access token is expired, generate a new one
        const newAccessToken = generateAccessToken({ userId: user.userId });

        // Set the new access token in the cookies
        res.cookie('accessToken', newAccessToken, {
          httpOnly: true,
          secure: true, // Set this to true when using HTTPS
          sameSite: 'none',
        });

        // res.cookie('clientAccessToken', newAccessToken, {
        //   secure: true,
        // });

        res.json({ accessToken: newAccessToken });
      } else {
        // Access token is not expired, return the existing token
        res.json({ accessToken });
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// uaer logout delete all trace of authentication tokens
exports.logoutUser = (req,res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json({ error: 'Refresh token not found' });

  refreshTokens.delete(refreshToken);

  // clear cookies
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  
  res.json({ message: 'Logout successful' });
}

// authentication function for logic on accesing  
exports.authenticationPageAccess =  (req, res) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) return res.status(401).json({message : "Access Token not found"});
  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(403).json({message: "Invalid token or Token has expired"});
    const exist = await User.findOne({ _id : user.userId});
    if (!exist) return res.status(403).json({message: "User Id not exist"});
    return res.status(200).json({message : "Access authenticated"});
  }) 
}

// middleware function for token verification before any API can be access
exports.authenticationUser = (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) return res.status(401).json({message : "Access Token not found"});
  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({message: "Invalid token or Token has expired"});
    req.userId = user.userId;
    next();
  }) 
}
// function to generate access token
function generateAccessToken(userId){
    return jwt.sign(userId, process.env.ACCESS_TOKEN_SECRET, {expiresIn : "1h"})
}

function isTokenExpired(token) {
  if (!token) {
    return true;
  }
  const decodedToken = jwt.decode(token);
  const expirationTime = decodedToken.exp * 1000; // Convert expiration time to milliseconds
  const currentTime = Date.now();
  return expirationTime < currentTime;
}