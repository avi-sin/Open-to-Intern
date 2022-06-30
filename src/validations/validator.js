const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

let nameRegex = /^[.a-zA-Z\s,-]+$/
let linkRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/
let emailRegex = /^[a-z]{1}[a-z0-9._]{1,100}[@]{1}[a-z]{2,15}[.]{1}[a-z]{2,10}$/

let mobileRegex = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/


module.exports = {isValid, nameRegex, linkRegex, emailRegex, mobileRegex}