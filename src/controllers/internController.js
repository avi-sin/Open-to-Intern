// const mongoose = require("mongoose")  // --> importing the mongoose
const collegeModel = require("../models/collegeModel")  // --> importing the collegeModel module
const internModel = require("../models/internModel")  // --> importing the internModel module
const { isValid, nameRegex, emailRegex, mobileRegex } = require("../validations/validator")  // --> importing the validator module



// ==> POST api : to create an intern

const createIntern = async function (req, res) {
    try {
        let data = req.body  // --> input is taken from the request body
        if (Object.keys(data).length === 0)  // --> if there is no input provided in the request body
            return res.status(400).send({ status: false, message: "Please enter the name, email, mobile and collegeId. ⚠️" });

        const { name, email, mobile, collegeName } = data  // --> destructuring the object


        // validations for the fields provided in the request body

        if (!isValid(name))  // --> name should be provided in the body
            return res.status(400).send({ status: false, message: "Please enter the intern name. ⚠️" })
        if (!nameRegex.test(name))  // --> name should be provided in right format
            return res.status(400).send({ status: false, message: "name should contain alphabets only. ⚠️" })

        if (!isValid(email))  // --> email should be provided in the body
            return res.status(400).send({ status: false, message: "Please enter the email. ⚠️" })
        if (!emailRegex.test(email))  // --> email should be provided in right format
            return res.status(400).send({ status: false, message: "Please enter the emailId in right format. ⚠️" })
        let getEmail = await internModel.findOne({ email: email });  // --> to check if provided email is already present in the database
        if (getEmail) {  // --> if that email is already provided in the database
            return res.status(400).send({ status: false, message: "Email is already in use, please enter a new one ⚠️" });
        }

        if (!isValid(mobile))  // --> mobile number should be provided in the body
            return res.status(400).send({ status: false, message: "Please enter the mobile number. ⚠️" })
        if (!mobileRegex.test(mobile))  // --> mobile number should be provided in right format
            return res.status(400).send({ status: false, message: "Enter the mobile number in valid Indian format. ⚠️" })
        let getMobile = await internModel.findOne({ mobile: mobile });  // --> to check if provided mobile number is already present in the database
        if (getMobile) {  // --> if that mobile number is already provided in the database
            return res.status(400).send({ status: false, message: "Mobile number is already in use, please enter a new one. ⚠️" });
        }

        if (!isValid(collegeName))  // --> collegeName should be provided in the body
            return res.status(400).send({ status: false, message: "Please enter the college name. ⚠️" })

        let college = await collegeModel.findOne({ name: collegeName })  // --> to check if that college is present in the database
        if (!college) return res.status(404).send({ status: false, message: "No such college found. ⚠️" })  // --> if no such college exists

        // if that collegeName is present in the database
        data.collegeId = college["_id"]  // --> adding a key value pair to the data provided in request body

        let internCreated = await internModel.create(data)  // --> a new intern document is created in the database
        return res.status(201).send({ status: true, data: internCreated })  // --> to get the response
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}



module.exports.createIntern = createIntern  // --> exporting the function