const fs = require('fs');
const content = fs.readFileSync('api/index.js', 'utf8');

const startIndex = content.indexOf('var usersTable');
if (startIndex !== -1) {
  const snippet = content.slice(startIndex, startIndex + 500);
  fs.writeFileSync('out.txt', snippet);
} else {
  fs.writeFileSync('out.txt', 'Not found');
}
