/**
 * @desc Example usage: fetch a remote sitemap.xml file and extract the URLs
 */

// Allows use of `require` in ES Modules in Node >=14
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const https = require('https');

let extractURLs = function extractURLs(data) {
  // Create an empty array to store the URLs
  let urls = [];
  // Use a regular expression to match the <loc> tags
  let regex = /<loc>(.*?)<\/loc>/g;
  // Loop through the matches and push the URL to the array
  let match;
  while (match = regex.exec(data)) {
    urls.push(match[1]);
  }
  // Return the array of URLs
  //console.log(urls);
  //urls = JSON.stringify(urls);
  //console.log(urls);
  return urls;
}

export default extractURLs;