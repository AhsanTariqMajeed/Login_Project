const express = require("express");

const {
  registerView,
  loginView,
  registerUser,
  loginUser,
  forgetpassword,
  forgetpassword__,

} = require("../controllers/loginController");
const { dashboardView } = require("../controllers/dashboardController");
const { protectRoute } = require("../auth/protect");

const router = express.Router();

router.get("/register", registerView);
router.get("/login", loginView);
router.get("/forget", forgetpassword);

//Dashboard
router.get("/dashboard", protectRoute, dashboardView);

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forget", forgetpassword__);



module.exports = router;