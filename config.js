require('dotenv').config()
const config = {
    pageURL: process.env.pageURL,
    supplierURL: process.env.supplierURL,
    company: process.env.company,
    supplierCode: process.env.supplierCode,
    receptionist: process.env.receptionist,
    accounting: process.env.accounting,
    releaser: process.env.releaser
}

module.exports = config