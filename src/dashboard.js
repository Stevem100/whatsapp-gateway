// Self-contained dashboard + docs pages served by the gateway.
// Zero external build step: plain HTML/CSS/JS strings so a git pull on
// cPanel is enough. The dashboard talks to the same-origin /api routes
// using the x-api-key header stored in localStorage.

const fs = require('fs')
const path = require('path')

function openapiYaml() {
  try {
    return fs.readFileSync(path.join(__dirname, '..', 'docs', 'openapi.yaml'), 'utf8')
  } catch {
    return 'openapi: 3.0.3\ninfo: {title: WhatsApp Gateway API, version: "1.0.0"}\npaths: {}\n'
  }
}

function docsHtml() {
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>WhatsApp Gateway &middot; API Docs</title>
<link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css">
<style>
  body{margin:0}
  #topbar{background:#075e54;color:#fff;padding:10px 18px;font-family:system-ui,Segoe UI,sans-serif;display:flex;gap:16px;align-items:center}
  #topbar strong{font-size:15px}
  #topbar a{color:#25d366;text-decoration:none;font-weight:600}
  .swagger-ui .topbar{display:none}
</style>
</head>
<body>
<div id="topbar"><strong>WhatsApp Gateway</strong><span>REST API reference</span><a href="/">&larr; Dashboard</a></div>
<div id="swagger"></div>
<script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
<script>
  SwaggerUIBundle({ url: "/api/openapi.yaml", dom_id: "#swagger", docExpansion: "list", tryItOutEnabled: true });
</script>
</body>
</html>
`
}

function dashboardHtml() {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>WhatsApp Gateway &middot; Dashboard</title>
<style>
:root{--bg:#0b141a;--panel:#111b21;--panel2:#1f2c33;--line:#2a3942;--txt:#e9edef;--dim:#8696a0;--green:#25d366;--amber:#f0b232;--red:#ef5350;--blue:#53bdeb}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--txt);font-family:system-ui,Segoe UI,Roboto,sans-serif}
header{display:flex;align-items:center;gap:14px;padding:14px 22px;background:var(--panel);border-bottom:1px solid var(--line);position:sticky;top:0;z-index:5}
header .logo{width:34px;height:34px;border-radius:8px;background:var(--green);display:flex;align-items:center;justify-content:center;font-weight:800;color:#062e20;font-size:18px}
header h1{font-size:17px;margin:0;flex:1}
header h1 small{color:var(--dim);font-weight:400;margin-left:8px}
header a{color:var(--green);text-decoration:none;font-weight:600;font-size:14px}
.pill{padding:4px 12px;border-radius:999px;font-size:12px;font-weight:600;border:1px solid var(--line);color:var(--dim)}
.pill.ok{background:#0b2e1c;color:var(--green);border-color:#14532d}
.pill.down{background:#2e0b0b;color:var(--red);border-color:#7f1d1d}
main{max-width:980px;margin:20px auto;padding:0 16px 40px;display:flex;flex-direction:column;gap:16px}
.card{background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:18px}
.card h2{margin:0 0 12px;font-size:15px;letter-spacing:.3px;color:var(--dim);text-transform:uppercase;font-weight:700}
.row{display:flex;gap:10px;flex-wrap:wrap;align-items:center}
input,textarea,select{background:var(--panel2);border:1px solid var(--line);color:var(--txt);border-radius:9px;padding:10px 12px;font-size:14px;outline:none;font-family:inherit}
input:focus,textarea:focus,select:focus{border-color:var(--green)}
button{background:var(--green);color:#062e20;border:0;border-radius:9px;padding:10px 16px;font-weight:700;font-size:14px;cursor:pointer}
button:hover{filter:brightness(1.08)}
button.ghost{background:var(--panel2);color:var(--txt);border:1px solid var(--line)}
button.danger{background:transparent;color:var(--red);border:1px solid #7f1d1d}
button:disabled{opacity:.45;cursor:not-allowed}
.muted{color:var(--dim);font-size:13px}
.sess{border:1px solid var(--line);border-radius:12px;padding:14px;margin-top:10px;background:var(--panel2)}
.sess .top{display:flex;gap:10px;align-items:center;flex-wrap:wrap}
.sess .name{font-weight:700;font-size:15px}
.sess .id{color:var(--dim);font-size:12px;font-family:monospace}
.badge{padding:3px 10px;border-radius:999px;font-size:12px;font-weight:700}
.badge.connected{background:#0b2e1c;color:var(--green)}
.badge.qr{background:#33270a;color:var(--amber)}
.badge.connecting,.badge.reconnecting{background:#0a2533;color:var(--blue)}
.badge.disconnected{background:#222d34;color:var(--dim)}
.badge.logged_out{background:#2e0b0b;color:var(--red)}
.chip{font-size:11px;color:var(--dim);border:1px solid var(--line);padding:2px 8px;border-radius:999px}
.chip.on{color:var(--green);border-color:#14532d}
.acts{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}
.acts button{padding:7px 12px;font-size:13px}
#qrModal{position:fixed;inset:0;background:rgba(0,0,0,.65);display:none;align-items:center;justify-content:center;z-index:50}
#qrModal.open{display:flex}
#qrBox{background:var(--panel);border:1px solid var(--line);border-radius:16px;padding:24px;text-align:center;max-width:360px}
#qrBox img{width:280px;height:280px;background:#fff;border-radius:8px}
#toasts{position:fixed;right:16px;bottom:16px;display:flex;flex-direction:column;gap:8px;z-index:60}
.toast{background:var(--panel2);border:1px solid var(--line);border-left:4px solid var(--green);padding:10px 14px;border-radius:8px;font-size:13px;max-width:380px}
.toast.err{border-left-color:var(--red)}
.ok-msg{color:var(--green);font-size:13px}
.err-msg{color:var(--red);font-size:13px;white-space:pre-wrap}
</style>
</head>
<body>
<header>
  <div class="logo">W</div>
  <h1>WhatsApp Gateway<small>multi-session bot gateway</small></h1>
  <a href="/docs">API Docs</a>
  <span class="pill" id="healthPill">checking&hellip;</span>
</header>
<main>

<section class="card">
  <h2>API key</h2>
  <div class="row">
    <input id="apiKey" type="password" placeholder="paste your x-api-key" style="flex:1;min-width:220px">
    <button id="saveKey">Save key</button>
    <span class="muted">stored in this browser (localStorage)</span>
  </div>
  <div id="keyStatus" class="muted" style="margin-top:8px"></div>
</section>

<section class="card">
  <h2>Sessions</h2>
  <div class="row">
    <input id="newName" placeholder="session name e.g. main" style="flex:1;min-width:200px">
    <button id="createBtn">Create session</button>
    <span class="muted">then press Connect and scan the QR with WhatsApp &rarr; Linked devices</span>
  </div>
  <div id="sessList"><div class="muted" style="margin-top:10px">loading&hellip;</div></div>
</section>

<section class="card">
  <h2>Send message</h2>
  <div class="row">
    <select id="sendSess" style="min-width:170px"></select>
    <input id="sendTo" placeholder="to e.g. 2547XXXXXXXX" style="flex:1;min-width:180px">
  </div>
  <div style="height:10px"></div>
  <textarea id="sendText" rows="3" placeholder="message text" style="width:100%"></textarea>
  <div style="height:10px"></div>
  <div class="row">
    <button id="sendBtn">Send</button>
    <span id="sendResult" class="muted"></span>
  </div>
</section>

</main>

<div id="qrModal">
  <div id="qrBox">
    <h3 style="margin:0 0 6px">Scan QR</h3>
    <div class="muted" style="margin-bottom:12px">WhatsApp &rarr; Settings &rarr; Linked devices &rarr; Link a device</div>
    <img id="qrImg" alt="QR code">
    <div class="muted" id="qrInfo" style="margin-top:10px"></div>
    <div style="margin-top:14px"><button class="ghost" id="qrClose">Close</button></div>
  </div>
</div>

<div id="toasts"></div>

<script>
var KEY = localStorage.getItem('wg_api_key') || '';
document.getElementById('apiKey').value = KEY;
var QR_TIMER = null;

function $(id){ return document.getElementById(id); }
function esc(s){
  return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
  });
}
function toast(msg, isErr){
  var t = document.createElement('div');
  t.className = 'toast' + (isErr ? ' err' : '');
  t.textContent = msg;
  $('toasts').appendChild(t);
  setTimeout(function(){ t.remove(); }, 5000);
}
function api(path, opts){
  opts = opts || {};
  var h = { 'x-api-key': KEY };
  if (opts.body) h['Content-Type'] = 'application/json';
  opts.headers = Object.assign(h, opts.headers || {});
  if (opts.body) opts.body = JSON.stringify(opts.body);
  return fetch('/api' + path, opts).then(function(r){
    return r.text().then(function(txt){
      var d = null;
      try { d = JSON.parse(txt); } catch (e) {}
      if (!r.ok) {
        var m = (d && d.error) || ('HTTP ' + r.status);
        if (r.status === 401) m = 'Unauthorized: invalid or missing API key';
        throw new Error(m);
      }
      return d;
    });
  });
}

function loadHealth(){
  fetch('/api/health').then(function(r){ return r.json(); }).then(function(d){
    var p = $('healthPill');
    if (d && d.ok) {
      p.className = 'pill ok';
      p.textContent = 'online \u00b7 up ' + Math.floor((d.uptimeSec || 0) / 60) + 'm \u00b7 ' + d.sessions.connected + '/' + d.sessions.total + ' connected';
    } else { p.className = 'pill down'; p.textContent = 'degraded'; }
  }).catch(function(){
    $('healthPill').className = 'pill down';
    $('healthPill').textContent = 'offline';
  });
}

function statusBadge(st){ return '<span class="badge ' + esc(st) + '">' + esc(st) + '</span>'; }

function card(s){
  var st = s.status || 'disconnected';
  var bot = s.botEnabled ? '<span class="chip on">bot on</span>' : '<span class="chip">bot off</span>';
  var phone = s.connectedPhone ? '<span class="chip">' + esc(s.connectedPhone) + '</span>' : '';
  var acts =
    '<button class="ghost" data-act="connect" data-id="' + esc(s.id) + '">Connect</button>' +
    '<button class="ghost" data-act="qr" data-id="' + esc(s.id) + '">QR</button>' +
    '<button class="ghost" data-act="disconnect" data-id="' + esc(s.id) + '">Disconnect</button>' +
    '<button class="ghost" data-act="logout" data-id="' + esc(s.id) + '">Logout</button>' +
    '<button class="ghost" data-act="webhook" data-id="' + esc(s.id) + '">Webhook</button>' +
    '<button class="ghost" data-act="bot" data-id="' + esc(s.id) + '" data-on="' + (s.botEnabled ? '1' : '') + '">' + (s.botEnabled ? 'Disable bot' : 'Enable bot') + '</button>' +
    '<button class="danger" data-act="delete" data-id="' + esc(s.id) + '">Delete</button>';
  return '<div class="sess"><div class="top">' +
    '<span class="name">' + esc(s.name) + '</span>' + statusBadge(st) + bot + phone +
    '<span class="id">' + esc(s.id) + '</span>' +
    '</div><div class="acts">' + acts + '</div></div>';
}

function loadSessions(){
  if (!KEY) {
    $('sessList').innerHTML = '<div class="muted" style="margin-top:10px">Enter your API key above to manage sessions.</div>';
    $('sendSess').innerHTML = '<option value="">- no key -</option>';
    return;
  }
  api('/sessions').then(function(list){
    var arr = Array.isArray(list) ? list : (list.sessions || []);
    if (!arr.length) {
      $('sessList').innerHTML = '<div class="muted" style="margin-top:10px">No sessions yet. Create one above.</div>';
    } else {
      $('sessList').innerHTML = arr.map(card).join('');
    }
    var sel = arr.map(function(s){
      return '<option value="' + esc(s.id) + '">' + esc(s.name) + '</option>';
    }).join('');
    $('sendSess').innerHTML = sel || '<option value="">- no sessions -</option>';
  }).catch(function(e){
    $('sessList').innerHTML = '<div class="err-msg" style="margin-top:10px">' + esc(e.message) + '</div>';
  });
}

function closeModal(){
  $('qrModal').classList.remove('open');
  if (QR_TIMER) { clearInterval(QR_TIMER); QR_TIMER = null; }
}
function showQr(id){
  $('qrModal').classList.add('open');
  var pull = function(){
    api('/sessions/' + id + '/qr').then(function(d){
      if (d.qr) {
        $('qrImg').src = d.qr;
        $('qrInfo').textContent = 'QR rotates every ~60s, this panel auto-refreshes.';
      } else if (d.status === 'connected') {
        $('qrImg').removeAttribute('src');
        $('qrInfo').textContent = 'Already connected!';
        closeModal();
        loadSessions();
      } else {
        $('qrImg').removeAttribute('src');
        $('qrInfo').textContent = d.message || ('status: ' + d.status);
      }
    }).catch(function(e){ $('qrInfo').textContent = e.message; });
  };
  if (QR_TIMER) clearInterval(QR_TIMER);
  QR_TIMER = setInterval(pull, 4000);
  pull();
}

document.addEventListener('click', function(e){
  var b = e.target.closest('button[data-act]');
  if (b) {
    var id = b.getAttribute('data-id');
    var act = b.getAttribute('data-act');
    if (act === 'connect') {
      b.disabled = true;
      api('/sessions/' + id + '/connect', { method: 'POST' })
        .then(function(){ toast('Connecting... open QR if it does not appear'); loadSessions(); })
        .catch(function(err){ toast(err.message, true); b.disabled = false; });
    } else if (act === 'qr') {
      showQr(id);
    } else if (act === 'disconnect') {
      api('/sessions/' + id + '/disconnect', { method: 'POST' })
        .then(function(){ toast('Disconnected'); loadSessions(); })
        .catch(function(err){ toast(err.message, true); });
    } else if (act === 'logout') {
      if (!confirm('Log out this WhatsApp account?')) return;
      api('/sessions/' + id + '/logout', { method: 'POST' })
        .then(function(){ toast('Logged out'); loadSessions(); })
        .catch(function(err){ toast(err.message, true); });
    } else if (act === 'webhook') {
      var url = prompt('Webhook URL to receive message events (leave empty to clear):');
      if (url === null) return;
      api('/sessions/' + id + '/webhook', { method: 'PUT', body: { url: url } })
        .then(function(){ toast('Webhook saved'); loadSessions(); })
        .catch(function(err){ toast(err.message, true); });
    } else if (act === 'bot') {
      var on = !!b.getAttribute('data-on');
      api('/sessions/' + id + '/bot', { method: 'PUT', body: { enabled: !on } })
        .then(function(){ toast(on ? 'Bot disabled' : 'Bot enabled'); loadSessions(); })
        .catch(function(err){ toast(err.message, true); });
    } else if (act === 'delete') {
      if (!confirm('Delete this session and its stored credentials?')) return;
      api('/sessions/' + id, { method: 'DELETE' })
        .then(function(){ toast('Session deleted'); loadSessions(); })
        .catch(function(err){ toast(err.message, true); });
    }
    return;
  }
  if (e.target.id === 'qrModal' || e.target.id === 'qrClose') closeModal();
});

$('saveKey').addEventListener('click', function(){
  KEY = $('apiKey').value.trim();
  localStorage.setItem('wg_api_key', KEY);
  api('/sessions').then(function(){
    $('keyStatus').innerHTML = '<span class="ok-msg">Key saved and valid.</span>';
    loadSessions();
  }).catch(function(err){
    $('keyStatus').innerHTML = '<span class="err-msg">' + esc(err.message) + '</span>';
  });
});

$('createBtn').addEventListener('click', function(){
  var name = $('newName').value.trim();
  if (!name) { toast('Enter a session name first', true); return; }
  $('createBtn').disabled = true;
  api('/sessions', { method: 'POST', body: { name: name } })
    .then(function(){ $('newName').value = ''; toast('Session created'); loadSessions(); })
    .catch(function(err){ toast(err.message, true); })
    .then(function(){ $('createBtn').disabled = false; });
});

$('sendBtn').addEventListener('click', function(){
  var sid = $('sendSess').value;
  var to = $('sendTo').value.trim();
  var text = $('sendText').value;
  if (!sid) { toast('Create a session first', true); return; }
  if (!to || !text) { toast('Both "to" and message text are required', true); return; }
  $('sendBtn').disabled = true;
  $('sendResult').className = 'muted';
  $('sendResult').textContent = 'sending...';
  api('/sessions/' + sid + '/messages', { method: 'POST', body: { to: to, text: text } })
    .then(function(d){
      var mid = d && d.message && d.message.id ? d.message.id : 'sent';
      $('sendResult').className = 'ok-msg';
      $('sendResult').textContent = 'Delivered (id: ' + mid + ')';
      $('sendText').value = '';
    })
    .catch(function(err){
      $('sendResult').className = 'err-msg';
      $('sendResult').textContent = err.message;
    })
    .then(function(){ $('sendBtn').disabled = false; });
});

loadHealth();
loadSessions();
setInterval(loadHealth, 15000);
setInterval(loadSessions, 10000);
</script>
</body>
</html>
`
}

module.exports = { dashboardHtml, docsHtml, openapiYaml }
