const router = require("express").Router();
const Admin = require("../model/user");
const jwt = require("jsonwebtoken");
const aauth = require("../middleware/adminAuth");

router.get("/admin", (req, resp) => {
  resp.render("adminLogin");
});

router.get("/dashboard", aauth, (req, resp) => {
  resp.render("dashboard");
});

router.post("/adminLogin", async (req, resp) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email });

    if (admin) {
      if (admin.pass == req.body.pass) {
        const token = await jwt.sign({ _id: admin._id }, process.env.S_KEY);
        resp.cookie("admintoken", token);
        resp.redirect("dashboard");
      } else {
        resp.render("adminLogin", { err: "Invalid credentials" });
      }
    } else {
      resp.render("adminLogin", { err: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);

    resp.render("adminLogin", { err: "Invalid credentials" });
  }
});

router.get("/adminLogout", async (req, resp) => {
  resp.clearCookie("admintoken");
  resp.render("adminLogin");
});

router.get("/users", async (req, resp) => {
  try {
    resp.render("users");
  } catch (error) {}
});

router.get("/categories", async (req, resp) => {
  try {
    resp.render("category");
  } catch (error) {}
});

router.get("/products", async (req, resp) => {
  try {
    resp.render("product");
  } catch (error) {}
});

router.get("/orders", async (req, resp) => {
  try {
    resp.render("order");
  } catch (error) {}
});

module.exports = router;
