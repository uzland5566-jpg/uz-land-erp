// =============================================
// app.js — Umumiy kutubxona (barcha sahifalar ishlatadi)
// =============================================

var API = 'https://script.google.com/macros/s/AKfycbwiNoCbND7Es5sQiBHN2mEBsc0JfQBvrrl6ety4kudLMzlpLUZRtyvcIKSPgHyJr4IT/exec';

// ─── API chaqiruvlar ──────────────────────────────
async function api(params) {
  var url = API + '?' + new URLSearchParams(params).toString();
  var res = await fetch(url);
  if (!res.ok) throw new Error('Server xato: ' + res.status);
  return res.json();
}

async function apiPost(data) {
  var res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Server xato: ' + res.status);
  return res.json();
}

// ─── Auth ─────────────────────────────────────────
function getUser() {
  try { return JSON.parse(localStorage.getItem('uz_user') || 'null'); }
  catch(e) { return null; }
}
function setUser(u) { localStorage.setItem('uz_user', JSON.stringify(u)); }
function logout() { localStorage.removeItem('uz_user'); location.href = 'index.html'; }

function requireLogin(allowed) {
  var u = getUser();
  if (!u) { location.href = 'index.html'; return null; }
  if (allowed && allowed.indexOf(u.page) === -1 && allowed.indexOf('*') === -1) {
    location.href = pageFile(u.page); return null;
  }
  return u;
}

function pageFile(page) {
  var m = {
    'Dashboard':'dashboard.html','Laser':'laser.html','Chevar':'chevar.html',
    'Quyish':'quyish.html','Qadoqlash':'qadoqlash.html','Ombor':'ombor.html',
    'Sotuvchi':'sotuvchi.html','Retseptura':'retseptura.html',
    'HodimlarHisob':'xodimlar.html','Admin':'admin.html'
  };
  return m[page] || 'index.html';
}

// ─── UI yordamchilar ──────────────────────────────
function fmt(n) {
  return String(Math.round(parseFloat(String(n).replace(/[^\d.]/g,''))||0))
         .replace(/\B(?=(\d{3})+(?!\d))/g,' ');
}

function toast(msg, type) {
  var t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.className = 'toast ' + (type||'success') + ' show';
  setTimeout(function(){ t.classList.remove('show'); }, 3200);
}

function setDate(id) {
  var el = document.getElementById(id||'dateBadge');
  if (!el) return;
  var n = new Date();
  var D = ['Yak','Du','Se','Chor','Pay','Jum','Shan'];
  var M = ['Yanvar','Fevral','Mart','Aprel','May','Iyun','Iyul','Avgust','Sentabr','Oktabr','Noyabr','Dekabr'];
  el.textContent = '📅 ' + D[n.getDay()] + ', ' + String(n.getDate()).padStart(2,'0') + ' ' + M[n.getMonth()];
}

function loading(tbodyId, cols) {
  var el = document.getElementById(tbodyId);
  if (el) el.innerHTML = '<tr><td colspan="'+cols+'" style="text-align:center;padding:20px;color:#7a7a9a">⏳ Yuklanmoqda...</td></tr>';
}

function empty(tbodyId, cols, msg) {
  var el = document.getElementById(tbodyId);
  if (el) el.innerHTML = '<tr><td colspan="'+cols+'"><div style="text-align:center;padding:24px;color:#7a7a9a;font-size:13px"><div style="font-size:24px;margin-bottom:6px">📭</div>'+(msg||"Ma'lumot yo'q")+'</div></td></tr>';
}

// ─── Service Worker ───────────────────────────────
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(function(){});
}
