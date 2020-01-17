const puppeteer = require('puppeteer');

(async () => {
    try {
      	const browser = await puppeteer.launch({headless: true});
      	const page = await browser.newPage();
      	const url = "https://barcelonatechcity.com/en/companies/";
      	const response = await page.goto(url,{waitUntill: "domcontentloaded"});
      	const totalPages = await page.evaluate(() => document.querySelector("body > section.page-section.page-section--gray > div > div.blog-pagination > ul > li:nth-child(5) > a").text);
        let companies = [];
        let flag = 0;
        let currentPage = 1;
      	while (currentPage <= totalPages) {
      		await page.goto(url+'page/'+currentPage);
            await page.waitForSelector('div.container > article.company-summary');
            const sections = await page.$$('div.container > article.company-summary');

            for(let i=0; i<sections.length; i++){
                await page.goto(url+'page/'+currentPage);
                await page.waitForSelector('div.container > article.company-summary');
                const sections = await page.$$('div.container > article.company-summary');
                const button = await sections[i].$('a');
                button.click();

                await page.waitForSelector('article.company-info');
                let name = ''; 
                let logo_url = ''; 
                let founded_year = '';
                let employees_count = '';
                let type = ''; 
                let city = ''; 
                let full_address = ''; 
                let overview = ''; 
                let website_url=''; 
                let categories = []; 
                let management_people = []; 
                let facebook_url = ''; 
                let instagram_url = ''; 
                let linkedin_url = ''; 
                let youtube_url = '';
                // Company Name
                if(await page.$('h1.company__name') !== null){
                    name = await page.$eval('h1.company__name', h1 => h1.innerText);
                }
                // Company Logo
                if(await page.$('img.company__logo') !== null){
                    logo_url = await page.$eval('img.company__logo', img => img.src);
                }
                // Full Address
                if(await page.$('div.company-map__address') !== null){
                    const element = await page.$('div.company-map__address');
                    full_address = await(await element.getProperty('textContent')).jsonValue();
                }
                // Section for categories
                const categoryItems = await page.$$('ul.company__categories>li');
                for(let categoryItem=0; categoryItem<categoryItems.length; categoryItem++){
                    categories[categoryItem] = await categoryItems[categoryItem].$eval('a', cat => cat.innerText);
                }
                // Founded Year, Type, City
                const content = await page.$$('div.company-section--flex');
                let element = await content[1];
                const companyIndicator = await element.$$('div.company-indicator');

                for(let j=0; j<companyIndicator.length; j++){
                    const element = await companyIndicator[j];
                    const titleElement = await element.$('div.company-section__title');
                    const elementValue = await element.$('div.company-indicator__content');
                    let title = await (await titleElement.getProperty('textContent')).jsonValue();
                    let value = await (await elementValue.getProperty('textContent')).jsonValue();
                    if(title.trim() == "Founded"){
                        founded_year = value.trim();
                    } else if(title.trim() == "Employees"){
                        employees_count = value.trim();
                    } else if(title.trim() == "Type"){
                        type = value.trim();
                    } else if(title.trim() == "City"){
                        city = value.trim();
                    }
                }
                // Overview Section
                const companySections = await page.$$('div.company-section');
                for(let companySection=0; companySection<companySections.length; companySection++){
                    if(await companySections[companySection].$('h2.company-section__title')){
                        const overviewElement = await companySections[companySection].$('h2.company-section__title');
                        let heading = await (await overviewElement.getProperty('textContent')).jsonValue();
                        if(heading.trim() == "Overview"){
                            const overviewElement = await companySections[companySection];
                            overview = await (await overviewElement.getProperty('textContent')).jsonValue();
                            overview = overview.replace('Overview\n',"");
                            overview = overview.replace(/(\r\n|\n|\r)/gm, "").trim();
                        }
                    }
                }
                // Management Team Section
                if(await page.$('ul.company-management') !== null){
                    const managementPeople = await page.$$('ul.company-management>li');
                    for(let people=0; people<managementPeople.length; people++ ){
                        const managementElement = managementPeople[people];
                        let team = await (await managementElement.getProperty('textContent')).jsonValue();
                        team = team.replace(/(\r\n|\n|\r)/gm, "");
                        management_people[people] = team.trim();
                    }
                }
                // Company website url
                if(await page.$('a.company-website') !== null){
                    website_url = await page.$eval('a.company-website', url => url.href);
                }
                // Social Media Links
                if(await page.$('ul.company-social') !== null){
                    const socialLinks = await page.$$('ul.company-social>li');
                    for(let links=0; links<socialLinks.length; links++ ){
                        const icon = await socialLinks[links].$('a>i');
                        const socialUrl = await socialLinks[links].$('a');
                        const url = await (await socialUrl.getProperty('href')).jsonValue();
                        const iconClass = await (await icon.getProperty('className')).jsonValue();
                        if(iconClass.trim() == "fa fa-linkedin"){
                            linkedin_url = url;
                        }else if(iconClass.trim() == "fa fa-instagram"){
                            instagram_url = url;
                        }else if(iconClass.trim() == "fa fa-facebook"){
                            facebook_url = url;
                        } else if(iconClass.trim() == "fa fa-youtube-play"){
                            youtube_url = url;
                        }

                    }
                }
                companies[flag] = {
                    name: name,
                    logo_url: logo_url,
                    founded_year: founded_year,
                    employees_count: employees_count,
                    type:type,
                    categories: categories,
                    city:city,
                    full_address:full_address,
                    overview: overview,
                    management_people: management_people,
                    website_url: website_url,
                    facebook_url: facebook_url,
                    instagram_url: instagram_url,
                    linkedin_url: linkedin_url,
                    youtube_url: youtube_url
                };
                flag++;
            }
            
      		currentPage++;
      	}
        console.log(companies.length);
        let result = JSON.stringify(companies) ;
        console.log(result);
        return result;
        await browser.close();
    } catch(e) {
         console.log(e);
    }
    
})();