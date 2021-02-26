const dotenv = require("dotenv");
const express = require("express");
const connectDB = require("./config/db");
const colors = require("colors");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
dotenv.config();

connectDB();

const PORT = process.env.PORT || 5000;
const app = express();

// Allows us to accept JSON data in the body
app.use(express.json());

// If there's a get request to "/", take the response and send to the client the stuff in quotes
// app.get("/", (req, res) => res.send("API is running "));
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

// Calling custom error handler middleware
app.use(notFound);
app.use(errorHandler);

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
