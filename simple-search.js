
const fs = require('fs');
const file = './public/assets/index-BKDzkSki.js';
const content = fs.readFileSync(file, 'utf8');

// Search for the demo credentials
const terms = [
  'input-email',
  'input-username',
  'admin@',
  'password123',
  'Demo',
  'email:',
  'type:"email"',
  'Sign in',
  'Email Address',
  'Username',
  'you@acemedicare'
];

terms.forEach(term => {
  console.log(`=== Searching for "${term}" ===`);
  let index = 0;
  while ((index = content.indexOf(term, index)) !== -1) {
    console.log(`Found at index ${index}`);
    console.log('Context:', content.substring(index - 100, index + 100));
    index += term.length;
  }
});
