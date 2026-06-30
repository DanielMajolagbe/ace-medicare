
const fs = require('fs');

const filePath = './public/assets/index-BKDzkSki.js';
let content = fs.readFileSync(filePath, 'utf8');

// List of replacements
const replacements = [
  // Replace "Email Address" label with "Username"
  [/Email Address/gi, 'Username'],
  // Replace error message
  [/Invalid email address or password/gi, 'Invalid username or password'],
  // Remove demo credentials entirely
  [/admin@acemedicare\.nhs\.uk/gi, ''],
  [/password123/gi, ''],
  [/Demo Credentials/gi, ''],
  [/DEMO CREDENTIALS/gi, ''],
  [/Credentials/gi, ''],
  // Also make sure any pre-filled value is removed
];

// Apply all replacements
for (const [pattern, replacement] of replacements) {
  content = content.replace(pattern, replacement);
}

// Write the patched content back
fs.writeFileSync(filePath, content, 'utf8');
console.log('Frontend patched successfully!');
