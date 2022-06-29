const express = require("express");
const router = express.Router();
const collegeControllers = require("../controllers/collegeController");
const internControllers = require("../controllers/internController");

router.post("/functionup/colleges", collegeControllers.createCollege);
router.post("/functionup/interns", internControllers.createIntern);
router.get("/functionup/collegeDetails", collegeControllers.getDetails);

module.exports = router;
