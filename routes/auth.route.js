const express = require('express');
const {
    loginController, 
    registerController, 
    logoutController
    } = require("../controllers/auth.controller");

const {auth} = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/logout", auth, logoutController);
router.post("/login", loginController);
router.post("/register", registerController);

module.exports = router;