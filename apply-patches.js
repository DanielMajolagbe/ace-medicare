
const fs = require('fs');

const JS_FILE = './public/assets/index-BKDzkSki.js';
let content = fs.readFileSync(JS_FILE, 'utf8');
console.log('Loaded file, length:', content.length);

// Find and replace demo credentials
const oldStrings = [
  'admin@acemedicare.nhs.uk',
  'password123',
  'Demo Credentials',
  'Email Address'
];

oldStrings.forEach(str => {
  if (content.includes(str)) {
    console.log(`Found "${str}" in file`);
    if (str === 'Email Address') {
      content = content.replace(str, 'Username');
      console.log('Replaced Email Address with Username');
    } else if (str === 'admin@acemedicare.nhs.uk' || str === 'password123' || str === 'Demo Credentials') {
      content = content.replace(new RegExp(str, 'g'), '');
      console.log(`Removed "${str}"`);
    }
  }
});

// Find and replace the input type
const inputPattern = /type:"email",value:t,onChange:v=>r\(v\.target\.value\),required:!0,"data-testid":"input-email",placeholder:"you@acemedicare\.nhs\.uk"/g;
let match;
if ((match = inputPattern.exec(content)) !== null) {
  console.log('Found input element');
  content = content.replace(inputPattern, 'type:"text",value:t,onChange:v=>r(v.target.value),required:!0,"data-testid":"input-username",placeholder:"Enter your username"');
  console.log('Replaced input type and placeholder');
}

// Find and replace the API call that sends email
const apiPattern = /\{data:\{email:v,password:x\}\}/g;
if ((match = apiPattern.exec(content)) !== null) {
  console.log('Found API call with email');
  content = content.replace(apiPattern, '{data:{username:v,password:x}}');
  console.log('Replaced email with username in API call');
}

// Verify changes
console.log('\nVerifying changes:');
oldStrings.forEach(str => {
  console.log(`- "${str}" still present:`, content.includes(str));
});
console.log('- Input with type="email" present:', content.includes('type:"email"'));
console.log('- API call with email present:', content.includes('email:v'));
console.log('- Username input present:', content.includes('type:"text"'));
console.log('- API call with username present:', content.includes('username:v'));

// Write the file back
fs.writeFileSync(JS_FILE, content, 'utf8');
console.log('\nFile updated successfully!');
