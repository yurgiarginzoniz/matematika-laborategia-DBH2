
document.querySelectorAll('[data-tabs]').forEach(group=>{
 const buttons=[...group.querySelectorAll('[data-tab]')];
 const scope=group.parentElement;
 const panes=[...scope.querySelectorAll('.tabpane')];
 buttons.forEach(btn=>btn.addEventListener('click',()=>{
   buttons.forEach(b=>b.classList.toggle('active',b===btn));
   panes.forEach(p=>p.classList.toggle('active',p.id===btn.dataset.tab));
 }));
});
document.querySelectorAll('[data-filter]').forEach(btn=>{
 btn.addEventListener('click',()=>{
   document.querySelectorAll('[data-filter]').forEach(b=>b.classList.remove('active'));
   btn.classList.add('active');
   const f=btn.dataset.filter;
   document.querySelectorAll('.activity-card').forEach(c=>{
     c.style.display=(f==='all'||c.dataset.type===f)?'block':'none';
   });
 });
});


// ---------- Jarraipena: persistent local browser storage ----------
const MLAB_STORAGE_KEY = "matematikako_laborategia_jarraipena_v1";

function mlabLoadAll(){
  try { return JSON.parse(localStorage.getItem(MLAB_STORAGE_KEY) || '{"version":1,"records":{}}'); }
  catch(e){ return {version:1, records:{}}; }
}
function mlabSaveAll(data){
  localStorage.setItem(MLAB_STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new Event("mlab-tracking-changed"));
}
function mlabActivityId(){
  return document.body.dataset.activityId || "";
}
function mlabLoadForm(){
  const form=document.getElementById("trackingForm");
  if(!form) return;
  const id=mlabActivityId(), data=mlabLoadAll(), r=data.records[id];
  if(!r) return;
  ["date","sessions","rating","studentResponse","worked","difficulties","changes","nextYear"].forEach(k=>{
    const el=form.elements[k]; if(el && r[k]!==undefined) el.value=r[k];
  });
  if(form.elements.repeat && r.repeat!==undefined) form.elements.repeat.value=String(r.repeat);
  const msg=document.getElementById("saveStatus");
  if(msg) msg.textContent="Aurretik gordetako jarraipena kargatu da.";
}
function mlabSaveForm(ev){
  ev.preventDefault();
  const form=ev.currentTarget, id=mlabActivityId();
  if(!id) return;
  const data=mlabLoadAll();
  data.records[id]={
    activityId:id,
    activityName:document.body.dataset.activityName || id,
    date:form.elements.date.value,
    sessions:form.elements.sessions.value,
    rating:form.elements.rating.value,
    studentResponse:form.elements.studentResponse.value,
    worked:form.elements.worked.value,
    difficulties:form.elements.difficulties.value,
    changes:form.elements.changes.value,
    nextYear:form.elements.nextYear.value,
    repeat:form.elements.repeat.value,
    savedAt:new Date().toISOString()
  };
  mlabSaveAll(data);
  const msg=document.getElementById("saveStatus");
  if(msg) msg.textContent="Gordeta ✓  " + new Date().toLocaleString();
}
function mlabDeleteRecord(){
  const id=mlabActivityId();
  if(!id || !confirm("Jarduera honen jarraipena ezabatu?")) return;
  const data=mlabLoadAll(); delete data.records[id]; mlabSaveAll(data);
  document.getElementById("trackingForm")?.reset();
  const msg=document.getElementById("saveStatus"); if(msg) msg.textContent="Jarraipena ezabatu da.";
}
function mlabBackup(){
  const data=mlabLoadAll();
  const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});
  const a=document.createElement("a");
  a.href=URL.createObjectURL(blob);
  a.download="matematikako-laborategia-jarraipena.json";
  a.click(); URL.revokeObjectURL(a.href);
}
function mlabRestore(input){
  const file=input.files && input.files[0]; if(!file) return;
  const reader=new FileReader();
  reader.onload=()=>{
    try{
      const data=JSON.parse(reader.result);
      if(!data || data.version!==1 || typeof data.records!=="object") throw new Error();
      if(confirm("Babeskopiak nabigatzaile honetan gordetako jarraipena ordezkatuko du. Jarraitu?")){
        mlabSaveAll(data); location.reload();
      }
    }catch(e){ alert("Ezin izan da babeskopia irakurri."); }
  };
  reader.readAsText(file); input.value="";
}
document.addEventListener("DOMContentLoaded",()=>{
  const form=document.getElementById("trackingForm");
  if(form){ form.addEventListener("submit",mlabSaveForm); mlabLoadForm(); }
});


// ===== v0.6 STABLE TRACKING =====
const MLAB_RECORD_KEY = "mlab_tracking_record_v1";

function mlabReadOwnRecord(){
  try{
    const raw=localStorage.getItem(MLAB_RECORD_KEY);
    return raw ? JSON.parse(raw) : null;
  }catch(e){ return null; }
}
function mlabWriteOwnRecord(record){
  localStorage.setItem(MLAB_RECORD_KEY, JSON.stringify(record));
}
function mlabDeleteOwnRecord(){
  localStorage.removeItem(MLAB_RECORD_KEY);
}
function mlabLoadTrackingForm(){
  const form=document.getElementById("trackingForm");
  if(!form) return;
  const r=mlabReadOwnRecord();
  if(!r) return;
  ["date","sessions","rating","studentResponse","worked","difficulties","changes","nextYear","repeat"].forEach(k=>{
    if(form.elements[k] && r[k]!==undefined) form.elements[k].value=r[k];
  });
  const s=document.getElementById("saveStatus");
  if(s) s.textContent="Aurretik gordetako jarraipena kargatu da.";
}
function mlabSaveTrackingForm(ev){
  ev.preventDefault();
  const form=ev.currentTarget;
  const record={
    activityId:document.body.dataset.activityId || "",
    activityName:document.body.dataset.activityName || "",
    activityType:document.body.dataset.activityType || "",
    date:form.elements.date.value,
    sessions:form.elements.sessions.value,
    rating:form.elements.rating.value,
    studentResponse:form.elements.studentResponse.value,
    worked:form.elements.worked.value,
    difficulties:form.elements.difficulties.value,
    changes:form.elements.changes.value,
    nextYear:form.elements.nextYear.value,
    repeat:form.elements.repeat.value,
    savedAt:new Date().toISOString()
  };
  mlabWriteOwnRecord(record);
  const s=document.getElementById("saveStatus");
  if(s) s.textContent="Gordeta ✓ " + new Date().toLocaleString();
}
function mlabDeleteTracking(){
  if(!confirm("Jarduera honen jarraipena ezabatu?")) return;
  mlabDeleteOwnRecord();
  document.getElementById("trackingForm")?.reset();
  const s=document.getElementById("saveStatus");
  if(s) s.textContent="Jarraipena ezabatu da.";
}
function printTeacher(){
  document.body.classList.remove("print-student");
  document.body.classList.add("print-teacher");
  window.print();
  setTimeout(()=>document.body.classList.remove("print-teacher"),300);
}
function printStudent(){
  document.body.classList.remove("print-teacher");
  document.body.classList.add("print-student");
  window.print();
  setTimeout(()=>document.body.classList.remove("print-student"),300);
}

/* Bridge for file:// pages.
   Each activity owns its localStorage. The annual page loads hidden iframes
   and asks each one for its persistent record. */
window.addEventListener("message", ev=>{
  const d=ev.data || {};
  if(d.type==="MLAB_GET_RECORD"){
    ev.source?.postMessage({
      type:"MLAB_RECORD",
      requestId:d.requestId,
      activityId:document.body.dataset.activityId || "",
      record:mlabReadOwnRecord()
    },"*");
  }
  if(d.type==="MLAB_SET_RECORD"){
    if(d.record) mlabWriteOwnRecord(d.record); else mlabDeleteOwnRecord();
    ev.source?.postMessage({
      type:"MLAB_SET_ACK",
      requestId:d.requestId,
      activityId:document.body.dataset.activityId || ""
    },"*");
  }
});

document.addEventListener("DOMContentLoaded",()=>{
  const form=document.getElementById("trackingForm");
  if(form){
    form.addEventListener("submit",mlabSaveTrackingForm);
    mlabLoadTrackingForm();
  }
});


// v0.6.1: open native date picker when clicking anywhere on date field
document.addEventListener("DOMContentLoaded",()=>{
  document.querySelectorAll('input[type="date"]').forEach(el=>{
    el.addEventListener("click",()=>{
      if(typeof el.showPicker==="function"){
        try{ el.showPicker(); }catch(e){}
      }
    });
    el.addEventListener("focus",()=>{
      if(typeof el.showPicker==="function"){
        try{ el.showPicker(); }catch(e){}
      }
    });
  });
});
