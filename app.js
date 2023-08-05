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

function runScript (url,limit){

// REMOTE:
https.get(url, (res) => {
  if(res.statusCode === 200) {
        console.log('Page exists!');
        let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    let urls = extractURLs(data);
    getPics(urls,limit);
  });
    } else {
      console.log("Sitemap doesn't exist at https://www." + domain + "/sitemap.xml");
      console.log("Add the real sitemap URL to the end of your domain and try again.");
      process.exit();
    }
});

// LOCAL:
/*fs.readFile('sitemap.xml', 'utf8', (err, data) => {
  if (err) throw err;

  let urls = extractURLs(data);

  getPic(urls);

  //console.log(urls);
});*/

}

let domain = process.argv[2];
let limit = process.argv[3];
let sitemapURL;
if(domain){
  if(domain.includes("/")){
    sitemapURL = "https://www." + domain;
  } else {
    sitemapURL = "https://www." + domain + "/sitemap.xml";
  }
  console.log("sitemapURL", sitemapURL);
runScript(sitemapURL,limit);
} else {
  console.log("No domain provided...");
  exit;
}

