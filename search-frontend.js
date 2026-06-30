
const fs = require('fs');
const readline = require('readline');

// Path to the frontend JS file
const filePath = './public/assets/index-BKDzkSki.js';

// Strings to search for
const searchStrings = [
  'admin@acemedicare',
  'password123',
  'demo',
  'Demo',
  'DEMO',
  'credentials',
  'Credentials',
  'CREDENTIALS',
  'Sign in to your account',
  'Authorised personnel only',
  'Invalid email address or password'
];

// Create a readline interface
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
      console.log(`Line content (truncated): ${line.slice(0, 200)}`);
      console.log('---');
    }
  }
});

rl.on('close', () => {
  console.log('Search complete!');
});
