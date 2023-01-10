require('dotenv').config()
const config = {
    pageURL: process.env.pageURL,
    supplierURL: process.env.supplierURL,
    company: process.env.company,
    supplierCode: process.env.supplierCode,
    receptionist: process.env.receptionist,
    accounting: process.env.accounting,
    releaser: process.env.releaser,
    invoice: process.env.invoice,
    companyInput :process.env.companyInput,
    supplierNameInput :process.env.supplierNameInput,
    supplierRepInput:process.env.supplierRepInput,
    supplierEmailInput:process.env.supplierEmailInput,
    dateInput :process.env.dateInput,
    poInput :process.env.poInput,
    crInput:process.env.crInput,
    drInput:process.env.drInput,
    soaInput:process.env.soaInput,
    invoiceInput:process.env.invoiceInput,
    amountInput:process.env.amountInput,
    transactionNum: process.env.transactionNum
}

module.exports = config