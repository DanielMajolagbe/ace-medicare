const fs = require('fs');
const content = fs.readFileSync('public/assets/index-BKDzkSki.js', 'utf8');

const matches = content.match(/.{0,150}username:.{0,150}password:.{0,150}/gi);
fs.writeFileSync('out.txt', matches ? matches.join('\n---\n') : 'Not found');
