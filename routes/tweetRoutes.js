const express = require("express");
const {create} = require( "../controllers/UserController");
const router = express.Router();

router.post("/api/tweets", create);

module.exports = router;
