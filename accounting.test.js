const puppeteer = require('puppeteer');
const config = require('./config');

const btn = '#login_button';
const user = '#login_username';
const pass = '#login_password';

const pageURL = config.pageURL;
let page;
let browser;

//Login credentials
const Accounting = config.accounting;
const Password = "1234";

const transactionNumber = config.printedTransaction;
const invoiceNumber = config.invoice;

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

describe('Validation for Tagging Reference Number', () => {
    //start of TC_AC_001
    it('TC_AC_001 Should tag reference number', async () => {
        await page.goto(pageURL);
        // await page.waitForNetworkIdle();

        //input credentials
        await page.type(user, Accounting);
        await page.type(pass, Password);
        //click login btn
        await page.click(btn);
        // await page.waitForNetworkIdle();
        await page.waitFor(5000);

        //Search transaction
        await page.waitForSelector('#search_report');
        await page.click('#search_report');
        await page.type('#search_report', transactionNumber);
        
        //Click Add Reference button
        await page.waitForSelector('#add_ref_btn');
        await page.click('#add_ref_btn');
        
        await page.waitForSelector('.px-0 > #loader > .loader3 > .logo', {hidden: true});

        await page.waitFor(5000);

        //Click add button
        await page.waitForSelector('#add_ref_button');
        await page.click('#add_ref_button');
        
        //search invoice number
        await page.waitForSelector('#search_details');
        await page.click('#search_details');
        await page.type('#search_details', invoiceNumber);

        //Select row
        await page.waitForSelector('.card-body > .c-table > .table > tbody > tr > td:nth-child(1)');
        await page.click('.card-body > .c-table > .table > tbody > tr > td:nth-child(1)');
        
        await page.waitFor(5000);

        //Click Select button
        await page.waitForSelector('#select_ap');
        await page.click('#select_ap');

        await page.waitFor(5000);
        
        //Click Save button
        await page.waitForSelector('#add_ref_btn.mr-2');
        await page.click('#add_ref_btn.mr-2');

        await page.waitForSelector('#add-modal___BV_modal_content_', {hidden: true});
        //---------Expected Result---------

        await page.waitForSelector('tbody > tr > td > div > .badge');
        const status = await page.$eval('tbody > tr > td > div > .badge', elem => elem.innerText);
        expect(status).toMatch('Validated');
    }, 100000);
},500000)