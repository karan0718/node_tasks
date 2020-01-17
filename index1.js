const puppeteer = require('puppeteer');
let url = 'http://www.google.com';
(async () => {
	try{
		const browser = await puppeteer.launch({headless: false});
      	const page = await browser.newPage();
      	await page.goto(url);
      	await page.waitForSelector('.gLFyf.gsfi');
      	await page.click('.gLFyf.gsfi');
      	await page.keyboard.type('hello');
      	await page.click('#tsf > div:nth-child(2) > div.A8SBwf > div.FPdoLc.tfB0Bf > center > input.gNO89b');
      	await page.waitForNavigation({ waitUntil: 'networkidle0' });
      	await browser.close();
	}catch(exception){
		console.log(exception);
	}


})();