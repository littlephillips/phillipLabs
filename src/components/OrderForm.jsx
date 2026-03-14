import { useState } from "react";
import { PACKAGES, waMsg } from "../data/constants";

const inp = {
  width:"100%", background:"var(--bg)", border:"1px solid var(--border)",
  borderRadius:12, padding:"12px 14px",
  fontSize:"var(--fs-14)", color:"var(--text-1)",
  fontFamily:"var(--font)", outline:"none",
  boxSizing:"border-box", transition:"border-color 0.3s, box-shadow 0.3s",
};
const lbl = {
  fontFamily:"var(--font-mono)", fontSize:"var(--fs-10)",
  letterSpacing:"0.22em", textTransform:"uppercase",
  color:"var(--text-3)", display:"block", marginBottom:7,
};

export default function OrderForm() {
  const [form,setForm]=useState({name:"",business:"",package:"Bronze",details:""});
  const set=k=>e=>setForm({...form,[k]:e.target.value});

  const send=()=>{
    if(!form.name||!form.business){alert("Please fill your name and business name.");return;}
    const msg=`Hi Phillip!\n\nI'd like to order a website.\n\nName: ${form.name}\nBusiness: ${form.business}\nPackage: ${form.package}\nDetails: ${form.details||"Not specified"}`;
    window.open(waMsg(msg),"_blank");
  };

  const WaIcon=({size=15})=>(
    <svg width={size} height={size} viewBox="0 0 175.216 175.552" fill="currentColor">
      <path d="M87.6 0C39.3 0 0 39.3 0 87.6c0 15.5 4.1 30.2 11.3 43L0 175.6l46.5-11.2c12.4 6.5 26.5 10.2 41.1 10.2 48.3 0 87.6-39.3 87.6-87.6C175.2 39.3 135.9 0 87.6 0zm0 160.3c-13.6 0-26.4-3.7-37.3-10.2l-2.7-1.6-27.7 7 7.3-26.9-1.7-2.8C18.7 115.2 15 101.7 15 87.6 15 47.5 47.5 15 87.6 15c40.1 0 72.6 32.5 72.6 72.6 0 40.1-32.5 72.7-72.6 72.7z"/>
      <path d="M127.8 105.7c-2.1-1-12.4-6.1-14.3-6.8-1.9-.7-3.3-1-4.7.9-1.4 1.9-5.4 6.8-6.6 8.2-1.2 1.4-2.4 1.6-4.5.5-2.1-1-8.8-3.2-16.8-10.3-6.2-5.5-10.4-12.3-11.6-14.4-1.2-2.1-.1-3.2.9-4.2.9-.9 2.1-2.4 3.1-3.6 1-1.2 1.4-2.1 2.1-3.5.7-1.4.4-2.6-.2-3.7-.5-1-4.7-11.3-6.4-15.5-1.7-4.1-3.4-3.5-4.7-3.6-.6-.1-2-.1-4-.1s-4.9.8-7 2.9c-2.1 2.1-8 7.8-8 19 0 11.2 8.1 22.1 9.3 23.6 1.2 1.5 15.9 24.3 38.6 34.1 5.4 2.3 9.6 3.7 12.9 4.7 5.4 1.7 10.3 1.5 14.2.9 4.3-.7 13.3-5.4 15.2-10.7 1.9-5.2 1.9-9.7 1.3-10.6-.5-.9-2-1.5-4.1-2.5z"/>
    </svg>
  );

  return (
    <div className="clay" style={{padding:"32px 28px"}}>
      <h3 style={{fontFamily:"var(--font)",fontWeight:800,fontSize:"var(--fs-20)",color:"var(--text-1)",marginBottom:6,letterSpacing:"-0.02em"}}>Quick Order via WhatsApp</h3>
      <p style={{fontSize:"var(--fs-14)",color:"var(--text-3)",marginBottom:28,lineHeight:1.7}}>Fill in the basics — straight to WhatsApp. No long forms.</p>

      <div style={{display:"flex",flexDirection:"column",gap:16}}>
        {[
          {k:"name",   label:"Your Name",     ph:"Jane Mwangi"},
          {k:"business",label:"Business Name", ph:"Mama's Kitchen"},
        ].map(({k,label,ph})=>(
          <div key={k}>
            <label style={lbl}>{label}</label>
            <input value={form[k]} onChange={set(k)} placeholder={ph} style={inp}
              onFocus={e=>{e.target.style.borderColor="var(--amber-bd)";e.target.style.boxShadow="0 0 0 3px var(--amber-dim)";}}
              onBlur={e=>{e.target.style.borderColor="var(--border)";e.target.style.boxShadow="none";}}/>
          </div>
        ))}
        <div>
          <label style={lbl}>Package</label>
          <select value={form.package} onChange={set("package")} style={{...inp,cursor:"pointer"}}
            onFocus={e=>{e.target.style.borderColor="var(--amber-bd)";}}
            onBlur={e=>{e.target.style.borderColor="var(--border)";}}>
            {PACKAGES.map(p=><option key={p.tier} value={p.tier}>{p.tier} — Ksh {p.price}</option>)}
          </select>
        </div>
        <div>
          <label style={lbl}>Project Details</label>
          <textarea value={form.details} onChange={set("details")} rows={4}
            placeholder="Describe your business, what you need, any specific features..."
            style={{...inp,resize:"vertical",lineHeight:1.7}}
            onFocus={e=>{e.target.style.borderColor="var(--amber-bd)";e.target.style.boxShadow="0 0 0 3px var(--amber-dim)";}}
            onBlur={e=>{e.target.style.borderColor="var(--border)";e.target.style.boxShadow="none";}}/>
        </div>
        <button onClick={send} className="clay-btn"
          style={{
            background:"var(--wa)",color:"#fff",
            padding:"14px 20px",fontSize:"var(--fs-16)",fontWeight:700,
            width:"100%",justifyContent:"center",marginTop:4,
          }}>
          <WaIcon size={16}/> Send via WhatsApp
        </button>
      </div>
    </div>
  );
}
