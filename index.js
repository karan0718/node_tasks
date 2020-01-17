const puppeteer = require('puppeteer');

async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}

(async function main(){

	try{
		const browser = await puppeteer.launch({
				headless: false,
				slowMo:10 ,
				ignoreHTTPSErrors: true,
				defaultViewport: null
		});

		const page = await browser.newPage();
		await page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.87 Safari/537.36");

		await page.goto('https://www.linkedin.com/jobs/search?keywords=Biotechnology&location=London%2C%20England%2C%20United%20Kingdom&trk=guest_job_search_jobs-search-bar_search-submit&redirect=false&position=1&pageNum=0', {
				waitUntil: 'networkidle2'
		});

		await page.type('#username', "anuj.odz@gmail.com");
		await page.type('#password', "Anujkumar@odz123");

		const form = await page.$('.login__form');
		await form.evaluate(form => form.submit());

		await page.waitForNavigation();

		let urls = [
			"https://www.linkedin.com/in/craigwelch/",
			//"https://www.linkedin.com/in/amandeep-dole-8a077944/",

		];

		let data= [];
		for(let url of urls){
			await page.goto(url,{
				waitUntil: 'networkidle2'
			})

			const username = await page.$eval('#ember45 > div.ph5.pb5 > div.display-flex.mt2 > div.flex-1.mr5 > ul.pv-top-card-v3--list.inline-flex.align-items-center > li.inline.t-24.t-black.t-normal.break-words', el => el.innerText.trim());

			const city = await page.$eval('#ember45 > div.ph5.pb5 > div.display-flex.mt2 > div.flex-1.mr5 > ul.pv-top-card-v3--list.pv-top-card-v3--list-bullet.mt1 > li.t-16.t-black.t-normal.inline-block', el => el.innerText.trim());
			

			try{
				let see_more_btn = await page.$('.pv-experience-section__see-more button');
				see_more_btn.click();
				await page.waitFor(3000);
			}catch(err){
				console.log(err)
			}

/*			let experiences = await page.$$('#experience-section > ul > li');
			console.log(experiences.length);
			for(experience of experiences){

				let multiexps = null;

				try{
					let exp_more_btn = await experience.$('.pv-profile-section__position-group-pager button');
					exp_more_btn.click();
					await page.waitFor(3000);
				}catch(err){
					//console.log("exp list",err);
				}

				try{
					multiexps = await experience.$$('ul.pv-entity__position-group li');
				}catch(err){
					//console.log(err);
				}
	
				if(multiexps.length) {
					let company = await experience.$eval('div.pv-entity__company-summary-info > h3 > span:nth-child(2)',el=>el.innerText);
					let position = [];
					let timestarted = [];
					let location = [];
					for(multiexp of multiexps){
						let mPosition = "NA";
						try{
							mPosition = await multiexp.$eval('div.pv-entity__summary-info-v2 > h3 > span:nth-child(2)',el=>el.innerText);
						}catch(err){

						}
						position.push(mPosition);

						let mTimeStarted = "NA";

						try{
							mTimeStarted = await multiexp.$eval('div.pv-entity__summary-info-v2 > div > h4.pv-entity__date-range.t-14.t-black--light.t-normal > span:nth-child(2)',el=>el.innerText);
						}catch(err){

						}
						timestarted.push(mTimeStarted);

						let mLocation = "NA";

						try{
							mLocation = await multiexp.$eval('div.pv-entity__summary-info-v2 > h4 > span:nth-child(2)',el=>el.innerText);
						}catch(err){

						}
						location.push(mLocation);
					}
					console.log(company,position,timestarted,location);
				}else{

					 let position = await experience.$eval('div.pv-entity__summary-info.pv-entity__summary-info--background-section > h3',el=>el.innerText);
					 let company = await experience.$eval('div.pv-entity__summary-info.pv-entity__summary-info--background-section > p.pv-entity__secondary-title',el=>el.innerText);

					 let timestarted = await experience.$eval('div.pv-entity__summary-info.pv-entity__summary-info--background-section > div > h4.pv-entity__date-range > span:nth-child(2)',el=>el.innerText);

					 let location = "NA";
					 try{
					 	location = await experience.$eval('div.pv-entity__summary-info.pv-entity__summary-info--background-section.mb2 > h4 > span:nth-child(2)',el=>el.innerText);
					 }catch(err){
					 	//console.log(err)
					 }

					 console.log(company,position,timestarted,location);
				}

			}

			let educations = await page.$$('#education-section > ul > li');

			for(education of educations){
				let instName = await education.$eval('div.pv-entity__summary-info.pv-entity__summary-info--background-section > div > h3',el=>el.innerText);
				let degree = await education.$eval('div.pv-entity__summary-info.pv-entity__summary-info--background-section > div > p.pv-entity__secondary-title.pv-entity__degree-name > span.pv-entity__comma-item',el=>el.innerText);

				let degreeField = await education.$eval('div.pv-entity__summary-info.pv-entity__summary-info--background-section > div > p.pv-entity__secondary-title > span.pv-entity__comma-item',el=>el.innerText);

				let degreeDuration = "NA";
				try{
					degreeDuration = await education.$eval('div.pv-entity__summary-info.pv-entity__summary-info--background-section > p > span:nth-child(2)',el=>innerText);
				}catch(err){

				}

				console.log(instName,degree,degreeField,degreeDuration);
			}
*/
			await autoScroll(page);
			await page.waitForSelector('a[data-control-name=view_interest_details]');
			try{
				let see_more_group = await page.$('a[data-control-name=view_interest_details]');
			
				see_more_group.click();
				await page.waitFor(5000);

				let infos = await page.$$('#artdeco-modal-outlet nav > ul > li');
				console.log(infos.length);
				for(info of infos){
					let info_title = await info.$eval('a',el=>el.innerText);
					console.log(info_title);
					console.log('anchor',await info.$('a'));
					if(info_title == 'Influencers'){
						let influLink = await info.$('a');
						influLink.click();
						//await page.waitFor('3000');
					}
					console.log("here");
					if(info_title == "Groups"){
						let groupLink = await info.$('a');
						 groupLink.click();
						//await page.waitFor('3000');
					}
				}
				
			}catch(err){
				console.log('err',err);
			}

		}

		console.log(data);

		//await browser.close();

	}catch(err){
		console.log(err);
	}

})();