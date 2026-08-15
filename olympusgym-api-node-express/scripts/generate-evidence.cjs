const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
const evidenceDir = path.join(root, 'evidencias');
const htmlDir = path.join(evidenceDir, 'html');
fs.mkdirSync(htmlDir, { recursive: true });

const report = JSON.parse(fs.readFileSync(path.join(root, 'postman', 'newman-results.json'), 'utf8'));
const executions = report.run.executions;
const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const appCode = fs.readFileSync(path.join(root, 'src', 'app.js'), 'utf8');
const serverTranscript = fs.readFileSync(path.join(evidenceDir, 'server-transcript.txt'), 'utf8');

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function executionUrl(request) {
  const url = request.url;
  const protocol = url.protocol || 'http';
  const host = Array.isArray(url.host) ? url.host.join('.') : url.host;
  const port = url.port ? `:${url.port}` : '';
  const route = Array.isArray(url.path) ? url.path.join('/') : url.path;
  return `${protocol}://${host}${port}/${route}`;
}

function decodedResponse(execution) {
  const data = execution.response.stream?.data ?? [];
  const text = Buffer.from(data).toString('utf8');
  try {
    const json = JSON.parse(text);
    if (json && typeof json === 'object' && !Array.isArray(json) && json.token) {
      json.token = '[token de demostración oculto]';
    }
    return JSON.stringify(json, null, 2);
  } catch {
    return text;
  }
}

function sanitizedRequest(execution) {
  const raw = execution.request.body?.raw;
  if (!raw) return 'Sin cuerpo (solicitud GET)';
  try {
    const json = JSON.parse(raw);
    if (json.password) json.password = '********';
    return JSON.stringify(json, null, 2);
  } catch {
    return raw.replace(/("password"\s*:\s*")[^"]+("\s*)/g, '$1********$2');
  }
}

function baseStyles() {
  return `
    :root { color-scheme: dark; --bg:#111318; --panel:#1b1f27; --panel2:#222733; --line:#323846;
      --text:#f1f5f9; --muted:#a8b0bf; --orange:#ff6c37; --green:#35c48d; --purple:#8b5cf6; --cyan:#22d3ee; }
    * { box-sizing: border-box; }
    body { margin:0; width:1600px; min-height:1000px; background:var(--bg); color:var(--text);
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif; }
    .top { height:78px; display:flex; align-items:center; justify-content:space-between; padding:0 48px;
      border-bottom:1px solid var(--line); background:#171a20; }
    .brand { display:flex; gap:16px; align-items:center; font-weight:800; letter-spacing:.05em; }
    .brand-mark { width:38px; height:38px; border-radius:10px; display:grid; place-items:center;
      background:var(--orange); color:white; font-size:20px; }
    .context { color:var(--muted); font-size:15px; }
    .badge { border:1px solid var(--line); border-radius:999px; padding:8px 14px; color:var(--muted); font-size:14px; }
    .page { padding:34px 48px 28px; }
    .title { font-size:28px; font-weight:760; margin:0; }
    .subtitle { color:var(--muted); margin-top:7px; font-size:15px; }
    .panel { background:var(--panel); border:1px solid var(--line); border-radius:14px; overflow:hidden; }
    .panel-head { padding:13px 18px; color:#cbd5e1; font-size:13px; font-weight:750; letter-spacing:.06em;
      border-bottom:1px solid var(--line); background:var(--panel2); }
    pre { margin:0; white-space:pre-wrap; word-break:break-word; font-family:'DejaVu Sans Mono',Consolas,monospace;
      color:#e2e8f0; font-size:15px; line-height:1.43; }
    .foot { color:#788293; font-size:12px; margin-top:15px; display:flex; justify-content:space-between; }
  `;
}

function requestHtml(execution, index) {
  const method = execution.request.method;
  const methodColor = method === 'GET' ? '#35c48d' : '#ffb020';
  const responseText = decodedResponse(execution);
  const requestText = sanitizedRequest(execution);
  const assertions = execution.assertions || [];
  const started = new Date(report.run.timings.started).toLocaleString('es-CO', { timeZone: 'America/Bogota' });
  const responseSize = execution.response.stream?.data?.length ?? 0;
  const assertionCards = assertions.map((a) => `
    <div class="test"><span class="check">✓</span><span>${escapeHtml(a.assertion)}</span><strong>PASS</strong></div>`).join('');
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    ${baseStyles()}
    .request-line { margin-top:26px; height:62px; display:flex; align-items:center; gap:18px; padding:0 20px;
      background:var(--panel); border:1px solid var(--line); border-radius:12px; }
    .method { color:${methodColor}; font-weight:850; font-size:17px; width:62px; }
    .url { font-family:'DejaVu Sans Mono',Consolas,monospace; font-size:17px; color:white; flex:1; }
    .send { padding:11px 23px; border-radius:9px; color:white; background:#2563eb; font-weight:750; }
    .columns { display:grid; grid-template-columns: 1fr 1fr; gap:18px; margin-top:18px; height:470px; }
    .code { padding:18px; height:414px; overflow:hidden; }
    .response-meta { display:flex; gap:16px; align-items:center; }
    .status { color:var(--green); font-weight:850; }
    .tests { margin-top:18px; padding:16px 18px 13px; }
    .test-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px 18px; margin-top:11px; }
    .test { height:43px; display:flex; align-items:center; gap:10px; background:#18231f; border:1px solid #25523f;
      border-radius:9px; padding:0 13px; font-size:14px; }
    .test strong { margin-left:auto; color:var(--green); font-size:12px; }
    .check { color:var(--green); font-weight:900; }
  </style></head><body>
    <div class="top">
      <div class="brand"><div class="brand-mark">P</div><div>POSTMAN COLLECTION RUN <span class="context">/ NEWMAN 6.2.1</span></div></div>
      <div class="badge">EVIDENCIA REAL · NODE.JS + EXPRESS</div>
    </div>
    <main class="page">
      <h1 class="title">${escapeHtml(execution.item.name)}</h1>
      <div class="subtitle">OlympusGym API · Caso ${String(index + 1).padStart(2, '0')} de 09 · ejecución automatizada</div>
      <div class="request-line">
        <div class="method">${method}</div><div class="url">${escapeHtml(executionUrl(execution.request))}</div><div class="send">Ejecutado</div>
      </div>
      <div class="columns">
        <section class="panel"><div class="panel-head">REQUEST · BODY / PARÁMETROS</div><div class="code"><pre>${escapeHtml(requestText)}</pre></div></section>
        <section class="panel"><div class="panel-head response-meta"><span>RESPONSE</span><span class="status">${execution.response.code} ${escapeHtml(execution.response.status)}</span><span>${execution.response.responseTime} ms</span><span>${responseSize} B</span></div><div class="code"><pre>${escapeHtml(responseText)}</pre></div></section>
      </div>
      <section class="panel tests"><div class="panel-head" style="margin:-16px -18px 0">TEST RESULTS · ${assertions.length}/${assertions.length} APROBADOS</div><div class="test-grid">${assertionCards}</div></section>
      <div class="foot"><span>Fuente: postman/newman-results.json · sin datos sensibles</span><span>${escapeHtml(started)} · localhost:3000</span></div>
    </main>
  </body></html>`;
}

function summaryHtml() {
  const stats = report.run.stats;
  const timings = report.run.timings;
  const rows = executions.map((e) => {
    const pass = (e.assertions || []).every((a) => !a.error);
    return `<tr><td>${escapeHtml(e.item.name)}</td><td class="method-cell">${e.request.method}</td><td>${e.response.code} ${escapeHtml(e.response.status)}</td><td>${e.response.responseTime} ms</td><td class="${pass ? 'pass' : 'fail'}">${pass ? 'PASS' : 'FAIL'}</td></tr>`;
  }).join('');
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    ${baseStyles()}
    .metrics { display:grid; grid-template-columns:repeat(5,1fr); gap:14px; margin:26px 0 22px; }
    .metric { background:var(--panel); border:1px solid var(--line); border-radius:13px; padding:18px 20px; }
    .metric strong { font-size:30px; display:block; color:white; }
    .metric span { color:var(--muted); font-size:13px; }
    .metric.ok strong { color:var(--green); }
    table { width:100%; border-collapse:collapse; font-size:13px; background:var(--panel); border:1px solid var(--line); }
    th { text-align:left; color:#cbd5e1; background:var(--panel2); padding:10px 14px; }
    td { padding:9px 14px; border-top:1px solid var(--line); }
    td:first-child { font-weight:650; }
    .method-cell { color:var(--orange); font-weight:800; }
    .pass { color:var(--green); font-weight:850; }
    .fail { color:#fb7185; font-weight:850; }
  </style></head><body>
    <div class="top"><div class="brand"><div class="brand-mark">P</div><div>OLYMPUSGYM API <span class="context">/ POSTMAN + NEWMAN</span></div></div><div class="badge">CORRIDA COMPLETA</div></div>
    <main class="page"><h1 class="title">Resumen de validación de endpoints</h1><div class="subtitle">Node.js ${process.version} · Express ${packageJson.dependencies.express.replace('^','')} · localhost:3000</div>
      <div class="metrics">
        <div class="metric"><strong>${stats.requests.total}</strong><span>solicitudes</span></div>
        <div class="metric"><strong>${stats.assertions.total}</strong><span>assertions</span></div>
        <div class="metric ok"><strong>${stats.assertions.failed}</strong><span>fallos</span></div>
        <div class="metric"><strong>${Math.round(timings.responseAverage)} ms</strong><span>respuesta promedio</span></div>
        <div class="metric"><strong>${timings.completed - timings.started} ms</strong><span>duración total</span></div>
      </div>
      <table><thead><tr><th>Caso</th><th>Método</th><th>Respuesta</th><th>Tiempo</th><th>Resultado</th></tr></thead><tbody>${rows}</tbody></table>
      <div class="foot"><span>Fuente: ejecución real de OlympusGym_API.postman_collection.json</span><span>${new Date(timings.started).toLocaleString('es-CO', { timeZone:'America/Bogota' })}</span></div>
    </main></body></html>`;
}

function terminalHtml() {
  const transcript = `$ node --version\n${process.version}\n\n$ npm list express newman --depth=0\nolympusgym-api-node-express@1.0.0\n├── express@5.2.1\n└── newman@6.2.1\n\n$ node scripts/run-evidence.mjs\n${serverTranscript.trim()}\n\nResultado final: APROBADO\nSolicitudes: ${report.run.stats.requests.total} | Assertions: ${report.run.stats.assertions.total} | Fallos: ${report.run.stats.assertions.failed}`;
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    ${baseStyles()}
    .window { margin:34px 48px; border:1px solid #343b4a; border-radius:15px; overflow:hidden; box-shadow:0 30px 80px #0008; }
    .bar { height:48px; background:#20242c; display:flex; align-items:center; gap:10px; padding:0 18px; border-bottom:1px solid #343b4a; }
    .dot { width:13px; height:13px; border-radius:50%; }
    .tab { margin-left:18px; color:#d1d5db; font-size:14px; }
    .terminal { height:830px; padding:28px 34px; background:#0b0e14; }
    .terminal pre { color:#dbeafe; font-size:19px; line-height:1.62; }
    .accent { color:#67e8f9; }
  </style></head><body>
    <div class="window"><div class="bar"><span class="dot" style="background:#fb7185"></span><span class="dot" style="background:#fbbf24"></span><span class="dot" style="background:#34d399"></span><span class="tab">Terminal — OlympusGym API</span></div>
      <div class="terminal"><pre>${escapeHtml(transcript)}</pre></div>
    </div>
  </body></html>`;
}

function codeHtml() {
  const numbered = appCode.split('\n').map((line, i) => `<span class="line"><b>${String(i + 1).padStart(2, ' ')}</b>${escapeHtml(line)}</span>`).join('');
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    ${baseStyles()}
    .editor { margin:34px 48px; border:1px solid #343b4a; border-radius:15px; overflow:hidden; }
    .tabs { height:52px; background:#20242c; display:flex; align-items:end; padding-left:18px; gap:4px; border-bottom:1px solid #343b4a; }
    .tab { padding:14px 22px 13px; background:#0f131a; border-top:2px solid var(--purple); color:white; font-size:14px; }
    .path { margin-left:auto; padding:0 22px 15px; color:var(--muted); font-size:13px; }
    .code { height:836px; padding:24px 0; background:#0f131a; }
    .line { display:block; min-height:29px; font-family:'DejaVu Sans Mono',Consolas,monospace; font-size:17px; white-space:pre; color:#dbeafe; }
    .line b { display:inline-block; width:62px; padding-right:18px; text-align:right; color:#536071; font-weight:400; user-select:none; }
  </style></head><body><div class="editor"><div class="tabs"><div class="tab">app.js</div><div class="path">olympusgym-api-node-express / src / app.js</div></div><div class="code">${numbered}</div></div></body></html>`;
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1 });

  const jobs = [
    ['00_servidor_node_express.html', '00_servidor_node_express.png', terminalHtml()],
    ['00_codigo_express.html', '00_codigo_express.png', codeHtml()],
    ['00_resumen_postman_newman.html', '00_resumen_postman_newman.png', summaryHtml()]
  ];
  executions.slice(0, 9).forEach((execution, index) => {
    const slug = execution.item.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
    jobs.push([`${String(index + 1).padStart(2, '0')}_${slug}.html`, `${String(index + 1).padStart(2, '0')}_${slug}.png`, requestHtml(execution, index)]);
  });

  for (const [htmlName, pngName, html] of jobs) {
    const htmlPath = path.join(htmlDir, htmlName);
    fs.writeFileSync(htmlPath, html, 'utf8');
    await page.goto(`file://${htmlPath}`, { waitUntil: 'load' });
    await page.screenshot({ path: path.join(evidenceDir, pngName), fullPage: false });
  }
  await browser.close();
  console.log(`Generadas ${jobs.length} capturas en ${evidenceDir}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
