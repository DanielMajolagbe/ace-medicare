
const fs = require('fs');

const filePath = './public/assets/index-BKDzkSki.js';
let content = fs.readFileSync(filePath, 'utf8');

// Replace the input type and placeholder
content = content.replace(
  /type:"email",value:t,onChange:v=>r\(v\.target\.value\),required:!0,"data-testid":"input-email",placeholder:"you@acemedicare\.nhs\.uk"/gi, 
  'type:"text",value:t,onChange:v=>r(v.target.value),required:!0,"data-testid":"input-username",placeholder:"Enter your username"'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Input fixed!');
