
const fs = require('fs');

const JS_FILE = './public/assets/index-BKDzkSki.js';
let content = fs.readFileSync(JS_FILE, 'utf8');

const regex = /type:"email"/g;
let match;
while ((match = regex.exec(content)) !== null) {
  const start = Math.max(0, match.index - 500);
  const end = Math.min(content.length, match.index + 500);
  console.log(`Found type="email" at index ${match.index}`);
  console.log('Context:', content.slice(start, end));
  console.log('---');
}
