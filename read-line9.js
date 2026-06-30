
const fs = require('fs');

const filePath = './public/assets/index-BKDzkSki.js';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');
console.log('Line 9 content:', lines[8]); // arrays are 0-indexed!
