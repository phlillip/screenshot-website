/**
 * @desc saveArray(source, 'sitemap.xml');
 * */
const saveArray(array, filename) {
  // Convert the array to a JSON string
  let json = JSON.stringify(array);
  // Write the JSON string to a file
  fs.writeFile(filename, json, (err) => {
    if (err) throw err;
    console.log('Array saved to ' + filename);
  });
}

export default createdFile;