const express = require("express");
const router = express.Router();
const collegeControllers = require("../controllers/collegeController");
const internControllers = require("../controllers/internController");

router.post("/functionup/colleges", collegeControllers.createCollege);
router.get("/functionup/collegeDetails", collegeControllers.getDetails);
router.post("/functionup/interns", internControllers.createIntern);
module.exports = router;
