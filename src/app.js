const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const PORT = process.env.PORT;
app.use(bodyParser.urlencoded({ extended: false }));

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");
const publicPath = path.join(__dirname, "../public");

app.set("view engine", "hbs");
app.set("views", viewPath);
app.use(express.static(publicPath));
hbs.registerPartials(partialPath);

app.use("/", require("../router/userRouter"));
app.use("/", require("../router/adminRouter"));

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
