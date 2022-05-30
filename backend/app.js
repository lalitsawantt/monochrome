require('dotenv').config()

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
// CONNECTING TO DB
try{
  mongoose.connect(process.env.DATABASE, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
  }).then(() => {
    console.log("DB CONNECTED");
  }).catch((e) => console.log("ERROR IN CONNECTION TO DB : ", e))
}catch(e){
  console.log("Something went wrong with the database connection : ", e);
};

// ROUTES

// MIDDLEWARES
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use("/api", authRoutes);
// PORT
const PORT = process.env.PORT || 8000;

// STARTING SERVER
app.listen(PORT, () => {
  console.log(`app is running at ${PORT}`);
})