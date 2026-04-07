const fs = require('fs');
let code = fs.readFileSync('./data/index.js', 'utf8');
const splitPoint = code.indexOf('export function generateOrganizationSchema');
const schemaFns = code.substring(splitPoint);
const newCode = `// ============================================================
// data/index.js — All tours, blogs, banners + SEO data
// Humsafar Community v5.0
// ============================================================

import data from './data.json';

export const SITE = data.SITE;
export const TOURS = data.TOURS;
export const BLOGS = data.BLOGS;
export const BANNERS = data.BANNERS;

` + schemaFns;
fs.writeFileSync('./data/index.js', newCode);
console.log("Rewrote data/index.js successfully");
