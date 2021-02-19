const dotenv = require("dotenv");
const express = require("express");
const connectDB = require("./config/db");
const colors = require("colors");
const productRoutes = require("./routes/productRoutes");
dotenv.config();

connectDB();

const PORT = process.env.PORT || 5000;
const app = express();

// If there's a get request to "/", take the response and send to the client the stuff in quotes
// app.get("/", (req, res) => res.send("API is running "));
app.use("/api/products", productRoutes);

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
