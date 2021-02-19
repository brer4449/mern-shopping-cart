const dotenv = require("dotenv");
const express = require("express");
const products = require("./data/products");
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

// If there's a get request to "/", take the response and send to the client the stuff in quotes
// app.get("/", (req, res) => res.send("API is running "));
app.get("/api/products", (req, res) => {
  res.json(products);
});

// if the product id is equal to params from request object and whatever we have in the wildcard (id in our case)
app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
