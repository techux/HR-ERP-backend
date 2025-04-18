const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const dbConnect = require("./utils/dbConnect");

const app = express();
const PORT = process.env.PORT || 8080;

const authRoute = require("./routes/auth.route");

app.get("/", (req, res) => {
  return res.status(200).json({
    status: "ok",
    message: "Welcome to API!",
  });
});

app.use("/auth", authRoute);

app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
  dbConnect();
});
