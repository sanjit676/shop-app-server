const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const authRouter = require("../routes/auth/auth-route");
const adminProductsRouter = require("../routes/admin/products-routes");
const adminOrderRouter = require("../routes/admin/order-routes");

const shopProductsRouter = require("../routes/shop/products-routes");
const shopCartRouter = require("../routes/shop/cart-routes");
const shopAddressRouter = require("../routes/shop/address-routes");
const shopOrderRouter = require("../routes/shop/order-routes");
const shopSearchRouter = require("../routes/shop/search-routes");
const shopReviewRouter = require("../routes/shop/review-routes");

const commonFeatureRouter = require("../routes/common/feature-routes");

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("db connected");
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.get("/", (req, res) => res.send("Express on Vercel"));
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);

app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);

app.use("/api/common/feature", commonFeatureRouter);

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;
