import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { pages, origin } from './seo.mjs';
const config = JSON.parse(readFileSync('vercel.json','utf8'));
const sitemap = readFileSync('dist/sitemap.xml','utf8');
assert.equal(Object.keys(pages).filter(path => path.startsWith('/services/')).length, 6);
for (const [path,[title]] of Object.entries(pages)) {
  const html = readFileSync(path === '/' ? 'dist/index.html' : `dist${path}.html`, 'utf8');
  assert.equal((html.match(/<title>/g) ?? []).length,1,path);
  assert.equal((html.match(/name="description"/g) ?? []).length,1,path);
  assert.equal((html.match(/rel="canonical"/g) ?? []).length,1,path);
  assert.ok(html.includes(`href="${origin}${path}"`),path);
  assert.ok(!/noindex|name="keywords"|UXORA \| UXORA/.test(html),path);
  assert.ok(sitemap.includes(`<loc>${origin}${path}</loc>`),path);
  assert.ok(title.endsWith('| UXORA') || path === '/',path);
  if (path !== '/') assert.ok(config.rewrites.some(rule=>rule.source===path && rule.destination===`${path}.html`),path);
}
for (const name of ['favicon.svg','favicon.ico','favicon-96x96.png','apple-touch-icon.png','uxora-social.png','robots.txt']) assert.ok(existsSync(`dist/${name}`),name);
const ico=readFileSync('dist/favicon.ico');
assert.equal(ico.readUInt16LE(2),1);assert.equal(ico.readUInt16LE(4),3);
assert.deepEqual([0,1,2].map(i=>ico[6+i*16]),[16,32,48]);
for (const [name,size] of [['favicon-96x96.png',96],['apple-touch-icon.png',180]]) {
  const png=readFileSync(`dist/${name}`);assert.equal(png.readUInt32BE(16),size);assert.equal(png.readUInt32BE(20),size);
}
console.log(`SEO checks passed: ${Object.keys(pages).length} page heads, canonical sitemap, matching Vercel routes, icon files and dimensions.`);
