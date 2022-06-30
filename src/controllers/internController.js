const mongoose = require("mongoose")
const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")
const { isValid, nameRegex, emailRegex, mobileRegex } = require("../validations/validator")



// ==> POST api : to create an intern

const createIntern = async function (req, res) {
    try {
        let data = req.body
        if (Object.keys(data).length === 0)
            return res.status(400).send({ status: false, message: "Please enter the name, email, mobile and collegeId. ⚠️" });

        const { name, email, mobile, collegeName } = data
        
        if (!isValid(name)) //|| !nameRegex.test(name))
            return res.status(400).send({ status: false, message: "Please enter the valid intern name. ⚠️" })
        if (!nameRegex.test(name)) return res.status(400).send({ status: false, message: "name should contain alphabets only. ⚠️" })

        if (!isValid(email)) //|| !emailRegex.test(email))
            return res.status(400).send({ status: false, message: "Please enter a valid email. ⚠️" })
        if (!emailRegex.test(email)) return res.status(400).send({ status: false, message: "Please enter the emailId in a proper way. ⚠️" })
        let getEmail = await internModel.findOne({ email: email });
        if (getEmail) {
            return res.status(400).send({ status: false, msg: "Email is already in use, please enter a new one ⚠️" });
        }

        if (!isValid(mobile)) //|| !numberRegex.test(mobile))
            return res.status(400).send({ status: false, message: "Please enter valid mobile number. ⚠️" })
        if (!mobileRegex.test(mobile)) return res.status(400).send({ status: false, message: "Enter mobile number in a valid format. ⚠️" })
        let getMobile = await internModel.findOne({ mobile: mobile });
        if (getMobile) {
            return res.status(400).send({ status: false, msg: "Mobile no. is already in use, please enter a new one. ⚠️" });
        }

        if (!isValid(collegeName))
            return res.status(400).send({ status: false, message: "Please enter valid college name. ⚠️" })

        let college = await collegeModel.findOne({ name: collegeName })
        if (!college) return res.status(400).send({ status: false, message: "No such college found. ⚠️" })
        data.collegeId = college["_id"]

        let internCreated = await internModel.create(data)
    return res.status(201).send({ status: true, data: internCreated })
} catch (err) {
    return res.status(500).send({ status: false, message: err.message })
}
}



module.exports.createIntern = createIntern  // --> exporting the function