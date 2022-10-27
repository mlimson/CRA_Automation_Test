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

const companySelect = '';
const supplierSelect= '';

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
const amountInput='1,000.00';

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
    //start of TC_RC_001
    it('TC_RC_001 Should access Supplier Portal', async () => {
        console.log(chalk.green('TC_RC_001 Should access Supplier Portal'));
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
},500000),

describe('Validation for processing pending transaction', () => {
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

        //Click Process transaction button
        await page.waitForTimeout(2000);
        await page.waitForSelector('tr:nth-child(1) > td > #process_transc > .svg-inline--fa > path');
        await page.click('tr:nth-child(1) > td > #process_transc > .svg-inline--fa > path');

        //Select company
        await page.waitForTimeout(2000);
        await page.waitForSelector('#pr_company');
        await page.click('#pr_company');
        await page.waitForTimeout(2000);
        await page.select('#pr_company', '4400');
        await page.waitForTimeout(2000);
        await page.click('#pr_company');

        //Select Supplier
        await page.waitForTimeout(2000);
        await page.waitForSelector('#pr_supplier');
        await page.click('#pr_supplier');
        await page.waitForTimeout(2000);
        await page.select('#pr_supplier', 'V100117');
        await page.waitForTimeout(2000);
        await page.click('#pr_supplier');

    }, 100000);
}, 500000)
