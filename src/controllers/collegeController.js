const mongoose = require("mongoose")
const collegeModel = require("../models/collegeModel")

// let nameRegex = /^(?=.*[A-Za-z]){1,20}$/
let nameRegex = /^[#.a-zA-Z\s,-]+$/
let emailRegex = /^[a-z]{1}[a-z0-9._]{1,100}[@]{1}[a-z]{2,15}[.]{1}[a-z]{2,10}$/
// let linkRegex = /(https?:\/\/(?:www\.)?[\w+-_.0-9@\/]+logo.(?:png|jpg|jpeg))/i


const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const createCollege = async function (req, res) {
    try {
        let data = req.body
        if (!isValid(data.name)) return res.status(400).send({ status: false, message: "name is mandatory." })
        if (!data.name.match(nameRegex)) return res.status(400).send({ status: false, message: "name should contain alphabets only and not alphanumeric." })

        if (!isValid(data.fullName)) return res.status(400).send({ status: false, message: "fullName is mandatory." })
        if (!data.fullName.match(nameRegex)) return res.status(400).send({ status: false, message: "fullName should contain alphabets only and not alphanumeric." })

        if (!isValid(data.logoLink)) return res.status(400).send({ status: false, message: "logoLink is mandatory." })
        // if (!data.logoLink.match(linkRegex)) return res.status(400).send({ status: false, message: "logoLink must be either in png, jpg or jpeg format." })

        let college = await collegeModel.findOne({ name: data.name })
        if (college) return res.status(400).send({ status: false, message: "name should be unique." })
        
        let collegeCreated = await collegeModel.create(data)
        return res.status(201).send({ status: true, data: collegeCreated })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports.createCollege = createCollege