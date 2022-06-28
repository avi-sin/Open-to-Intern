const express = require("express");
const router = express.Router();
const collegeControllers = require("../controllers/collegeController");
const internControllers = require("../controllers/internController");

router.post("/functionup/colleges", collegeControllers.createCollege);

module.exports = router;
