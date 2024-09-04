const puppeteer = require('puppeteer');
const config = require('./config')

const btn = 'button[id="login_button"]';
const user = 'input[id="login_username"]';
const pass = 'input[id="login_password"]';

const pageURL = config.pageURL;
let page;
let browser;

//Login credentials
const validUsername = "Admin";
const validPassword = "b10t3chf@rms";
const invalidUsername = "SuperAdmin";
const invalidPassword ="password";

beforeAll(async () => {
    browser = await puppeteer.launch({
        devtools: true, 
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
        ],
        });
}, 100000);

//launches browser before executing tests
beforeEach(async () => {
    page = await browser.newPage();


    await page.goto(pageURL);
    await page.setViewport({width: 1920, height: 1080});
    await page.on('load');
    await page.on('domcontentloaded');
}, 100000);

afterEach(async() =>{
    await page.close();
}, 100000);

afterAll(async () => {
    await browser.close();
}, 100000);

describe('Log-in Module', () => {
    //start of TC_LG_001
    it('TC_LG_001 Should not allow invalid username and invalid password', async () => {
        //input credentials
        await page.type('#login_username', invalidUsername);
        await page.type(pass,invalidPassword);
        //click login btn
        await page.click(btn);
        
        //---------Expected Result---------
        await page.waitForSelector('div > .login-background > #loader > .loader3 > .logo',{hidden:true});
        const alert = await page.$eval('.body > main > div > div > .alert', elem => elem.innerText);
        expect(alert).toMatch('User does not exist.');
    }, 100000);

    //start of TC_LG_002
    it('TC_LG_002 Should not allow valid username and invalid password', async () => {
        //input login credentials
        await page.type(user, validUsername);
        await page.type(pass,invalidPassword);
        //click login buttons
        await page.click(btn);
        
        //---------Expected Result---------
        await page.waitForSelector('div > .login-background > #loader > .loader3 > .logo',{hidden:true});
        const alert = await page.$eval('.body > main > div > div > .alert', elem => elem.innerText);
        expect(alert).toMatch('Incorrect password.');
    }, 100000);

     //start of TC_LG_003
     it('TC_LG_003 Should not allow invalid username and valid password', async () => {
        //input credentials
        await page.type(user, invalidUsername);
        await page.type(pass,validPassword);
        //click login btn
        await page.click(btn);
        
        //---------Expected Result---------
        await page.waitForSelector('div > .login-background > #loader > .loader3 > .logo',{hidden:true});
        const alert = await page.$eval('.body > main > div > div > .alert', elem => elem.innerText);
        expect(alert).toMatch('User does not exist.');
    }, 100000);

    //start of TC_LG_004
    it('TC_LG_004 Should not allow null username and null password', async () => {
        const disabledButton = await page.$('#login_button.disabled');
        expect(disabledButton).not.toBeNull();
    }, 100000);

    //start of TC_LG_005
    it('TC_LG_005 Should not allow null username', async () => {
        //input password
        await page.type(pass,validPassword);

        //---------Expected Result---------
        const disabledButton = await page.$('#login_button.disabled');
        expect(disabledButton).not.toBeNull();
    }, 100000);

    //start of TC_LG_006
    it('TC_LG_006 Should not allow null password', async () => {
        //input password
        await page.type(user, validUsername);

        //---------Expected Result---------
        const disabledButton = await page.$('#login_button.disabled');
        expect(disabledButton).not.toBeNull();
    }, 100000);

    //start of TC_LG_007
    it('TC_LG_007 Should allow valid username and password', async () => {
        //input credentials
        await page.type(user, validUsername);
        await page.type(pass,validPassword);
        //click login btn
        await page.click(btn);
        
        //---------Expected Result---------
        const sidebar = await page.$('body > #__nuxt > #__layout > div > .sidebar');
        expect(sidebar).toBeDefined();
    }, 50000);
},500000);