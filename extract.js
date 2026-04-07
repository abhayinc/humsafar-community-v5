const fs = require('fs');

let code = fs.readFileSync('./data/index.js', 'utf8');

const splitPoint = code.indexOf('export function generateOrganizationSchema');
if (splitPoint !== -1) {
    code = code.substring(0, splitPoint);
}

code = code.replace(/export\s+const\s+/g, 'const ');
code = "const fs = require('fs');\n" + code;

code += `
fs.writeFileSync('./data/data.json', JSON.stringify({ SITE, TOURS, BLOGS, BANNERS }, null, 2));
console.log("data.json created successfully");
`;

fs.writeFileSync('temp.js', code);
