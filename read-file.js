
const fs = require('fs');
const file = './public/assets/index-BKDzkSki.js';
const content = fs.readFileSync(file, 'utf8');
console.log('File length:', content.length);
const search1 = content.indexOf('admin@acemedicare');
const search2 = content.indexOf('password123');
const search3 = content.indexOf('Demo');
const search4 = content.indexOf('email:');
const search5 = content.indexOf('type:"email"');
console.log('admin@acemedicare at index:', search1);
console.log('password123 at index:', search2);
console.log('Demo at index:', search3);
console.log('email: at index:', search4);
console.log('type:"email" at index:', search5);
if (search1 !== -1) {
  console.log('Context around admin@:', content.slice(search1-200, search1+200));
}
if (search4 !== -1) {
  console.log('Context around email::', content.slice(search4-200, search4+200));
}
if (search5 !== -1) {
  console.log('Context around type:"email":', content.slice(search5-200, search5+200));
}
