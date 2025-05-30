const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// import user route
const userRoute = require("./routes/user.route");

// create an instance of express
const app = express();

// middleware for json 
app.use(express.json());

app.use(userRoute);


// connection string to mongoDB
mongoose
.connect(process.env.MONGO_URL)
.then(() => console.log("connection was successful"))
.catch(() => console.log("oops something went wrong"))

// running port for the project
app.listen(8000, () => {
    console.log("app is running on port 8000");
})