import waitTillHTMLRendered from "./waitForHTML.mjs";

// Allows use of `require` in ES Modules in Node >=14
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require('fs');
const puppeteer = require('puppeteer');

let getPics =  async function getPic(urls,limit) {
  const browser = await puppeteer.launch({headless: "new"});
  const page = await browser.newPage();

  let number,
  plural = "screenshot";
  if(limit){
    number = limit;
    if(limit > 1){
      plural = "screenshots";
    }
  } else {
    number = "all";
    plural = "screenshots";
  }

  console.log("Generating " + number + " " + plural + "...");

  let x = 1;
  for (const url of urls){
      let imageFileName = url.split("https://www.")[1];
      imageFileName = imageFileName.replaceAll("/","_") + ".png";
      let folderName = imageFileName.split("/")[0].split(".")[0];
      folderName = "_" + folderName;

      let path = folderName + "/" + imageFileName;

      console.log(x + ": " + url + ": " + imageFileName );

      var dir = folderName;
      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
      }
      
      await page.goto(url);
      await waitTillHTMLRendered(page);

      //Remove cookie banner
      let div_selector_to_remove= "#CybotCookiebotDialog";
      await page.evaluate((sel) => {
        var elements = document.querySelectorAll(sel);
        for(var i=0; i< elements.length; i++){
          elements[i].parentNode.removeChild(elements[i]);
        }
      }, div_selector_to_remove)

      await page.setViewport({width: 1920, height: 1080})
      await page.screenshot({path: path});

      x++;

    if(limit && (x > limit)){
      break;
    }
}

  await browser.close();
}

export default getPics;