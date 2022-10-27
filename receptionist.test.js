const puppeteer = require('puppeteer');
const chalk = require('chalk');
const moment = require('moment');

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

const companySelect = '4400';
const supplierSelect= 'V100117';

const companyInput ='Biotech';
const supplierNameInput ='1070349 BC LTD.';
const supplierRepInput='Rep' + moment().format('MMM DD, h:mm:ss a');
const supplierEmailInput='none@email.com';
const dateInput ='10/24/2022';
const poInput ='1000121';
const crInput='2000121';
const drInput='3000121';
const soaInput='4000121';
const invoiceInput='5000121';
const amountInput='1,000.00';

beforeAll(async () => {
    browser = await puppeteer.launch(
        {
            devtools: false, 
            headless: false, 
            defaultViewport: null, 
            args: ['--start-maximized', '--kiosk-printing']
        }
    );
    page = await browser.newPage();
}, 100000);

beforeEach(async () => {
}, 100000);

afterAll(async () => {
    await browser.close();
}, 100000);

describe.skip('Validation for supplier can input  Supplier Details', () => {
    //start of TC_RC_001
    it('TC_RC_001 Should access Supplier Portal', async () => {
        console.log(chalk.green('TC_RC_001 Should access Supplier Portal'));
        await page.goto(pageURL);
        await page.waitForNetworkIdle();

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
},500000),

describe.skip('Validation for processing pending transaction', () => {
    it('TC_RC_002 Should allow processing pending transaction', async () => {
        console.log(chalk.green('TC_RC_002 Should allow processing pending transaction'));
        await page.waitForTimeout(2000);
        page = await browser.newPage();
        await page.goto(pageURL);
        await page.waitForNetworkIdle();

        //input credentials
        await page.type(user, Receptionist, {delay:50});
        await page.type(pass,Password, {delay:50});
        //click login btn
        await page.click(btn);
        await page.waitForNetworkIdle();

        //get transaction number
        await page.waitForSelector('.c-table > #pending-table > tbody > tr > td:nth-child(1)');
        const transactionNum = await page.$eval('.c-table > #pending-table > tbody > tr > td:nth-child(1)', elem => elem.innerText);

        //Click Process transaction button
        await page.waitForTimeout(2000);
        await page.waitForSelector('tr:nth-child(1) > td > #process_transc > .svg-inline--fa > path');
        await page.click('tr:nth-child(1) > td > #process_transc > .svg-inline--fa > path');

        //Select company
        await page.waitForTimeout(2000);
        await page.waitForSelector('#pr_company');
        await page.click('#pr_company');
        await page.waitForTimeout(2000);
        await page.select('#pr_company', companySelect);
        await page.waitForTimeout(2000);
        await page.click('#pr_company');

        await page.waitForSelector('#pending_tab > .px-0 > #loader > .loader3 > .logo', {hidden:true});

        //Select Supplier
        await page.waitForTimeout(2000);
        await page.waitForSelector('#pr_supplier');
        await page.click('#pr_supplier');
        await page.waitForTimeout(2000);
        await page.select('#pr_supplier', supplierSelect);
        await page.waitForTimeout(2000);
        await page.click('#pr_supplier');

        //Click Submit button
        await page.waitForTimeout(2000);
        await page.waitForSelector('#pr_submittransc');
        await page.click('#pr_submittransc');
        
        //Click Yes button
        await page.waitForTimeout(2000);
        await page.waitForSelector('#saveprocess_md');
        await page.click('#saveprocess_md');

        await page.waitForNavigation();

        await page.waitForTimeout(2000);
        //---------Expected Result---------
        //Navigate to Printed Transaction Tab
        await page.waitForSelector('#printed_tab_rpt___BV_tab_button__');
        await page.click('#printed_tab_rpt___BV_tab_button__');
        
        await page.waitForSelector('#search_printed');
        await page.type('#search_printed',transactionNum, {delay:50});
        
        await page.waitForSelector('tbody > tr:nth-child(1) > td > div > .badge');
        const status = await page.$eval('tbody > tr:nth-child(1) > td > div > .badge', elem => elem.innerText);
        expect(status).toMatch('Printed');

        await page.waitForTimeout(2000);
    }, 100000);
}, 500000),

describe('Validation for creating new transaction', () => {
    //start of TC_RC_003
    it('TC_RC_003 Should input Company and Supplier Details', async () => {
        console.log(chalk.green('TC_RC_003 Should input Company and Supplier Details'));
        await page.waitForTimeout(2000);

        page = await browser.newPage();
        await page.goto(pageURL);
        await page.waitForNetworkIdle();

        //input credentials
        await page.type(user, Receptionist, {delay:50});
        await page.type(pass,Password, {delay:50});
        //click login btn
        await page.click(btn);
        await page.waitForNetworkIdle();

        //Click Create Transaction button
        await page.waitForTimeout(2000);
        await page.waitForSelector('#create_trnsc');
        await page.click('#create_trnsc');

        //Select Company
        await page.waitForTimeout(2000);
        await page.click('#crt_company');
        await page.waitForTimeout(2000);
        await page.select('#crt_company', companySelect)
        await page.waitForTimeout(2000);
        await page.click('#crt_company');
        
        await page.waitForSelector('#create_transaction-modal___BV_modal_body_ > div > #loader > .loader3 > .logo', {hidden:true})
        
        //Select Supplier
        await page.waitForTimeout(2000);
        await page.click('#crt_spplr')
        await page.waitForTimeout(2000);
        await page.select('#crt_spplr', supplierSelect);
        await page.waitForTimeout(2000);
        await page.click('#crt_spplr');
        
        //Input Supplier Rep Name
        await page.waitForTimeout(2000);
        await page.type('#crt_suprep', supplierRepInput);
        
        //Input Supplier Rep Email
        await page.waitForTimeout(2000);
        await page.click('#crt_email', supplierEmailInput);
        
        //---------Expected Result---------
        const disabledButton = await page.$('#stp1_next.disabled');
        expect(disabledButton).toBeNull();

        await page.waitForTimeout(2000);
    }, 100000);

    //start of TC_RC_004
    it('TC_RC_004 Should input Document Details', async () => {
        console.log(chalk.green('TC_RC_004 Should input Document Details'));
        await page.waitForTimeout(2000);

        //click next button
        await page.click('#stp1_next');
        
        //Input doc date
        await page.waitForTimeout(2000);
        await page.waitForSelector('#docu_date');
        await page.type('#docu_date', dateInput, {delay:50});
        
        //Input po number
        await page.waitForTimeout(2000);
        await page.waitForSelector('#po');
        await page.type('#po', poInput, {delay:50});
        
        //Input cr number
        await page.waitForTimeout(2000);
        await page.waitForSelector('#cr');
        await page.type('#cr', crInput, {delay:50});
        
        //Input dr number
        await page.waitForTimeout(2000);
        await page.waitForSelector('#dr');
        await page.type('#dr', drInput, {delay:50});
        
        //Input soa number
        await page.waitForTimeout(2000);
        await page.waitForSelector('#soa');
        await page.type('#soa', soaInput, {delay:50});
        
        //Input invoice number
        await page.waitForTimeout(2000);
        await page.waitForSelector('#inv');
        await page.type('#inv', invoiceInput, {delay:50});
        
        //Input Amount
        await page.waitForTimeout(2000);
        await page.click('#amnt');
        await page.type('#amnt', amountInput, {dealy:50});

        //---------Expected Result---------
        await page.waitForSelector('#submit');
        const disabledButton = await page.$('#submit.disabled');
        expect(disabledButton).toBeNull();

        await page.waitForTimeout(2000);
    }, 100000);

    //start of TC_RC_005
    it('TC_RC_005 Should submit transaction', async () => {
        console.log(chalk.green('TC_RC_005 Should submit transaction'));
        await page.waitForTimeout(2000);

        //Click Submit button
        await page.waitForSelector('#submit');
        await page.click('#submit');
        
        //Click Yes button
        await page.waitForTimeout(2000);
        await page.waitForSelector('#submit-transaction');
        await page.click('#submit-transaction');
        
        //---------Expected Result---------
        await page.waitForTimeout(2000);
        await page.waitForSelector('#printed_tab_rpt___BV_tab_button__');
        await page.click('#printed_tab_rpt___BV_tab_button__');
        
        await page.waitForTimeout(2000);
        await page.waitForSelector('#search_printed');
        await page.type('#search_printed', supplierRepInput);
        console.log(chalk.yellow(supplierRepInput));
        
        await page.waitForTimeout(2000);
        await page.waitForSelector('tbody > tr > td > div > .badge-primary');
        const status = await page.$eval('tbody > tr > td > div > .badge-primary', elem => elem.innerText);
        expect(status).toMatch('Printed');

        await page.waitForTimeout(2000);
    }, 100000);
},500000)
