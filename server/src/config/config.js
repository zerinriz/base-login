require("dotenv").config();


const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || "base-login-app",
  mongoUri: process.env.MONGO_URI || "mongodb+srv://zerin123:zerin123@cluster0.zyokl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
};

export default config;
