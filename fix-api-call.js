
const fs = require('fs');

const filePath = './public/assets/index-BKDzkSki.js';
let content = fs.readFileSync(filePath, 'utf8');

// Replacements
content = content.replace(
  /\{data:\{email:v,password:x\}\}/gi, 
  '{data:{username:v,password:x}}'
);

// Also check if the API path is correct - our backend has /api/login, let's confirm
content = content.replace(
  /\/api\/auth\/login/gi, 
  '/api/login'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('API calls fixed!');
