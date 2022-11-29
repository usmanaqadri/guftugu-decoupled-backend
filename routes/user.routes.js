const express = require("express");
const router = express.Router();

const ctrls = require("../controllers");

router.get("/allUsers", ctrls.user.index);

router.get("/user/:id", ctrls.user.show);

router.put("/user/:id", ctrls.user.update);

router.post("/register", ctrls.user.register);

router.post("/signin", ctrls.user.signIn);

router.post("/", ctrls.user.checkUser);

module.exports = router;
