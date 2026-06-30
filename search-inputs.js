
const fs = require('fs');
const readline = require('readline');

const filePath = './public/assets/index-BKDzkSki.js';

// Search for form inputs
const searchStrings = [
  'type:"email"',
  'name:"email"',
  'id:"email"',
  'placeholder:"email"',
  'type:"password"',
  'name:"password"',
  'input'
];

const rl = readline.createInterface({
  input: fs.createReadStream(filePath),
  crlfDelay: Infinity
});

let lineNumber = 0;

rl.on('line', (line) => {
  lineNumber++;
  for (const str of searchStrings) {
    if (line.toLowerCase().includes(str.toLowerCase())) {
      console.log(`Found "${str}" at line ${lineNumber}`);
      // Find the surrounding context
      const idx = line.toLowerCase().indexOf(str.toLowerCase());
      console.log(`Context: ${line.slice(Math.max(0, idx - 200), idx + 300)}`);
      console.log('---');
    }
  }
});

rl.on('close', () => {
  console.log('Input search complete!');
});
