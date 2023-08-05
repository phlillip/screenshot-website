// Allows use of `require` in ES Modules in Node >=14
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const puppeteer = require('puppeteer');

const getSiteMap = async function getSiteMap(url){
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  let source = await page.content();
  //let source = await page.content({"waitUntil": "domcontentloaded"});

  browser.close();
}

export default getSiteMap;