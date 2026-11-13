import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';
import vm from 'node:vm';
import test from 'node:test';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = name => readFileSync(resolve(root, name), 'utf8');
const script = read('script.js');
const context = vm.createContext({ document: { addEventListener() {} } });
vm.runInContext(script, context);
const studies = vm.runInContext('PROJECT_CASE_STUDIES', context);
const canonical = 'marketplace-category-intelligence';
const anchors = ['proj-scraper-engine', 'proj-vector-taxonomy', 'proj-text-image-insights', 'proj-common-api'];

for (const page of ['index.html', 'projects.html']) {
  const html = read(page);
  const cards = [...html.matchAll(/<article\b[^>]*class="project-card[^>]*>[\s\S]*?<\/article>/g)].map(m => m[0]);
  test(`${page}: 11 unique projects, 6 featured, correct discipline counts`, () => {
    assert.equal(cards.length, 11);
    assert.equal(cards.filter(c => c.includes('data-featured="true"')).length, 6);
    const keys = cards.map(c => c.match(/data-project="([^"]+)"/)[1]);
    assert.deepEqual(keys.slice(0, 2), ['rca-engine', canonical]);
    assert.equal(new Set(keys).size, 11);
    keys.forEach(key => assert.ok(studies[key], key));
    for (const [category, expected] of [['ai', 7], ['security', 8], ['overlap', 4]]) {
      assert.equal(cards.filter(c => c.includes(`data-category="${category}"`) || (category !== 'overlap' && c.includes('data-category="overlap"'))).length, expected);
    }
  });
  test(`${page}: legacy anchors occur once inside the single merged card`, () => {
    const combined = cards.filter(c => c.includes(`data-project="${canonical}"`));
    assert.equal(combined.length, 1);
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
    assert.equal(ids.length, new Set(ids).size, 'duplicate HTML ids');
    for (const id of anchors) {
      assert.ok(combined[0].includes(`id="${id}"`), id);
      assert.equal(ids.filter(value => value === id).length, 1);
    }
    assert.ok(!/All Projects \(14\)|14-project|of 14 Systems|4 systems/.test(html));
    assert.ok(html.includes('caseStudyDiagram') && html.includes('caseStudyDetails'));
  });
  test(`${page}: local asset and HTML fragment links resolve`, () => {
    for (const [, url] of html.matchAll(/(?:href|src)="([^"<>]+)"/g)) {
      if (/^(https?:|mailto:|tel:|data:)/.test(url) || url === '#' || !url) continue;
      const [path, fragment] = url.split('#');
      const target = path ? path.split('?')[0] : page;
      assert.ok(existsSync(resolve(root, target)), `${page}: ${url}`);
      if (fragment && target.endsWith('.html')) {
        assert.ok(read(target).includes(`id="${fragment}"`), `${page}: ${url}`);
      }
    }
  });
}

test('one canonical case study with legacy JavaScript and URL aliases', () => {
  assert.equal(Object.keys(studies).length, 11);
  for (const key of ['scraping-engine', 'category-mapper', 'text-image-insights', 'chatbot-rag', ...anchors, `proj-${canonical}`]) {
    assert.equal(vm.runInContext(`resolveProjectId(${JSON.stringify(key)})`, context), canonical);
    assert.equal(studies[key], undefined);
  }
});

test('diagrams, monthly storage, ownership and RCA evidence boundaries are explicit', () => {
  assert.equal(studies[canonical].diagram.lanes.length, 2);
  assert.match(studies[canonical].diagram.bridge, /text_insights_<mm-yyyy>/);
  assert.match(studies[canonical].diagram.bridge, /image_insights_<mm-yyyy>/);
  assert.ok(studies[canonical].sections.some(s => s.title.includes('Ownership')));
  assert.ok(studies[canonical].sections.some(s => s.title.includes('Tradeoffs')));
  assert.match(studies['rca-engine'].summary, /30-diagnostic/);
  assert.match(studies['rca-engine'].summary, /read-only access to PostgreSQL tables/);
  assert.ok(!/read-only Python/i.test(JSON.stringify(studies['rca-engine'])));
  assert.match(studies['rca-engine'].diagram.caption, /no unrestricted SQL/);
  assert.match(studies['rca-engine'].findings.join(' '), /not the total end-to-end AI answer latency/);
  for (const data of Object.values(studies)) {
    for (const shot of data.screenshots || []) {
      if (!shot.isPlaceholder) assert.ok(existsSync(resolve(root, shot.src)), shot.src);
    }
    if (data.diagram) assert.ok(existsSync(resolve(root, data.diagram.source)));
  }
});
