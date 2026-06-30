
const fs = require('fs');
const readline = require('readline');

const filePath = './public/assets/index-BKDzkSki.js';

// Search for API calls related to login
const searchStrings = [
  '/api/login',
  'fetch',
  'axios',
  'POST',
  'email:',
  'password:'
];

const rl = readline.createInterface({
  input: fs.createReadStream(filePath),
  crlfDelay: Infinity
});

let lineNumber = 0;

rl.on('line', (line) => {
  lineNumber++;
  for (const str of searchStrings) {
    if (line.includes(str)) {
      console.log(`Found "${str}" at line ${lineNumber}`);
      console.log(`Line snippet: ${line.slice(Math.max(0, line.indexOf(str) - 100), line.indexOf(str) + 200)}`);
      console.log('---');
    }
  }
});

rl.on('close', () => {
  console.log('API call search complete!');
});
