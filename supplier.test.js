const puppeteer = require('puppeteer');
const chalk = require('chalk');

const btn = '#login_button';
const user = '#login_username';
const pass = '#login_password';

const pageURL = 'https://cra-eut.biotechfarms.net/';
const supplierURL = 'https://cra-eut.biotechfarms.net/supplier';
let page;
let browser;

//Login credentials
const Receptionist = "315034530";
const Password = "1234";

const companyInput ='Biotech';
const supplierNameInput ='1070349 BC LTD.';
const supplierRepInput='none';
const supplierEmailInput='none@email.com';
const dateInput ='10/24/2022';
const poInput ='1000121';
const crInput='2000121';
const drInput='3000121';
const soaInput='4000121';
const invoiceInput='5000121';
const amountInput='1000';

beforeAll(async () => {
    browser = await puppeteer.launch({devtools: false, headless: false, defaultViewport: null, args: ['--start-maximized', '--kiosk-printing']});
    page = await browser.newPage();
}, 100000);

beforeEach(async () => {
}, 100000);

afterAll(async () => {
    await browser.close();
}, 100000);

describe('Validation for supplier can input  Supplier Details', () => {
    //start of TC_SP_001
    it('TC_SP_001 Should access Supplier Portal', async () => {
        console.log(chalk.green('TC_SP_001 Should access Supplier Portal'));
        await page.goto(pageURL);

        //input credentials
        await page.type(user, Receptionist, {delay:50});
        await page.type(pass,Password, {delay:50});
        //click login btn
        await page.click(btn);
        await page.waitForNetworkIdle();

        await page.waitForSelector('body > #__nuxt > #__layout > div > .sidebar');
        await page.goto(supplierURL);

        //---------Expected Result---------
        await page.waitForTimeout(2000);
        const supplierPortal = await page.$('.row > .card > .card-body > .row > .mb-5');
        expect(supplierPortal).toBeTruthy();

        await page.waitForTimeout(2000);
    }, 100000);

    //start of TC_SP_002
    it('TC_SP_002 Should input Company Name', async () => {
        console.log(chalk.green('TC_SP_002 Should input Company Name'));
        await page.waitForTimeout(2000);

        await page.waitForSelector('#company_ref');
        await page.type('#company_ref', companyInput, {delay:50});

        //---------Expected Result---------
        const validatedComp = await page.$('#company_ref.is-valid');
        expect(validatedComp).not.toBeNull();
    }, 100000);

    //start of TC_SP_003
    it('TC_SP_003 Should input Supplier Name', async () => {
        console.log(chalk.green('TC_SP_003 Should input Supplier Name'));
        await page.waitForTimeout(2000);

        await page.waitForSelector('#supplier_ref');
        await page.type('#supplier_ref', supplierNameInput, {delay:50});

        //---------Expected Result---------
        const validatedSupp = await page.$('#supplier_ref.is-valid');
        expect(validatedSupp).not.toBeNull();
    }, 100000);

    //start of TC_SP_004
    it('TC_SP_004 Should input Supplier Representative Name', async () => {
        console.log(chalk.green('TC_SP_003 Should input Supplier Representative Name'));
        await page.waitForTimeout(2000);

        await page.waitForSelector('#supplier_rep');
        await page.type('#supplier_rep', supplierRepInput, {delay:50});

        //---------Expected Result---------
        const validatedRep = await page.$('#supplier_rep.is-valid');
        expect(validatedRep).not.toBeNull();

        
        const disabledButton = await page.$('#step1_next.disabled');
        expect(disabledButton).toBeNull();
    }, 100000);

    //start of TC_SP_005
    it('TC_SP_005 Should input Supplier Representative E-mail', async () => {
        console.log(chalk.green('TC_SP_005 Should input Supplier Representative E-mail'));
        await page.waitForTimeout(2000);

        await page.waitForSelector('#supplier_email');
        await page.type('#supplier_email', supplierEmailInput, {delay:50});

        //---------Expected Result---------
        const validatedEmail = await page.$('#supplier_email.is-valid');
        expect(validatedEmail).not.toBeNull();
        await page.waitForTimeout(2000);
    }, 100000);

},500000),
describe('Validation for entering Document Details', () => {
    //start of TC_SP_006
    it('TC_SP_006 Should change Date', async () => {
        console.log(chalk.green('TC_SP_006 Should change Date'));
        await page.waitForTimeout(2000);

        await page.click('#step1_next');

        await page.waitForSelector('#docu_date');
        await page.type('#docu_date',dateInput,{delay:50});

        //---------Expected Result---------
        const validatedDate = await page.$('#docu_date.is-valid');
        expect(validatedDate).not.toBeNull();
        await page.waitForTimeout(2000);
    }, 100000);

    //start of TC_SP_007
    it('TC_SP_007 Should input PO Number', async () => {
        console.log(chalk.green('TC_SP_007 Should input PO Number'));
        await page.waitForTimeout(2000);

        await page.waitForSelector('#docu_po');
        await page.type('#docu_po',poInput,{delay:50});

        //---------Expected Result---------
        const validatedPo = await page.$('#docu_po.is-valid');
        expect(validatedPo).not.toBeNull();
        await page.waitForTimeout(2000);
    }, 100000);

    //start of TC_SP_008
    it('TC_SP_008 Should input CR Number', async () => {
        console.log(chalk.green('TC_SP_008 Should input CR Number'));
        await page.waitForTimeout(2000);

        await page.waitForSelector('#docu_cr');
        await page.type('#docu_cr',crInput,{delay:50});

        //---------Expected Result---------
        const validatedCr = await page.$('#docu_cr.is-valid');
        expect(validatedCr).not.toBeNull();
        await page.waitForTimeout(2000);
    }, 100000);

    //start of TC_SP_009
    it('TC_SP_009 Should input DR Number', async () => {
        console.log(chalk.green('TC_SP_009 Should input DR Number'));
        await page.waitForTimeout(2000);

        await page.waitForSelector('#docu_dr');
        await page.type('#docu_dr',drInput,{delay:50});

        //---------Expected Result---------
        const validatedDr = await page.$('#docu_dr.is-valid');
        expect(validatedDr).not.toBeNull();
        await page.waitForTimeout(2000);
    }, 100000);

    //start of TC_SP_010
    it('TC_SP_010 Should input SOA Number', async () => {
        console.log(chalk.green('TC_SP_010 Should input SOA Number'));
        await page.waitForTimeout(2000);

        await page.waitForSelector('#docu_soa');
        await page.type('#docu_soa',soaInput,{delay:50});

        //---------Expected Result---------
        const validatedSoa = await page.$('#docu_soa.is-valid');
        expect(validatedSoa).not.toBeNull();
        await page.waitForTimeout(2000);
    }, 100000);

    //start of TC_SP_011
    it('TC_SP_011 Should input Invoice Number', async () => {
        console.log(chalk.green('TC_SP_011 Should input Invoice Number'));
        await page.waitForTimeout(2000);

        await page.waitForSelector('#docu_invoice');
        await page.type('#docu_invoice',invoiceInput,{delay:50});

        //---------Expected Result---------
        const validatedInvoice = await page.$('#docu_invoice.is-valid');
        expect(validatedInvoice).not.toBeNull();
        await page.waitForTimeout(2000);
    }, 100000);

    //start of TC_SP_012
    it('TC_SP_012 Should Input Amount', async () => {
        console.log(chalk.green('TC_SP_012 Should Input Amount'));
        await page.waitForTimeout(2000);

        await page.waitForSelector('#docu_amount');
        await page.type('#docu_amount',amountInput,{delay:50});

        //---------Expected Result---------
        const validatedAmount = await page.$('#docu_amount.is-valid');
        expect(validatedAmount).not.toBeNull();
        await page.waitForTimeout(2000);
    }, 100000);
}, 500000),


describe.skip('Validation for supplier cannot proceed with incomplete Company and Supplier details form', () => {
    //start of TC_SP_006
    it('TC_SP_006 Should not allow null Company Name', async () => {
        console.log(chalk.green('TC_SP_006 Should not allow null Company Name'));
        await page.waitForTimeout(2000);

        //---------Expected Result---------
        const disabledButton = await page.$('#step1_next.disabled');
        expect(disabledButton).not.toBeNull();
    }, 100000);

    //start of TC_SP_007
    it('TC_SP_007 Should not allow null Supplier', async () => {
        console.log(chalk.green('TC_SP_007 Should not allow null Supplier'));
        await page.waitForTimeout(2000);

        //---------Expected Result---------
        const disabledButton = await page.$('#step1_next.disabled');
        expect(disabledButton).not.toBeNull();
    }, 100000);
}, 500000)