const puppeteer = require('puppeteer');
const moment = require('moment');
const config = require('./config');
const { uniqueNamesGenerator, adjectives,languages, names } = require('unique-names-generator');

const btn = '#login_button';
const user = '#login_username';
const pass = '#login_password';

const pageURL = config.pageURL;
const supplierURL = config.supplierURL;
let page;
let browser;

//Login credentials
const Receptionist = config.receptionist;
const Password = "1234";

const companyInput =config.companyInput;
const supplierNameInput =config.supplierNameInput;
const supplierRepInput= uniqueNamesGenerator({dictionaries: [adjectives, languages, names], style: 'capital', separator: ' '});
const supplierEmailInput=config.supplierEmailInput;
const dateInput =config.dateInput;
const poInput =config.poInput;
const crInput=config.crInput;
const drInput=config.drInput;
const soaInput=config.soaInput;
const invoiceInput=config.invoiceInput;
const amountInput=config.amountInput;

beforeAll(async () => {
    browser = await puppeteer.launch({
        devtools: false, 
        headless: false, 
        defaultViewport: null, 
        args: [
            '--start-maximized',
            '--kiosk-printing',
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--disable-setuid-sandbox',
            '--no-sandbox',
            // '--proxy-server=http://192.168.36.35:3128'
        ]
        });
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
        await page.goto(pageURL);
        //input credentials
        await page.type(user, Receptionist);
        await page.type(pass,Password);
        //click login btn
        await page.click(btn);

        await page.waitForSelector('body > #__nuxt > #__layout > div > .sidebar');
        await page.goto(supplierURL);

        //---------Expected Result---------
        await page.waitForTimeout(2000);
        const supplierPortal = await page.$('.row > .card > .card-body > .row > .mb-5');
        expect(supplierPortal).toBeTruthy();
    }, 100000);

    //start of TC_SP_002
    it('TC_SP_002 Should input Company Name', async () => {
        await page.waitForSelector('#company_ref');
        await page.type('#company_ref', companyInput);

        //---------Expected Result---------
        const validatedComp = await page.$('#company_ref.is-valid');
        expect(validatedComp).not.toBeNull();
    }, 100000);

    //start of TC_SP_003
    it('TC_SP_003 Should input Supplier Name', async () => {
        await page.waitForSelector('#supplier_ref');
        await page.type('#supplier_ref', supplierNameInput);

        //---------Expected Result---------
        const validatedSupp = await page.$('#supplier_ref.is-valid');
        expect(validatedSupp).not.toBeNull();
    }, 100000);

    //start of TC_SP_004
    it('TC_SP_004 Should input Supplier Representative Name', async () => {
        await page.waitForSelector('#supplier_rep');
        await page.type('#supplier_rep', supplierRepInput);

        //---------Expected Result---------
        const validatedRep = await page.$('#supplier_rep.is-valid');
        expect(validatedRep).not.toBeNull();
        const disabledButton = await page.$('#step1_next.disabled');
        expect(disabledButton).toBeNull();
    }, 100000);

    //start of TC_SP_005
    it('TC_SP_005 Should input Supplier Representative E-mail', async () => {
        await page.waitForSelector('#supplier_email');
        await page.type('#supplier_email', supplierEmailInput);

        //---------Expected Result---------
        const validatedEmail = await page.$('#supplier_email.is-valid');
        expect(validatedEmail).not.toBeNull();
    }, 100000);

},500000),
describe('Validation for entering Document Details', () => {
    //start of TC_SP_006
    it('TC_SP_006 Should change Date', async () => {
        await page.click('#step1_next');

        await page.waitForSelector('#docu_date');
        await page.type('#docu_date',dateInput,{delay:50});

        //---------Expected Result---------
        const validatedDate = await page.$('#docu_date.is-valid');
        expect(validatedDate).not.toBeNull();
    }, 100000);

    //start of TC_SP_007
    it('TC_SP_007 Should input PO Number', async () => {
        await page.waitForSelector('#docu_po');
        await page.type('#docu_po',poInput,{delay:50});

        //---------Expected Result---------
        const validatedPo = await page.$('#docu_po.is-valid');
        expect(validatedPo).not.toBeNull();
    }, 100000);

    //start of TC_SP_008
    it('TC_SP_008 Should input CR Number', async () => {
        await page.waitForSelector('#docu_cr');
        await page.type('#docu_cr',crInput,{delay:50});

        //---------Expected Result---------
        const validatedCr = await page.$('#docu_cr.is-valid');
        expect(validatedCr).not.toBeNull();
    }, 100000);

    //start of TC_SP_009
    it('TC_SP_009 Should input DR Number', async () => {
        await page.waitForSelector('#docu_dr');
        await page.type('#docu_dr',drInput,{delay:50});

        //---------Expected Result---------
        const validatedDr = await page.$('#docu_dr.is-valid');
        expect(validatedDr).not.toBeNull();
    }, 100000);

    //start of TC_SP_010
    it('TC_SP_010 Should input SOA Number', async () => {
        await page.waitForSelector('#docu_soa');
        await page.type('#docu_soa',soaInput,{delay:50});

        //---------Expected Result---------
        const validatedSoa = await page.$('#docu_soa.is-valid');
        expect(validatedSoa).not.toBeNull();
    }, 100000);

    //start of TC_SP_011
    it('TC_SP_011 Should input Invoice Number', async () => {
        await page.waitForSelector('#docu_invoice');
        await page.type('#docu_invoice',invoiceInput,{delay:50});

        //---------Expected Result---------
        const validatedInvoice = await page.$('#docu_invoice.is-valid');
        expect(validatedInvoice).not.toBeNull();
    }, 100000);

    //start of TC_SP_012
    it('TC_SP_012 Should Input Amount', async () => {
        await page.waitForSelector('#docu_amount');
        await page.type('#docu_amount',amountInput,{delay:50});

        //---------Expected Result---------
        const validatedAmount = await page.$('#docu_amount.is-valid');
        expect(validatedAmount).not.toBeNull();

        const disabledButton = await page.$('#step2_next.disabled');
        expect(disabledButton).toBeNull();
    }, 100000);
}, 500000),

describe('Validation for Supplier may submit transaction', () => {
    it('TC_SP_013 Should display encoded document details for review', async () => {
        await page.waitForSelector('#step2_next');
        await page.click('#step2_next');

        await page.waitForTimeout(2000);
        //---------Expected Result---------
        // const compName = await page.$eval('#company_input', elem => elem.value);
        // expect(compName).toMatch(companyInput);
        // const suppName = await page.$eval('#supplier_input', elem => elem.value);
        // expect(suppName).toMatch(supplierNameInput);
        // const repName = await page.$eval('#rep_name_input', elem => elem.value);
        // expect(repName).toMatch(supplierRepInput);
        // const repEmail = await page.$eval('#rep_mail_input', elem => elem.value);
        // expect(repEmail).toMatch(supplierEmailInput);
        // let docDate = await page.$eval('#docu_date', elem => elem.value);
        // docDate = moment(docDate).format('L');
        // expect(docDate).toMatch(dateInput);
        // const docPO = await page.$eval('#po_number', elem => elem.value);
        // expect(docPO).toMatch(poInput);
        // const docCR = await page.$eval('#cr_number', elem => elem.value);
        // expect(docCR).toMatch(crInput);
        // const docDR = await page.$eval('#dr_number', elem => elem.value);
        // expect(docDR).toMatch(drInput);
        // const docSOA = await page.$eval('#soa_number', elem => elem.value);
        // expect(docSOA).toMatch(soaInput);
        // const docInv = await page.$eval('#invoice_number', elem => elem.value);
        // expect(docInv).toMatch(invoiceInput);
        // const DocAmt = await page.$eval('#amount-input', elem => elem.value);
        // expect(DocAmt).toMatch(amountInput);
    }, 100000);

    it('TC_SP_014 Should submit transaction', async () => {
        await page.waitForSelector('#step3_submit');
        await page.click('#step3_submit');

        await page.waitForSelector('#submit_modal_yes');
        await page.click('#submit_modal_yes');

        await page.waitForSelector('#submit-modal___BV_modal_content_', {hidden:true});

        //---------Expected Result---------
        const alert = await page.$eval('div > div > div > div > .alert', elem => elem.innerText);
        expect(alert).toMatch('Success');
    }, 100000);
}, 500000),

describe('Validation for supplier cannot proceed with incomplete Company and Supplier details form', () => {
    //start of TC_SP_006
    it('TC_SP_006 Should not allow null Company Name', async () => {
        //---------Expected Result---------
        const disabledButton = await page.$('#step1_next.disabled');
        expect(disabledButton).not.toBeNull();
    }, 100000);

    //start of TC_SP_007
    it('TC_SP_007 Should not allow null Supplier', async () => {
        //---------Expected Result---------
        const disabledButton = await page.$('#step1_next.disabled');
        expect(disabledButton).not.toBeNull();
    }, 100000);
}, 500000)