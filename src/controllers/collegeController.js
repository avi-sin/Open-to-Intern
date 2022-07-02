// const mongoose = require("mongoose")
const collegeModel = require("../models/collegeModel")  // --> importing the collegeModel module
const internModel = require("../models/internModel")  // --> importing the internModel module
const {isValid, nameRegex, linkRegex} = require("../validations/validator")  // --> importing the validator module



// ==> POST api : to create a college

const createCollege = async function (req, res) {
    try {
        let data = req.body  // --> input is taken from the request body
        if (Object.keys(data).length === 0)  // --> if there is no input provided in the request body
            return res.status(400).send({ status: false, message: "Please enter the name, fullName and logoLink. ⚠️" });

        const { name, fullName, logoLink } = data  // --> destructuring the object


        // validations for the fields provided in the request body

        if (!isValid(name))  // --> name should be provided in the body
            return res.status(400).send({ status: false, message: "Please enter the college name. ⚠️" })
        if (!data.name.match(nameRegex))  // --> name should be provided in right format
            return res.status(400).send({ status: false, message: "name should contain alphabets only. ⚠️" })

        if (!isValid(fullName))  // --> fullName of the college should be provided in the body
            return res.status(400).send({ status: false, message: "Please enter the fullName of the college. ⚠️" })
        if (!data.fullName.match(nameRegex))  // --> fullName should be provided in right format
            return res.status(400).send({ status: false, message: "fullName can't be alphanumeric. ⚠️" })

        if (!isValid(logoLink))  // --> logoLink should be provided in the request body
            return res.status(400).send({ status: false, message: "Please enter the logoLink. ⚠️" })
        if (!logoLink.match(linkRegex))  // --> logoLink should be provided in right format
            return res.status(400).send({ status: false, message: "Please enter a valid URL. ⚠️" })

        let college = await collegeModel.findOne({ name: name })  // --> to check if that college name is already present in the database
        if (college)  // --> if college name already exists in the database
            return res.status(400).send({ status: false, message: "This name is already used. ⚠️" })

        // if that college doesn't exist in the database
        let collegeCreated = await collegeModel.create(data)  // --> a new college document is created in the database
        return res.status(201).send({ status: true, data: collegeCreated })  // --> to get the response
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}



// ==> GET api : to get the details of a college along with its interns

const getDetails = async function (req, res) {
    try {
        let collegeName = req.query.collegeName  // --> collegeName is provided in the query params

        if (!collegeName) return res.status(400).send({ status: false, message: "Provide the collegeName in query params."})

        // to check if that college exists in the database and is not deleted ( isDeleted: false )
        let findCollege = await collegeModel.findOne({ name: collegeName, isDeleted: false })

        // if that college doesn't exist in the database
        if (!findCollege) return res.status(404).send({ status: false, message: "No such college found ❗" })

        // if that college exists in the database
        const { name, fullName, logoLink } = findCollege  // --> destructing the object of the college found

        // database call to find all the interns in that college which are not deleted
        let interns = await internModel.find({ collegeId: findCollege._id, isDeleted: false }).select({ name: 1, email: 1, mobile: 1 })
        if (interns.length === 0) return res.status(404).send({ status: false, message: "No intern(s) in this college ❗" })

        let details = { name: name, fullName: fullName, logoLink: logoLink, interns: interns }  // --> defining a new object
        return res.status(200).send({ status: true, data: details })  // --> to get the response
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports = { getDetails, createCollege }  // --> exporting the functions