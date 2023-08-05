/**
 * @desc Screenshot all pages on a website
 */

//import getSiteMap from "./getSiteMap.mjs";
import getPics from "./getPics.mjs";
import extractURLs from "./extractURLs.mjs";

// Allows use of `require` in ES Modules in Node >=14
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const https = require('https');

function runScript (url){

// REMOTE:
https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    let urls = extractURLs(data);
    getPics(urls);
  });
});

// LOCAL:
/*fs.readFile('sitemap.xml', 'utf8', (err, data) => {
  if (err) throw err;

  let urls = extractURLs(data);

  getPic(urls);

  //console.log(urls);
});*/

}

runScript("https://www.aura.life/sitemap.xml");