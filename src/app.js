const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");
const hbs = require("hbs");
const PORT = process.env.PORT || 3000;

const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");
const publicPath = path.join(__dirname, "../public");

app.set("view engine", "hbs");
app.set("views", viewPath);
app.use(express.static(publicPath));

app.get("/", (req, resp) => {
  resp.render("index");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
