
const fs = require('fs');
const acorn = require('acorn');

// Install acorn first if not present? Wait let's try to require it, if not, use try/catch
const JS_FILE = './public/assets/index-BKDzkSki.js';

try {
  const content = fs.readFileSync(JS_FILE, 'utf8');
  console.log('File length:', content.length);
  
  // Try to parse it with acorn
  try {
    const ast = acorn.parse(content, {
      ecmaVersion: 'latest',
      sourceType: 'module'
    });
    console.log('✅ File parsed successfully - no syntax errors!');
  } catch (err) {
    console.error('❌ Syntax error found!');
    console.error('Error message:', err.message);
    console.error('Error position: Line', err.loc.line, 'Column', err.loc.column);
    console.error('Code snippet (around line', err.loc.line, '):');
    const lines = content.split('\n');
    for (let i = Math.max(0, err.loc.line - 5); i < Math.min(lines.length, err.loc.line + 5); i++) {
      console.log(`${i + 1}: ${lines[i]}`);
    }
  }
} catch (err) {
  console.error('Could not read file:', err);
}
