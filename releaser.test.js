const puppeteer = require('puppeteer');
const config = require('./config');

const btn = '#login_button';
const user = '#login_username';
const pass = '#login_password';

const pageURL = config.pageURL;
let page;
let browser;

//Login credentials
const Releaser = config.releaser;
const Password = "1234";

const transactionNumber = config.validatedTransaction;
const recounterTransaction = config.recounterTransaction;

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

describe('Validation for Check Releaser can process validated transaction', () => {
    //start of TC_AC_001
    it('Should mannually complete validated transaction', async () => {
        await page.goto(pageURL);
        await page.waitForNetworkIdle();

        //input credentials
        await page.type(user, Releaser);
        await page.type(pass, Password);
        //click login btn
        await page.click(btn);
        await page.waitForNetworkIdle();

        //Search transaction
        await page.waitForSelector('#search_trans');
        await page.click('#search_trans');
        await page.type('#search_trans', transactionNumber);
        
        //Click Complete button
        await page.waitForSelector('tr > td > #complete_btn > .svg-inline--fa > path');
        await page.click('tr > td > #complete_btn > .svg-inline--fa > path');

        //Click Yes button
        await page.waitForSelector('#yes_complete');
        await page.click('#yes_complete');

        //---------Expected Result---------
        await page.waitForTimeout(2000);
        await page.waitForSelector('.px-0 > div > .alert');
        const alert = await page.$eval('.px-0 > div > .alert', elem => elem.innerText);
        expect(alert).toMatch('Success');
        
        //navigate to Reports
        await page.waitForSelector('li > #report > .container > .row > .col');
        await page.click('li > #report > .container > .row > .col');
        await page.waitForTimeout(2000);
        
        //navigate to Completed tab
        await page.waitForSelector('#cmplted_tab___BV_tab_button__');
        await page.click('#cmplted_tab___BV_tab_button__');
        
        //search counter receipt
        await page.waitForSelector('#search_completed');
        await page.click('#search_completed');
        await page.type('#search_completed',transactionNumber);
        
        await page.waitForSelector('tbody > tr > td > div > .badge-success');
        const status = await page.$eval('tbody > tr > td > div > .badge-success', elem => elem.innerText);
        expect(status).toMatch('Completed');
    }, 100000);
},500000)