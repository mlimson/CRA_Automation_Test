const puppeteer = require('puppeteer');
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

const companySelect = config.company;
const supplierSelect= config.supplierCode;

const transactionNum = config.pendingTransaction;
const supplierRepInput=uniqueNamesGenerator({dictionaries: [adjectives, languages, names], style: 'capital', separator: ' '});
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
        headless: true, 
        defaultViewport: null, 
        args: [
            '--start-maximized',
            '--kiosk-printing',
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--disable-setuid-sandbox',
            '--no-sandbox',
            '--proxy-server=http://192.168.36.35:3128'
        ]
        });
    page = await browser.newPage();
}, 100000);

beforeEach(async () => {
}, 100000);

afterAll(async () => {
    await browser.close();
}, 100000);

describe('Validation for receptionist can acces Supplier Portal', () => {
    //start of TC_RC_001
    it('TC_RC_001 Should access Supplier Portal', async () => {
        await page.goto(pageURL);
        await page.waitForNetworkIdle();

        //input credentials
        await page.type(user, Receptionist);
        await page.type(pass,Password);
        //click login btn
        await page.click(btn);
        await page.waitForNetworkIdle();

        await page.waitForSelector('body > #__nuxt > #__layout > div > .sidebar');
        await page.goto(supplierURL);

        //---------Expected Result---------
        await page.waitForTimeout(2000);
        const supplierPortal = await page.$('.row > .card > .card-body > .row > .mb-5');
        expect(supplierPortal).toBeTruthy();
    }, 100000);
},500000),

describe('Validation for processing pending transaction', () => {
    it('TC_RC_002 Should allow processing pending transaction', async () => {
        page = await browser.newPage();
        await page.goto(pageURL);
        await page.waitForNetworkIdle();

        //input credentials
        await page.type(user, Receptionist);
        await page.type(pass,Password);
        //click login btn
        await page.click(btn);
        await page.waitForNetworkIdle();

        await page.waitForSelector('#search_pending_transc');
        await page.type('#search_pending_transc', transactionNum);

        //Click Process transaction button
        await page.waitForSelector('tr:nth-child(1) > td > #process_transc > .svg-inline--fa > path');
        await page.click('tr:nth-child(1) > td > #process_transc > .svg-inline--fa > path');

        //Select company
        await page.waitForSelector('#pr_company');
        await page.select('#pr_company', companySelect);

        await page.waitForSelector('#pending_tab > .px-0 > #loader > .loader3 > .logo', {hidden:true});

        //Select Supplier
        await page.waitForTimeout(2000);
        await page.waitForSelector('#pr_supplier');
        await page.select('#pr_supplier', supplierSelect);

        //Click Submit button
        await page.waitForSelector('#pr_submittransc');
        await page.click('#pr_submittransc');
        
        //Click Yes button
        await page.waitForSelector('#saveprocess_md');
        await page.click('#saveprocess_md');

        await page.waitForNavigation();

        //---------Expected Result---------
        await page.waitForTimeout(2500);
        //Navigate to Printed Transaction Tab
        await page.waitForSelector('#printed_tab_rpt___BV_tab_button__');
        await page.click('#printed_tab_rpt___BV_tab_button__');
        
        await page.waitForTimeout(2000);
        await page.waitForSelector('#search_printed');
        await page.type('#search_printed',transactionNum);
        
        await page.waitForSelector('tbody > tr > td > div > .badge-primary');
        const status = await page.$eval('tbody > tr > td > div > .badge-primary', elem => elem.innerText);
        expect(status).toMatch('Printed');
    }, 100000);
}, 500000),

describe('Validation for creating new transaction', () => {
    //start of TC_RC_003
    it('TC_RC_003 Should input Company and Supplier Details', async () => {
        page = await browser.newPage();
        await page.goto(pageURL);
        await page.waitForNetworkIdle();

        //input credentials
        await page.type(user, Receptionist);
        await page.type(pass,Password);
        //click login btn
        await page.click(btn);
        await page.waitForNetworkIdle();

        //Click Create Transaction button
        await page.waitForSelector('#create_trnsc');
        await page.click('#create_trnsc');

        //Select Company
        await page.waitForSelector('#crt_company');
        await page.select('#crt_company', companySelect);
        
        await page.waitForSelector('#create_transaction-modal___BV_modal_body_ > div > #loader > .loader3 > .logo', {hidden:true});
        
        //Select Supplier
        await page.waitForSelector('#crt_spplr');
        await page.select('#crt_spplr', supplierSelect);
        
        //Input Supplier Rep Name
        await page.type('#crt_suprep', supplierRepInput);
        
        //Input Supplier Rep Email
        await page.click('#crt_email', supplierEmailInput);
        
        //---------Expected Result---------
        const disabledButton = await page.$('#stp1_next.disabled');
        expect(disabledButton).toBeNull();
    }, 100000);

    //start of TC_RC_004
    it('TC_RC_004 Should input Document Details', async () => {
        //click next button
        await page.click('#stp1_next');
        
        //Input doc date
        await page.waitForSelector('#docu_date');
        await page.type('#docu_date', dateInput);
        
        //Input po number
        await page.waitForSelector('#po');
        await page.type('#po', poInput);
        
        //Input cr number
        await page.waitForSelector('#cr');
        await page.type('#cr', crInput);
        
        //Input dr number
        await page.waitForSelector('#dr');
        await page.type('#dr', drInput);
        
        //Input soa number
        await page.waitForSelector('#soa');
        await page.type('#soa', soaInput);
        
        //Input invoice number
        await page.waitForSelector('#inv');
        await page.type('#inv', invoiceInput);
        
        //Input Amount
        await page.click('#amnt');
        await page.type('#amnt', amountInput);

        //---------Expected Result---------
        await page.waitForSelector('#submit');
        const disabledButton = await page.$('#submit.disabled');
        expect(disabledButton).toBeNull();
    }, 100000);

    //start of TC_RC_005
    it('TC_RC_005 Should submit transaction', async () => {
        //Click Submit button
        await page.waitForSelector('#submit');
        await page.click('#submit');
        
        //Click Yes button
        await page.waitForSelector('#submit-transaction');
        await page.click('#submit-transaction');
        
        //---------Expected Result---------
        await page.waitForTimeout(2500);
        await page.waitForSelector('#printed_tab_rpt___BV_tab_button__');
        await page.click('#printed_tab_rpt___BV_tab_button__');
        
        await page.waitForTimeout(2000);
        await page.waitForSelector('#search_printed');
        await page.type('#search_printed', supplierRepInput);
        
        await page.waitForTimeout(2000);
        await page.waitForSelector('tbody > tr > td > div > .badge-primary');
        const status = await page.$eval('tbody > tr > td > div > .badge-primary', elem => elem.innerText);
        expect(status).toMatch('Printed');
    }, 100000);
},500000)
