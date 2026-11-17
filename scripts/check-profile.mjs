import assert from 'node:assert/strict';
import { readFileSync, lstatSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve, sep } from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const readme = readFileSync(resolve(root, 'README.md'), 'utf8');
const checks = [];
function check(label, action) {
  action();
  checks.push(label);
}

check('Four product headings and canonical repository destinations', () => {
  for (const [name, repo] of [['Navio', 'Navio'], ['Mystery', 'Mystery'], ['Tune', 'Tune'], ['Rovelio', 'Rovelio']]) {
    assert.match(readme, new RegExp(`### <img[^>]+> ${name}`));
    assert.ok(readme.includes(`](https://github.com/dex-ovo-studio/${repo})`));
    assert.ok(readme.includes(`](https://github.com/dex-ovo-studio/${repo}/issues)`));
  }
  assert.doesNotMatch(readme, /dex-ovo-studio\/(?:DEX-TUNE|DEX-Rider)/);
});
check('Local anchors resolve', () => {
  for (const [, anchor] of readme.matchAll(/\]\(#([\w-]+)\)/g)) {
    assert.ok(readme.includes(`<a id="${anchor}"></a>`), anchor);
  }
});
check('Compact picture sources precede desktop sources', () => {
  const sources = [...readme.matchAll(/<source media="([^"]+)" srcset="([^"]+)"/g)];
  assert.equal(sources.length, 4);
  assert.equal(sources[0][1], '(max-width: 768px) and (prefers-color-scheme: dark)');
  assert.equal(sources[1][1], '(max-width: 768px)');
  assert.equal(sources[2][1], '(prefers-color-scheme: dark)');
  assert.equal(sources[3][1], '(prefers-color-scheme: light)');
  assert.match(readme, /alt="D\.E\.X Studio[^"\n]*" width="100%"/);
});
const assets = new Set([...readme.matchAll(/(?:src|srcset)="([^"]+)"/g)].map(m => m[1]));
for (const asset of assets) {
  check(`Local static SVG: ${asset}`, () => {
    assert.match(asset, /^assets\/[a-z0-9-]+\.svg$/);
    const path = resolve(root, asset);
    assert.ok(path.startsWith(resolve(root, 'assets') + sep));
    assert.ok(lstatSync(path).isFile() && !lstatSync(path).isSymbolicLink());
    const svg = readFileSync(path, 'utf8');
    assert.match(svg, /^<svg\s/);
    assert.match(svg, /<\/svg>\s*$/);
    assert.doesNotMatch(svg, /<(?:script|foreignObject|image|use|animate|set)\b|\bon\w+\s*=|\b(?:href|xlink:href)\s*=|<!|@import/i);
    for (const [, ref] of svg.matchAll(/url\(([^)]+)\)/g)) assert.match(ref, /^#[\w-]+$/);
    if (asset.includes('studio-header')) {
      assert.ok(svg.includes('D.E.X Studio'));
      for (const [, size] of svg.matchAll(/font-size="(\d+)"/g)) assert.ok(Number(size) >= 20);
    }
  });
}
check('Only official HTTPS link destinations', () => {
  for (const [, raw] of readme.matchAll(/\]\((https?:[^)]+)\)/g)) {
    const url = new URL(raw);
    assert.equal(url.protocol, 'https:');
    assert.ok((url.hostname === 'github.com' && url.pathname.startsWith('/dex-ovo-studio/')) || url.origin === 'https://mystery.mydex.top');
    assert.doesNotMatch(url.pathname, /\.(?:exe|zip)$/i);
  }
});
check('Public beta and unpublished products stay explicit', () => {
  assert.ok(readme.includes('Beta 7'));
  assert.ok(readme.includes('RC4, RC5 and 1.0 Stable are not published.'));
  assert.ok(readme.includes('No public installer'));
  assert.ok(readme.includes('No public image'));
  assert.ok(readme.includes('proxy-restoration advisory'));
});
check('Product-specific licensing and screenshot scope stay explicit', () => {
  assert.ok(readme.includes('Licenses, source availability and terms are specific to each repository'));
  assert.ok(readme.includes('not application screenshots'));
});
console.log(JSON.stringify({ status: 'PASS', mode: 'offline-static', count: checks.length, assets: assets.size, checks, limitations: ['Not a browser layout or theme test', 'Does not fetch links or certify releases, licenses or binaries'] }, null, 2));
