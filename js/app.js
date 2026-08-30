
const SITE = {
  name: "Matematikako Laborategia",
  author: "[EGILEAREN IZENA / NOMBRE DEL AUTOR]",
  ai: "OpenAI ChatGPT",
  license: "CC BY-NC-SA 4.0",
  licenseUrl: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
  version: "0.1.5",
  version: "0.1.3"
};

function esc(v){ return (v ?? "").toString().replace(/[&<>"']/g, m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m])); }
function paras(text){
  if(!text) return "";
  return text.toString().trim().split(/\n\s*\n/).map(p=>`<p>${esc(p).replace(/\n/g,"<br>")}</p>`).join("");
}
function bullets(items){
  if(!items || !items.length) return "";
  return "<ul>"+items.map(x=>`<li>${typeof x==="string"?esc(x):esc(x.testua||x.azalpena||JSON.stringify(x))}</li>`).join("")+"</ul>";
}
function activityById(id){ return (window.LAB_JARDUERAK||[]).find(a=>a.id===id); }
function query(name){ return new URLSearchParams(location.search).get(name); }

function footerHTML(){
  return `<footer class="site-footer">
  <div><strong>${SITE.name}</strong></div>
  <div>Egilea / Autor: ${esc(SITE.author)} · Adimen artifizialaren laguntzarekin / Con asistencia de IA: ${esc(SITE.ai)}</div>
  <div><a href="lizentzia.html">${SITE.license}</a> · <span class="site-version">v${SITE.version}</span></div>
  </footer>`;
}

function navHTML(active){
  const items=[["index.html","Hasiera","home"],["bankua.html","Jarduera-bankua","bank"],["gida.html","Irakaslearen gida","guide"],["jarraipena.html","Kurtsoaren jarraipena","track"]];
  return `<div class="topbar"><nav class="nav"><a class="brand" href="index.html">${SITE.name}</a>`+
    items.map(([href,label,key])=>`<a ${active===key?'class="active"':''} href="${href}">${label}</a>`).join("")+
    `<a href="lizentzia.html">Lizentzia</a></nav></div>`;
}

function initShell(active){
  const nav=document.getElementById("siteNav"); if(nav) nav.outerHTML=navHTML(active);
  const foot=document.getElementById("siteFooter"); if(foot) foot.outerHTML=footerHTML();
}

function renderCompetencies(comps){
  if(!comps?.length) return "";
  return `<table><thead><tr><th>Kodea</th><th>Sakontasuna</th><th>Nola lantzen da</th></tr></thead><tbody>`+
    comps.map(c=>`<tr><td><strong>${esc(c.kodea)}</strong></td><td>${"●".repeat(c.sakontasuna||0)}</td><td>${esc(c.nola_lantzen_da)}</td></tr>`).join("")+
    `</tbody></table>`;
}

function renderPresentation(a){
  const p=a.jardueraren_aurkezpena||{};
  let h=`<div class="editorial"><h2>Jarduera ulertzeko</h2>`;
  if(p.helburua) h+=`<p class="lead">${esc(p.helburua)}</p>`;
  h+=paras(p.azalpen_nagusia); if(p.ikasleen_ibilbide_tipikoa?.length) h+=`<h2>Ikasleen ibilbide tipikoa</h2>${bullets(p.ikasleen_ibilbide_tipikoa)}`; if(p.ohiko_blokeoak?.length){h+=`<h2>Ohiko blokeoak</h2>`;p.ohiko_blokeoak.forEach(b=>h+=`<div class="example"><h3>${esc(b.suposizioa)}</h3><p>${esc(b.zergatik_interesgarria)}</p></div>`);}
  if(p.soluzioen_irakurketa?.length){
    h+=`<h2>Soluzioek zer erakusten dute?</h2>`;
    for(const s of p.soluzioen_irakurketa){
      h+=`<div class="example"><h3>${esc(s.izena)}</h3>${s.irudia?`<div class="figure solution-figure"><img src="${esc(s.irudia)}" alt="${esc(s.izena)}"></div>`:""}<p>${esc(s.azalpena)}</p>`;
      if(s.zer_apurtzen_du) h+=`<p><strong>Zer apurtzen du?</strong> ${esc(s.zer_apurtzen_du)}</p>`;
      if(s.irakaslearen_galdera) h+=`<div class="callout quote"><strong>${esc(s.irakaslearen_galdera)}</strong></div>`;
      h+=`</div>`;
    }
  }
  if(p.bateratze_eztabaida?.length) h+=`<h2>Bateratzeko eztabaida</h2>${bullets(p.bateratze_eztabaida)}`; if(p.eramateko_ideia) h+=`<div class="callout idea"><strong>Eramateko ideia:</strong> ${esc(p.eramateko_ideia)}</div>`;
  return h+`</div>`;
}

function renderTeacher(a){
  const t=a.irakaslearen_fitxa||{};
  let h=`<div class="print-actions no-print"><button class="button secondary" onclick="printSection('teacher')">Irakaslearen fitxa inprimatu / PDF</button></div><div class="teacher-sheet">`;
  if(t.jardueraren_deskribapena) h+=`<h2>Jardueraren deskribapena</h2>${paras(t.jardueraren_deskribapena)}`;
  if(t.prestaketa) h+=`<h2>Prestaketa</h2>${bullets(t.prestaketa)}`;
  if(t.aurkezpena) h+=`<h2>Aurkezpena</h2><div class="callout quote">${esc(t.aurkezpena)}</div>`;
  if(t.ez_esatekoak) h+=`<h2>Ez esatekoak</h2>${bullets(t.ez_esatekoak)}`;
  if(t.denboralizazioa?.length){
    h+=`<h2>Denboralizazioa</h2><div class="timeline">`+
      t.denboralizazioa.map(x=>`<div class="step"><strong>${esc(x.tartea)} · ${esc(x.fasea)}</strong>${esc(x.azalpena)}</div>`).join("")+`</div>`;
  }
  if(t.galdera_erabilgarriak) h+=`<h2>Galdera erabilgarriak</h2>${bullets(t.galdera_erabilgarriak)}`;
  if(t.pista_mailak) h+=`<h2>Pista-mailak</h2>${bullets(t.pista_mailak)}`;
  // Reuse solution interpretation from presentation here as well when present.
  const solInterp=a.jardueraren_aurkezpena?.soluzioen_irakurketa;
  if(solInterp?.length){
    h+=`<h2>Soluzioak eta apurtzen dituzten suposizioak</h2>`;
    solInterp.forEach(s=>{
      h+=`<div class="example"><h3>${esc(s.izena)}</h3>${s.irudia?`<div class="figure solution-figure"><img src="${esc(s.irudia)}" alt="${esc(s.izena)}"></div>`:""}<p>${esc(s.azalpena)}</p>`;
      if(s.zer_apurtzen_du) h+=`<p><strong>Apurtzen duen suposizioa:</strong> ${esc(s.zer_apurtzen_du)}</p>`;
      if(s.irakaslearen_galdera) h+=`<p><strong>Bateratzeko galdera:</strong> ${esc(s.irakaslearen_galdera)}</p>`;
      h+=`</div>`;
    });
  }
  if(t.soluzioak?.length){
    h+=`<h2>Soluzioa / orientabidea</h2>`;
    for(const s of t.soluzioak){
      h+=`<div class="example"><h3>${esc(s.izena)}</h3>`;
      if(s.taula){
        h+=`<div class="matrix-wrap"><table><thead><tr>${(s.taula.zutabeak||[]).map(z=>`<th>${esc(z)}</th>`).join("")}</tr></thead><tbody>`+
        (s.taula.errenkadak||[]).map(r=>`<tr>${r.map(c=>`<td>${esc(c)}</td>`).join("")}</tr>`).join("")+`</tbody></table></div>`;
      }
      if(s.diagram_text) h+=`<div class="callout idea"><pre class="text-diagram">${esc(s.diagram_text)}</pre></div>`;
      if(s.azalpena) h+=paras(s.azalpena);
      if(s.irudiak?.length){
        for(const img of s.irudiak){
          const path=img.replace(/^\.\.\//,"");
          h+=`<div class="figure"><img src="${esc(path)}" alt="${esc(s.izena)}"></div>`;
        }
      }
      h+=`</div>`;
    }
  }
  if(t.amaierako_bateratzea) h+=`<h2>Amaierako bateratzea</h2>${paras(t.amaierako_bateratzea)}`; if(t.hedapenak) h+=`<h2>Hedapenak</h2>${bullets(t.hedapenak)}`;
  if(t.ebaluazioan_zer_behatu) h+=`<h2>Ebaluazioan zer behatu</h2>${bullets(t.ebaluazioan_zer_behatu)}`;
  return h+`</div>`;
}

function renderStudent(a){
  const st=a.ikaslearen_fitxa||{};
  if(st.beharrezkoa===false){
    return `<div class="card"><h2>Ikaslearen fitxa</h2><p>Jarduera honek ez du derrigorrez ikaslearen fitxarik behar.</p>${st.aukera?`<p>${esc(st.aukera)}</p>`:""}</div>`;
  }
  let h=`<div class="print-actions no-print"><button class="button secondary" onclick="printSection('student')">Ikaslearen fitxa inprimatu / PDF</button></div><div class="print-sheet"><div class="eyebrow">Matematikako Laborategia</div><h1>${esc(st.titulua||a.izena)}</h1>`;
  for(const b of (st.blokeak||[])){
    if(b.mota==="enuntziatua") h+=`<div class="callout">${esc(b.testua)}</div>`;
    else if(b.mota==="azpiizenburua") h+=`<h2>${esc(b.testua)}</h2>`;
    else if(b.mota==="testua") h+=`<p>${esc(b.testua)}</p>`;
    else if(b.mota==="galdera") h+=`<p><strong>${esc(b.testua)}</strong></p><div class="line"></div>`;
    else if(b.mota==="taula_datuak"){
      h+=`<table><thead><tr>${(b.zutabeak||[]).map(z=>`<th>${esc(z)}</th>`).join("")}</tr></thead><tbody>`+
      (b.errenkadak||[]).map(r=>`<tr>${r.map(c=>`<td>${esc(c)}</td>`).join("")}</tr>`).join("")+`</tbody></table>`;
    }
    else if(b.mota==="irudia"){
      const path=(b.fitxategia||"").replace(/^\.\.\//,"");
      h+=`<div class="figure"><img src="${esc(path)}" alt=""></div>`;
    } else if(b.mota==="taula"){
      h+=`<table><thead><tr>${(b.zutabeak||[]).map(z=>`<th>${esc(z)}</th>`).join("")}</tr></thead><tbody>`+
      Array.from({length:7},()=>`<tr>${(b.zutabeak||[]).map(()=>"<td>&nbsp;</td>").join("")}</tr>`).join("")+`</tbody></table>`;
    }
  }
  return h+`</div>`;
}

function printSection(which){
  document.body.classList.remove("print-teacher","print-student");
  document.body.classList.add(which==="teacher"?"print-teacher":"print-student");
  window.print();
  setTimeout(()=>document.body.classList.remove("print-teacher","print-student"),300);
}

function renderActivityPage(){
  const id=query("id");
  const a=activityById(id);
  const root=document.getElementById("activityRoot");
  if(!a){ root.innerHTML=`<div class="card"><h1>Jarduera ez da aurkitu</h1><p>ID: ${esc(id)}</p></div>`; return; }
  const ft=a.fitxa_teknikoa||{};
  root.innerHTML=`
  <div class="activity-back no-print"><a href="bankua.html">← Jarduera-bankura itzuli</a></div>
  <div class="page-head"><div><div class="eyebrow">${esc(ft.jarduera_mota||"")} · ${esc((ft.fasea||[]).join(", "))}</div><h1>${esc(a.izena)}</h1></div>
  <div class="pills"><span class="pill type">${esc(ft.jarduera_mota)}</span><span class="pill">${esc(ft.denboralizazioa)}</span><span class="pill">${esc(ft.irekiera_maila)}</span></div></div>
  <div class="tabs" id="activityTabs">
    <button class="active" data-tab="tech">Fitxa teknikoa</button>
    <button data-tab="presentation">Jardueraren aurkezpena</button>
    <button data-tab="teacher">Irakaslearen fitxa</button>
    <button data-tab="student">Ikaslearen fitxa</button>
  </div>
  <section id="tech" class="tabpane active">
    <div class="card"><h2>Deskribapen laburra</h2><p>${esc(ft.deskribapen_laburra)}</p></div>
    <div class="section summary-sheet">
      <h2>Laburpen-fitxa</h2>
      <div class="summary-table-wrap"><table class="summary-table"><tbody>
        <tr><th>Jarduera mota:</th><td>${esc(ft.jarduera_mota)}</td><th>Fasea:</th><td>${esc((ft.fasea||[]).join(", "))}</td></tr>
        <tr><th>Denboralizazioa:</th><td>${esc(ft.denboralizazioa)}</td><th>Irekiera-maila:</th><td>${esc(ft.irekiera_maila)}</td></tr>
        <tr><th>Zailtasuna:</th><td>${esc(ft.zailtasuna)}</td><th>Taldekatzea:</th><td>${esc(ft.taldekatzea)}</td></tr>
        <tr><th>Gaiak:</th><td>${esc((ft.gaiak||[]).join(" · "))}</td><th>Pentsatzeko tresnak:</th><td>${esc((ft.pentsatzeko_tresnak||[]).join(" · "))}</td></tr>
      </tbody></table></div>
    </div>
    <div class="section"><h2>Konpetentziak</h2>${renderCompetencies(ft.konpetentziak)}</div>
  </section>
  <section id="presentation" class="tabpane">${renderPresentation(a)}</section>
  <section id="teacher" class="tabpane teacher">${renderTeacher(a)}</section>
  <section id="student" class="tabpane student">${renderStudent(a)}</section>`;
  bindTabs();
}

function bindTabs(){
  document.querySelectorAll(".tabs").forEach(group=>{
    const buttons=[...group.querySelectorAll("[data-tab]")];
    buttons.forEach(btn=>btn.addEventListener("click",()=>{
      buttons.forEach(b=>b.classList.toggle("active",b===btn));
      document.querySelectorAll(".tabpane").forEach(p=>p.classList.toggle("active",p.id===btn.dataset.tab));
    }));
  });
}

function renderBank(){
  const root=document.getElementById("bankRoot");
  const acts=window.LAB_JARDUERAK||[];
  root.innerHTML=acts.map(a=>{
    const ft=a.fitxa_teknikoa||{};
    return `<article class="card activity-card" data-type="${esc(ft.jarduera_mota)}">
      <div class="pills"><span class="pill type">${esc(ft.jarduera_mota)}</span><span class="pill">${esc(ft.denboralizazioa)}</span><span class="pill">${esc(ft.irekiera_maila)}</span></div>
      <h3>${esc(a.izena)}</h3><p>${esc(ft.deskribapen_laburra)}</p>
      <a class="button" href="jarduera.html?id=${encodeURIComponent(a.id)}">Fitxa ireki</a></article>`;
  }).join("");
  document.querySelectorAll("[data-filter]").forEach(btn=>btn.addEventListener("click",()=>{
    document.querySelectorAll("[data-filter]").forEach(b=>b.classList.remove("active")); btn.classList.add("active");
    const f=btn.dataset.filter;
    document.querySelectorAll(".activity-card").forEach(c=>c.style.display=(f==="all"||c.dataset.type===f)?"block":"none");
  }));
}

const TRACK_KEY="mlab_course_tracking_v2";
function loadTracking(){ try{return JSON.parse(localStorage.getItem(TRACK_KEY)||'{"version":2,"records":[]}')}catch(e){return {version:2,records:[]}} }
function saveTracking(d){ localStorage.setItem(TRACK_KEY,JSON.stringify(d)); }

function trackingFormHTML(){
  return `<div class="card followup"><h2>Jarduera baten jarraipena gehitu</h2>
  <form id="trackingForm">
  <label>Jarduera</label><select name="activityId" required><option value="">— Hautatu —</option>${(window.LAB_JARDUERAK||[]).map(a=>`<option value="${esc(a.id)}">${esc(a.izena)}</option>`).join("")}</select>
  <div class="meta">
    <div class="box"><small>Data</small><input type="date" name="date" required></div>
    <div class="box"><small>Benetako saioak</small><input type="number" step="0.5" min="0" name="sessions"></div>
    <div class="box"><small>Balorazioa</small><select name="rating"><option value="">—</option><option>5</option><option>4</option><option>3</option><option>2</option><option>1</option></select></div>
    <div class="box"><small>Errepikatu?</small><select name="repeat"><option value="">—</option><option value="true">Bai</option><option value="false">Ez</option></select></div>
  </div>
  <label>Ikasleen erantzuna</label><textarea name="studentResponse"></textarea>
  <label>Zer funtzionatu du?</label><textarea name="worked"></textarea>
  <label>Zailtasunak</label><textarea name="difficulties"></textarea>
  <label>Egindako aldaketak</label><textarea name="changes"></textarea>
  <label>Datorren urterako</label><textarea name="nextYear"></textarea>
  <button class="button" type="submit">Gorde</button><span id="saveMsg" class="save-state"></span>
  </form></div>`;
}

function renderTrackingPage(){
  const root=document.getElementById("trackingRoot");
  root.innerHTML=trackingFormHTML()+`
  <section class="card section"><div class="page-head"><div><h2>Egindako jarduerak</h2></div><div class="backup-row no-print">
  <button class="button secondary" id="backupBtn">Babeskopia egin</button>
  <label class="button secondary" style="cursor:pointer">Babeskopia berreskuratu<input id="restoreInput" type="file" accept=".json,application/json" style="display:none"></label>
  </div></div><div id="history"></div></section>
  <section class="card section"><h2>Konpetentzia × jarduera matrizea</h2><div id="matrix"></div></section>
  <section class="card section"><h2>Konpetentzien estaldura metatua</h2><p class="note">Programazioaren oreka aztertzeko adierazlea da; ez ikasleen lorpen-maila.</p><div id="coverage"></div></section>`;
  document.getElementById("trackingForm").addEventListener("submit",e=>{
    e.preventDefault();
    const f=e.currentTarget, data=loadTracking();
    data.records.push({
      id:crypto.randomUUID?crypto.randomUUID():String(Date.now()),
      activityId:f.activityId.value,date:f.date.value,sessions:f.sessions.value,rating:f.rating.value,
      repeat:f.repeat.value,studentResponse:f.studentResponse.value,worked:f.worked.value,
      difficulties:f.difficulties.value,changes:f.changes.value,nextYear:f.nextYear.value,savedAt:new Date().toISOString()
    });
    saveTracking(data); f.reset(); document.getElementById("saveMsg").textContent="Gordeta ✓"; renderTrackingViews();
  });
  document.getElementById("backupBtn").onclick=()=>{
    const blob=new Blob([JSON.stringify(loadTracking(),null,2)],{type:"application/json"});
    const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="matematikako-laborategia-jarraipena.json";a.click();URL.revokeObjectURL(a.href);
  };
  document.getElementById("restoreInput").onchange=e=>{
    const file=e.target.files[0]; if(!file)return;
    const r=new FileReader(); r.onload=()=>{try{const d=JSON.parse(r.result);if(!d.records)throw 0;if(confirm("Oraingo jarraipena ordezkatu?")){saveTracking(d);renderTrackingViews();}}catch(_){alert("Babeskopia baliogabea")}};r.readAsText(file);
  };
  document.querySelectorAll('input[type="date"]').forEach(el=>el.addEventListener("click",()=>{try{el.showPicker?.()}catch(e){}}));
  renderTrackingViews();
}

function renderTrackingViews(){
  const d=loadTracking(), recs=d.records||[];
  const h=document.getElementById("history");
  h.innerHTML=recs.length?`<div class="matrix-wrap"><table><thead><tr><th>Data</th><th>Jarduera</th><th>Saioak</th><th>Balorazioa</th><th>Datorren urterako</th><th></th></tr></thead><tbody>`+
    recs.map(r=>{const a=activityById(r.activityId);return `<tr><td>${esc(r.date)}</td><td><strong>${esc(a?.izena||r.activityId)}</strong></td><td>${esc(r.sessions||"—")}</td><td>${esc(r.rating||"—")}</td><td>${esc(r.nextYear||"—")}</td><td><button class="mini" onclick="deleteTracking('${esc(r.id)}')">Ezabatu</button></td></tr>`}).join("")+`</tbody></table></div>`:
    `<p>Oraindik ez dago jarduerarik erregistratuta.</p>`;

  const comps=["1.1","1.2","2.1","2.2","3.1","3.2","4.1","4.2","5.1","5.2","5.3"];
  const usedIds=[...new Set(recs.map(r=>r.activityId))];
  const rows=usedIds.map(id=>{
    const a=activityById(id), map={}; (a?.fitxa_teknikoa?.konpetentziak||[]).forEach(c=>map[c.kodea]=c.sakontasuna);
    return `<tr><td><strong>${esc(a?.izena||id)}</strong></td>${comps.map(c=>`<td>${map[c]?"●".repeat(map[c]):"—"}</td>`).join("")}</tr>`;
  }).join("");
  document.getElementById("matrix").innerHTML=`<div class="matrix-wrap"><table class="matrix"><thead><tr><th>Jarduera</th>${comps.map(c=>`<th>${c}</th>`).join("")}</tr></thead><tbody>${rows||'<tr><td colspan="12">—</td></tr>'}</tbody></table></div>`;

  const cov=comps.map(c=>{
    let count=0,sum=0;
    usedIds.forEach(id=>{const x=(activityById(id)?.fitxa_teknikoa?.konpetentziak||[]).find(k=>k.kodea===c);if(x){count++;sum+=x.sakontasuna||0}});
    let label="Gutxi",cls="low"; if(sum>=7){label="Orekatua";cls="ok"} else if(sum>=3){label="Garatzeko";cls="mid"}
    return `<tr><td><strong>${c}</strong></td><td>${count}</td><td>${sum}</td><td><span class="status ${cls}">${label}</span></td></tr>`;
  }).join("");
  document.getElementById("coverage").innerHTML=`<table><thead><tr><th>Konpetentzia</th><th>Jarduera kop.</th><th>Sakontasun metatua</th><th>Egoera</th></tr></thead><tbody>${cov}</tbody></table>`;
}

function deleteTracking(id){
  const d=loadTracking(); d.records=d.records.filter(r=>r.id!==id); saveTracking(d); renderTrackingViews();
}
