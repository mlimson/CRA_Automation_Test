const puppeteer = require('puppeteer');
const chalk = require('chalk');

const btn = '#login_button';
const user = '#login_username';
const pass = '#login_password';

const pageURL = 'https://cra-eut.biotechfarms.net/';
let page;
let browser;

//Login credentials
const validUsername = "Admin";
const validPassword = "1234";
const invalidUsername = "SuperAdmin";
const invalidPassword ="password";

beforeAll(async () => {
    browser = await puppeteer.launch({devtools: false, headless: false, defaultViewport: null, args: ['--start-maximized', '--kiosk-printing']});
    console.log(chalk.yellow('Counter Receipt Automation'));
}, 100000);

//launches browser before executing tests
beforeEach(async () => {
    page = await browser.newPage();

    await page.setDefaultNavigationTimeout(0);

    await page.goto(pageURL, {waitUntil: 'networkidle0'});
    await page.setViewport({
        width: 1920,
        height: 1080
    });

    await page.on('load');
    await page.on('domcontentloaded');

    const ptitle = await page.title();
    const title = 'Counter Receipt Automation';
    expect(ptitle).toMatch(title);
}, 100000);

afterAll(async () => {
    await browser.close();
}, 100000);

describe('Log-in Module', () => {
    //start of TC_LG_001
    it('TC_LG_001 Should not allow invalid username and invalid password', async () => {
        console.log(chalk.green('TC_LG_001 Should not allow invalid username and invalid password'));
        await page.waitForTimeout(2000);

        //input credentials
        await page.waitForTimeout(2000);
        await page.type(user, invalidUsername, {delay:50});
        await page.waitForTimeout(2000);
        await page.type(pass,invalidPassword, {delay:50});
        await page.waitForTimeout(2000);
        //click login btn
        await page.click(btn);
        
        //---------Expected Result---------
        await page.waitForSelector('div > .login-background > #loader > .loader3 > .logo',{hidden:true});
        const alert = await page.$eval('.body > main > div > div > .alert', elem => elem.innerText);
        console.log(alert);
        expect(alert).toMatch('User does not exist.');

        await page.waitForTimeout(2000);
    }, 100000);

    //start of TC_LG_002
    it('TC_LG_002 Should not allow valid username and invalid password', async () => {
        console.log(chalk.green('TC_LG_002 Should not allow valid username and invalid password'));
        await page.waitForTimeout(2000);

        //input login credentials
        await page.waitForTimeout(2000);
        await page.type(user, validUsername, {delay:200});
        await page.waitForTimeout(2000);
        await page.type(pass,invalidPassword, {delay:200});
        await page.waitForTimeout(2000);
        //click login buttons
        await page.click(btn);
        
        //---------Expected Result---------
        await page.waitForSelector('div > .login-background > #loader > .loader3 > .logo',{hidden:true});
        const alert = await page.$eval('.body > main > div > div > .alert', elem => elem.innerText);
        console.log(alert);
        expect(alert).toMatch('Incorrect password.');

        await page.waitForTimeout(2000);
    }, 100000);

     //start of TC_LG_003
     it('TC_LG_003 Should not allow invalid username and valid password', async () => {
        console.log(chalk.green('TC_LG_003 Should not allow invalid username and valid password'));
        await page.waitForTimeout(2000);

        //input credentials
        await page.waitForTimeout(2000);
        await page.type(user, invalidUsername, {delay:50});
        await page.waitForTimeout(2000);
        await page.type(pass,validPassword, {delay:50});
        await page.waitForTimeout(2000);
        //click login btn
        await page.click(btn);
        
        //---------Expected Result---------
        await page.waitForSelector('div > .login-background > #loader > .loader3 > .logo',{hidden:true});
        const alert = await page.$eval('.body > main > div > div > .alert', elem => elem.innerText);
        console.log(alert);
        expect(alert).toMatch('User does not exist.');

        await page.waitForTimeout(2000);
    }, 100000);

    //start of TC_LG_004
    it('TC_LG_004 Should not allow null username and null password', async () => {
        console.log(chalk.green('TC_LG_004 Should not allow null username and null password'));
        await page.waitForTimeout(2000);

        const disabledButton = await page.$('#login_button.disabled');
        expect(disabledButton).not.tobeNull();

        await page.waitForTimeout(2000);
    }, 100000);

    //start of TC_LG_005
    it('TC_LG_005 Should not allow null username', async () => {
        console.log(chalk.green('TC_LG_005 Should not allow null username'));
        await page.waitForTimeout(2000);

        //input password
        await page.waitForTimeout(2000);
        await page.type(pass,validPassword, {delay:50});

        //---------Expected Result---------
        const disabledButton = await page.$('#login_button.disabled');
        expect(disabledButton).not.tobeNull();

        await page.waitForTimeout(2000);
    }, 100000);

    //start of TC_LG_006
    it('TC_LG_006 Should not allow null password', async () => {
        console.log(chalk.green('TC_LG_006 Should not allow null password'));
        await page.waitForTimeout(2000);

        //input password
        await page.waitForTimeout(2000);
        await page.type(user, validUsername, {delay:50});

        //---------Expected Result---------
        const disabledButton = await page.$('#login_button.disabled');
        expect(disabledButton).not.tobeNull();

        await page.waitForTimeout(2000);
    }, 100000);

    //start of TC_LG_007
    it('TC_LG_007 Should allow valid username and password', async () => {
        console.log(chalk.green('TC_LG_005 Should allow valid username and password'));
        await page.waitForTimeout(2000);

        //input credentials
        await page.waitForTimeout(2000);
        await page.type(user, validUsername, {delay:50});
        await page.waitForTimeout(2000);
        await page.type(pass,validPassword, {delay:50});
        await page.waitForTimeout(2000);
        //click login btn
        await page.click(btn);
        
        //---------Expected Result---------
        await page.waitForTimeout(2000);
        const sidebar = await page.$('body > #__nuxt > #__layout > div > .sidebar');
        expect(sidebar).toBeDefined();
    
    }, 50000);

},500000);