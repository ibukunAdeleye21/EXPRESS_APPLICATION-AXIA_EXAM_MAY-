const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const userRoute = require("./routes/user.route");

// instance of express
const app = express();

// middleware for json 
app.use(express.json());

app.use(userRoute);


// connection string 
mongoose
.connect(process.env.MONGO_URL)
.then(() => console.log("connection was successful"))
.catch(() => console.log("oops something went wrong"))

// port for the project
app.listen(8000, () => {
    console.log("app is running on port 8000");
})