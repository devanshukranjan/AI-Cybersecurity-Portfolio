// Run against a local static server and a dedicated Chrome debugging session.
// BASE_URL defaults to http://127.0.0.1:8000; CDP_URL defaults to http://127.0.0.1:9223.
import assert from 'node:assert/strict';
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const base = process.env.BASE_URL || 'http://127.0.0.1:8000';
const endpoint = process.env.CDP_URL || 'http://127.0.0.1:9223';
const pages = await (await fetch(`${endpoint}/json/list`)).json();
const page = pages.find(p => p.type === 'page');
assert.ok(page, 'Start a dedicated Chrome debugging session first');
const socket = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject; });
let nextId = 0;
const pending = new Map();
const errors = [];
socket.onmessage = event => {
  const data = JSON.parse(event.data);
  if (data.method === 'Runtime.exceptionThrown') errors.push(data.params.exceptionDetails);
  if (!data.id) return;
  const entry = pending.get(data.id);
  if (!entry) return;
  clearTimeout(entry.timer);
  pending.delete(data.id);
  if (data.error) entry.reject(new Error(JSON.stringify(data.error)));
  else entry.resolve(data.result);
};
function call(method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = ++nextId;
    const timer = setTimeout(() => { pending.delete(id); reject(new Error(`CDP timeout: ${method}`)); }, 15000);
    pending.set(id, { resolve, reject, timer });
    socket.send(JSON.stringify({ id, method, params }));
  });
}
async function evaluate(expression) {
  const result = await call('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
  return result.result.value;
}
async function navigate(path, server = base) {
  await call('Page.navigate', { url: `${server}/${path}` });
  for (let attempt = 0; attempt < 150; attempt++) {
    if (await evaluate(`document.readyState !== 'loading' && typeof window.openProjectCaseStudy === 'function'`)) return;
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  throw new Error(`Page not ready: ${path}`);
}
async function press(key, modifiers = 0) {
  const keyCode = { Enter: 13, Escape: 27, Tab: 9 }[key];
  const params = { key, code: key, modifiers, windowsVirtualKeyCode: keyCode, nativeVirtualKeyCode: keyCode };
  await call('Input.dispatchKeyEvent', { type: 'keyDown', ...params, ...(key === 'Enter' ? { text: '\r' } : {}) });
  await call('Input.dispatchKeyEvent', { type: 'keyUp', ...params });
}
const canonical = 'marketplace-category-intelligence';
const visible = () => evaluate(`[...document.querySelectorAll('.project-card')].filter(c => getComputedStyle(c).display !== 'none').length`);
const modalOpen = () => evaluate(`document.getElementById('projectCaseStudyModal').classList.contains('open')`);

try {
  await call('Page.enable');
  await call('Runtime.enable');
  await call('Network.enable');
  // QA remains deterministic without downloading font/icon CDNs.
  await call('Network.setBlockedURLs', { urls: ['https://fonts.googleapis.com/*', 'https://fonts.gstatic.com/*', 'https://cdnjs.cloudflare.com/*'] });
  await call('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
  for (const file of ['index.html', 'projects.html']) {
    await navigate(file);
    assert.equal(await visible(), file === 'index.html' ? 4 : 11);
    if (file === 'index.html') {
      const highlights = await evaluate(`[...document.querySelectorAll('#homepageCardsGrid .project-card')].filter(c => getComputedStyle(c).display !== 'none').map(c => c.dataset.project)`);
      assert.equal(highlights[0], 'rca-engine', 'RCA is the first highlighted project');
      assert.equal(highlights[1], canonical, 'Marketplace platform is the second highlighted project');
    }
    for (const [mode, count] of (file === 'index.html' ? [] : [['ai', 7], ['security', 8], ['overlap', 4], ['all', 11]])) {
      const selector = file === 'index.html' ? `.mode-tab[data-mode="${mode}"]` : `.filter-section-tab[data-section="${mode}"]`;
      // Homepage has no All mode tab; archive exercises the all-project state.
      if (mode === 'all' && file === 'index.html') continue;
      await evaluate(`document.querySelector(${JSON.stringify(selector)}).click()`);
      assert.equal(await visible(), count, `${file} ${mode}`);
    }
    for (const key of ['scraping-engine', 'category-mapper', 'text-image-insights', 'chatbot-rag', canonical]) {
      await evaluate(`window.openProjectCaseStudy(${JSON.stringify(key)})`);
      assert.equal(await evaluate(`document.getElementById('caseStudyTitle').textContent`), 'Multimodal Marketplace Category Intelligence Platform');
      assert.equal(await evaluate(`document.querySelectorAll('#caseStudyDiagram .case-architecture-lane').length`), 2);
      assert.equal(await evaluate(`document.querySelectorAll('#caseStudyGallery .case-study-thumb-card').length`), 3);
      await press('Escape');
      assert.equal(await modalOpen(), false);
    }
    for (const anchor of ['proj-scraper-engine', 'proj-vector-taxonomy', 'proj-text-image-insights', 'proj-common-api', `proj-${canonical}`]) {
      const filter = file === 'projects.html' ? '?section=security&tags=DFIR' : '';
      await navigate(`${file}${filter}#${anchor}`);
      assert.equal(await evaluate(`getComputedStyle(document.getElementById('proj-${canonical}')).display`), 'flex', `${file}#${anchor}`);
      assert.equal(await evaluate('location.hash'), `#${anchor}`);
    }
    await navigate(`${file}#scraping-engine`);
    assert.equal(await modalOpen(), true);
    await press('Escape');
    await evaluate(`document.querySelector('[data-project="${canonical}"] .inspect-spec-btn').focus()`);
    await press('Enter');
    assert.equal(await modalOpen(), true, JSON.stringify(await evaluate(`({focus:document.activeElement.outerHTML, card:getComputedStyle(document.getElementById('proj-${canonical}')).display,hash:location.hash})`)));
    await press('Tab', 8); // Shift+Tab from Close wraps to the last dialog control.
    assert.equal(await evaluate(`document.getElementById('projectCaseStudyModal').contains(document.activeElement)`), true);
    await evaluate(`document.querySelector('.pipeline-step-node').focus()`);
    await press('Enter');
    assert.equal(await evaluate(`document.querySelector('.pipeline-step-node').classList.contains('active')`), true);
    await evaluate(`document.querySelector('.case-study-thumb-card').focus()`);
    await press('Enter');
    assert.equal(await evaluate(`document.getElementById('imageLightboxModal').classList.contains('open')`), true);
    await evaluate(`new Promise((resolve, reject) => { const img = document.getElementById('lightboxImg'); if (img.complete && img.naturalWidth) resolve(); else { img.addEventListener('load', resolve, {once:true}); img.addEventListener('error', () => reject(new Error('Screenshot did not load')), {once:true}); } })`);
    await evaluate(`document.getElementById('lightboxZoomInBtn').click()`);
    assert.equal(await evaluate(`document.getElementById('lightboxZoomLevel').textContent`), '150%');
    await press('Escape');
    assert.equal(await modalOpen(), true, 'Closing the image leaves the case study open');
    assert.equal(await evaluate(`document.activeElement.classList.contains('case-study-thumb-card')`), true);
    await press('Escape');
    assert.equal(await modalOpen(), false);
    assert.equal(await evaluate(`document.activeElement.classList.contains('inspect-spec-btn')`), true);
    for (const width of [390, 768, 1440]) {
      await call('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: width < 600 });
      for (const key of [canonical, 'rca-engine']) {
        await evaluate(`window.openProjectCaseStudy(${JSON.stringify(key)})`);
        const overflow = await evaluate(`(() => { const el = document.getElementById('caseStudyDiagram'); return el.scrollWidth - el.clientWidth; })()`);
        assert.ok(overflow <= 1, `${file}: diagram overflow at ${width}px: ${overflow}`);
        assert.ok(await evaluate('document.documentElement.scrollWidth <= innerWidth + 1'), `${file}: page overflow at ${width}px`);
        await press('Escape');
      }
    }
    console.log(`PASS ${file}: filters, legacy links, modals, keyboard, gallery, responsive diagrams`);
  }
  await navigate('projects.html?section=ai&tags=Distributed%20Systems');
  assert.equal(await visible(), 1);
  assert.ok((await evaluate('location.search')).includes('Distributed'));
  await evaluate(`document.querySelector('[data-tag="LangGraph"]').click()`);
  assert.equal(await visible(), 3, 'OR tag filtering');
  await evaluate(`document.getElementById('clearFiltersBtn').click()`);
  assert.equal(await visible(), 11);
  for (const query of ['zyte', 'taxonomy', 'category mapper', 'gemini', 'langgrpah']) {
    await navigate('projects.html?q=' + encodeURIComponent(query));
    const expected = query === 'langgrpah' ? 'rca-engine' : canonical;
    assert.equal(await evaluate(`getComputedStyle(document.querySelector('[data-project="${expected}"]')).display`), 'flex', 'Intelligent search: ' + query);
    assert.ok((await evaluate('location.search')).includes('q='));
  }
  console.log('PASS latest intelligent search, including legacy component terms and typo matching');
  if (process.env.DESIGN_BASELINE_URL) {
    for (const file of ['index.html', 'projects.html']) {
      for (const width of [390, 768, 1440]) {
        await call('Emulation.setDeviceMetricsOverride', {width,height:900,deviceScaleFactor:1,mobile:width<600});
        const snapshots = [];
        for (const server of [process.env.DESIGN_BASELINE_URL, base]) {
          await navigate(file, server);
          snapshots.push(await evaluate(`(() => {
            const selectors = ['.site-header','.nav-container','.hero-grid','.hero-impact-card','.selected-work-layout','.selected-work-intro','.selected-work-stream','.projects-explorer-layout','.projects-filter-wrapper','.projects-results-area','#archiveCardsGrid'];
            return Object.fromEntries(selectors.map(selector => {
              const el = document.querySelector(selector);
              if (!el) return [selector,null];
              const s=getComputedStyle(el);
              return [selector,{display:s.display,position:s.position,columns:s.gridTemplateColumns,top:s.top,gap:s.gap,padding:s.padding,background:s.backgroundColor}];
            }));
          })()`));
        }
        assert.deepEqual(snapshots[1], snapshots[0], `${file}: preserve GitHub layout at ${width}px`);
      }
    }
    console.log('PASS layout comparison with latest GitHub: header, hero, sticky showcase and explorer at 390/768/1440px');
  }
  await call('Emulation.setDeviceMetricsOverride', {width:1440,height:1000,deviceScaleFactor:1,mobile:false});
  for (const file of ['index.html', 'projects.html']) {
    await navigate(file);
    for (const theme of ['light','dark']) {
      await evaluate(`if (document.documentElement.dataset.theme !== '${theme}') document.getElementById('themeToggle').click()`);
      assert.equal(await evaluate('document.documentElement.dataset.theme'), theme);
      if (process.env.PREVIEW_DIR) {
        mkdirSync(process.env.PREVIEW_DIR,{recursive:true});
        await evaluate('new Promise(resolve => setTimeout(resolve, 300))');
        const shot=await call('Page.captureScreenshot',{format:'png'});
        writeFileSync(join(process.env.PREVIEW_DIR,`${file}-${theme}.png`),Buffer.from(shot.data,'base64'));
        if (file==='index.html') {
          await evaluate(`document.getElementById('proj-${canonical}').scrollIntoView({behavior:'instant',block:'center'})`);
          const selected=await call('Page.captureScreenshot',{format:'png'});
          writeFileSync(join(process.env.PREVIEW_DIR,`selected-work-${theme}.png`),Buffer.from(selected.data,'base64'));
        }
      }
      await evaluate(`window.openProjectCaseStudy('${canonical}')`);
      assert.equal(await evaluate(`document.querySelectorAll('.telemetry-hud-grid .hud-stat-card').length`),4);
      assert.equal(await evaluate(`document.getElementById('hudStat4Value').textContent`),'9 Markets');
      assert.equal(await evaluate(`getComputedStyle(document.querySelector('.cybersoc-top-strip')).display`),'flex');
      if (process.env.PREVIEW_DIR) {
        await evaluate(`document.getElementById('caseStudyTopologySection').scrollIntoView({behavior:'instant',block:'start'})`);
        await evaluate('new Promise(resolve => setTimeout(resolve, 300))');
        const shot=await call('Page.captureScreenshot',{format:'png'});
        writeFileSync(join(process.env.PREVIEW_DIR,`${file}-modal-${theme}.png`),Buffer.from(shot.data,'base64'));
      }
      await press('Escape');
    }
  }
  console.log('PASS latest light/dark themes, metric HUD, dossier and case-study shell');
  await navigate('projects.html');
  await call('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await evaluate(`document.getElementById('mobileFilterToggle').click()`);
  assert.equal(await evaluate(`document.getElementById('mobileFilterToggle').getAttribute('aria-expanded')`), 'true');
  await navigate('index.html');
  for (const width of [390, 768, 1024, 1440]) {
    await call('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: width < 600 });
    const layout = await evaluate(`(() => {
      const track = document.querySelector('.exp-promotion-track');
      const [first, last] = [...track.querySelectorAll('.track-step')].map(el => el.getBoundingClientRect());
      return {direction:getComputedStyle(track).flexDirection, first:{x:first.x,y:first.y,right:first.right},last:{x:last.x,y:last.y},overflow:track.scrollWidth-track.clientWidth};
    })()`);
    assert.ok(layout.overflow <= 1, 'Timeline fits its container at ' + width);
    if (width > 960) {
      assert.equal(layout.direction, 'row');
      assert.ok(Math.abs(layout.first.y-layout.last.y) < 2 && layout.last.x > layout.first.right, 'Career milestones run left to right at ' + width);
      if (width === 1440 && process.env.TIMELINE_SCREENSHOT_PATH) {
        const clip = await evaluate(`(() => {
          const el = document.querySelector('.exp-promotion-track');
          el.scrollIntoView({behavior:'instant',block:'center'});
          const rect = el.getBoundingClientRect();
          return {x:rect.x+scrollX,y:rect.y+scrollY,width:rect.width,height:rect.height,scale:1};
        })()`);
        const capture = await call('Page.captureScreenshot', {format:'png', clip, captureBeyondViewport:true});
        writeFileSync(process.env.TIMELINE_SCREENSHOT_PATH, Buffer.from(capture.data,'base64'));
      }
      if (width === 1440 && process.env.TIMELINE_SCREENSHOT_PATH) {
        const clip = await evaluate(`(() => {
          const el = document.querySelector('.exp-promotion-track');
          el.scrollIntoView({behavior:'instant',block:'center'});
          const rect = el.getBoundingClientRect();
          return {x:rect.x+scrollX,y:rect.y+scrollY,width:rect.width,height:rect.height,scale:1};
        })()`);
        const capture = await call('Page.captureScreenshot', {format:'png', clip, captureBeyondViewport:true});
        writeFileSync(process.env.TIMELINE_SCREENSHOT_PATH, Buffer.from(capture.data,'base64'));
      }
      if (width === 1440 && process.env.TIMELINE_SCREENSHOT_PATH) {
        const clip = await evaluate(`(() => {
          const el = document.querySelector('.exp-promotion-track');
          el.scrollIntoView({behavior:'instant',block:'center'});
          const rect = el.getBoundingClientRect();
          return {x:rect.x+scrollX,y:rect.y+scrollY,width:rect.width,height:rect.height,scale:1};
        })()`);
        const capture = await call('Page.captureScreenshot', {format:'png', clip, captureBeyondViewport:true});
        writeFileSync(process.env.TIMELINE_SCREENSHOT_PATH, Buffer.from(capture.data,'base64'));
      }
    } else {
      assert.equal(layout.direction, 'column');
      assert.ok(layout.last.y > layout.first.y, 'Career milestones stack at ' + width);
    }
  }
  console.log('PASS career timeline: horizontal at 1024/1440px; stacked at 390/768px');
  await call('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await evaluate(`document.querySelector('.mobile-nav-toggle').click()`);
  assert.equal(await evaluate(`document.querySelector('.mobile-nav-toggle').getAttribute('aria-expanded')`), 'true');
  await evaluate(`window.openProjectCaseStudy('${canonical}')`);
  if (process.env.SCREENSHOT_PATH) {
    await evaluate(`document.getElementById('caseStudyDiagramSection').scrollIntoView({block:'start'})`);
    await evaluate('new Promise(resolve => setTimeout(resolve, 300))');
    const capture = await call('Page.captureScreenshot', { format: 'png' });
    writeFileSync(process.env.SCREENSHOT_PATH, Buffer.from(capture.data, 'base64'));
  }
  assert.deepEqual(errors, [], 'No uncaught browser exceptions');
  console.log('PASS shareable tags, mobile navigation, and zero uncaught JavaScript exceptions');
} finally {
  socket.close();
}
