
const fs = require('fs');

const JS_FILE = './public/assets/index-BKDzkSki.js';
let content = fs.readFileSync(JS_FILE, 'utf8');

// Find the API call - let's see what it's sending
// Let's search for any data object being sent in a fetch or axios call
console.log('Looking for data object in fetch calls...');

// Search for patterns like {data: {email: ..., password: ...}}
const patterns = [
  /\{data:\{email:([a-z]),password:([a-z])\}\}/gi,
  /email:([a-z]),password:([a-z])/gi,
  /type:"email"/gi
];

for (const pattern of patterns) {
  let match;
  while ((match = pattern.exec(content)) !== null) {
    console.log(`Found at index ${match.index}:`, match[0]);
    const start = Math.max(0, match.index - 200);
    const end = Math.min(content.length, match.index + 200);
    console.log('Context:', content.slice(start, end));
    console.log('---');
  }
}

// Now let's update the API call to send both email and username, and update the input
// Let's first find the input field
console.log('\nLooking for input fields...');
const inputRegex = /type:"email",([^}]+)/g;
let inputMatch;
while ((inputMatch = inputRegex.exec(content)) !== null) {
  console.log(`Input found at index ${inputMatch.index}:`);
  const start = Math.max(0, inputMatch.index - 100);
  const end = Math.min(content.length, inputMatch.index + 300);
  console.log(content.slice(start, end));
  console.log('---');
  // Replace type:"email" with type:"text"
  content = content.replace(inputMatch[0], `type:"text",${inputMatch[1]}`);
}

// Now let's find the API call and make it send {email: v, username: v, password: x}
const apiRegex = /\{data:\{([^}]+)email:([a-z]),([^}]+)password:([a-z])([^}]+)\}\}/gi;
let apiMatch;
while ((apiMatch = apiRegex.exec(content)) !== null) {
  console.log(`API call found at index ${apiMatch.index}:`);
  console.log(apiMatch[0]);
  console.log('---');
  content = content.replace(apiMatch[0], `{data:{email:${apiMatch[2]},username:${apiMatch[2]},password:${apiMatch[4]}${apiMatch[5]}}}`);
}

// Write it back
fs.writeFileSync(JS_FILE, content, 'utf8');
console.log('Fixed API call and input!');
