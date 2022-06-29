const mongoose = require("mongoose")
const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")
// const validator = require('email-validator')


let nameRegex = /^[#.a-zA-Z\s,-]+$/
// let nameRegex = /^[a-zA-Z\s]$/   
let emailRegex = /^[a-z]{1}[a-z0-9._]{1,100}[@]{1}[a-z]{2,15}[.]{1}[a-z]{2,10}$/
let numberRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/


const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const createIntern = async function (req, res) {
    try {
        let data = req.body
        if (Object.keys(data).length === 0)
            return res.status(400).send({ status: false, message: "Please enter the name, email, mobile and collegeId. ⚠️" });

        const { name, email, mobile, collegeId } = data
        if (!isValid(name) || !nameRegex.test(name))
            return res.status(400).send({ status: false, message: "Please enter the valid intern name. ⚠️" })
        // if (!nameRegex.test(name))return res.status(400).send({ status: false, message: "name should contain alphabets only." })

        // let validatedemail = validator.validate(email)
        // // console.log(validatedemail);
        // // return res.send("yes")
        // if (!validatedemail) return res.send({ msg: "email is not valid" })

        if (!isValid(email) || !emailRegex.test(email))
            return res.status(400).send({ status: false, message: "Please enter a valid email. ⚠️" })
        // if (!emailRegex.test(email))return res.status(400).send({ status: false, message: "Please enter the emailId in a proper way" })

        if (!isValid(mobile) || !numberRegex.test(mobile))
            return res.status(400).send({ status: false, message: "Please enter valid mobile number. ⚠️" })
        // if (!numberRegex.test(mobile))return res.status(400).send({ status: false, message: "Enter mobile number in a valid format." })

        if (!isValid(collegeId) || !mongoose.Types.ObjectId.isValid(collegeId))
            return res.status(400).send({ status: false, message: "Please enter valid college id. ⚠️" })

        let college = await collegeModel.findById(data.collegeId)
        if (!college) return res.status(400).send({ status: false, message: "No such college found. ⚠️" })

        let internCreated = await internModel.create(data)
        return res.status(201).send({ status: true, data: internCreated })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports.createIntern = createIntern