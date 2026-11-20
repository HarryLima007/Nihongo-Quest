/* Carrega o conteúdo (src/content*.js e kit.js, na ordem do manifesto) sem navegador. */
const fs = require('fs'), vm = require('vm'), path = require('path');
const dir = path.resolve(__dirname, '../src');
const files = JSON.parse(fs.readFileSync(path.join(dir, 'manifest.json'), 'utf8')).content;
const code = files.map(f => fs.readFileSync(path.join(dir, f), 'utf8')).join('\n').replace(/^const /gm, 'var ');
const C = {}; vm.createContext(C); vm.runInContext(code, C);
module.exports = C;
