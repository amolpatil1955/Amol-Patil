import { useState, useEffect, useRef } from "react";
import * as THREE from "three";

/* ============================================================
   LIGHT THEME  •  WHITE + BLUE  •  MERN STACK PORTFOLIO
   Profile = animated SVG code-typing illustration
   ============================================================ */

// ─── DATA ───────────────────────────────────────────────────

const NAV = ["Home","About","Skills","Projects","Experience","Contact"];

const SKILLS = {
  Frontend:[
    {name:"React.js",     pct:95, icon:"fab fa-react",          c:"#2563EB"},
    {name:"Next.js",      pct:90, icon:"fas fa-code",            c:"#1D4ED8"},
    {name:"TypeScript",   pct:88, icon:"fas fa-file-code",       c:"#3B82F6"},
    {name:"Tailwind CSS", pct:92, icon:"fab fa-css3-alt",        c:"#0EA5E9"},
    {name:"Three.js",     pct:80, icon:"fas fa-cube",            c:"#6366F1"},
    {name:"Redux",        pct:85, icon:"fas fa-layer-group",     c:"#7C3AED"},
  ],
  Backend:[
    {name:"Node.js",      pct:93, icon:"fab fa-node-js",         c:"#16A34A"},
    {name:"Express.js",   pct:90, icon:"fas fa-server",          c:"#2563EB"},
    {name:"REST APIs",    pct:95, icon:"fas fa-plug",            c:"#0284C7"},
    {name:"GraphQL",      pct:82, icon:"fas fa-project-diagram", c:"#DB2777"},
    {name:"WebSockets",   pct:78, icon:"fas fa-wifi",            c:"#0891B2"},
    {name:"JWT Auth",     pct:88, icon:"fas fa-shield-alt",      c:"#D97706"},
  ],
  Database:[
    {name:"MongoDB",      pct:92, icon:"fas fa-leaf",            c:"#16A34A"},
    {name:"PostgreSQL",   pct:85, icon:"fas fa-database",        c:"#2563EB"},
    {name:"Redis",        pct:78, icon:"fas fa-bolt",            c:"#DC2626"},
    {name:"Mongoose",     pct:90, icon:"fas fa-sitemap",         c:"#7C3AED"},
    {name:"Firebase",     pct:83, icon:"fas fa-fire",            c:"#D97706"},
    {name:"Elasticsearch",pct:72, icon:"fas fa-search",          c:"#0891B2"},
  ],
  DevOps:[
    {name:"Docker",       pct:85, icon:"fab fa-docker",          c:"#2563EB"},
    {name:"AWS",          pct:80, icon:"fab fa-aws",             c:"#D97706"},
    {name:"CI/CD",        pct:82, icon:"fas fa-infinity",        c:"#6366F1"},
    {name:"Git & GitHub", pct:95, icon:"fab fa-github",          c:"#1F2937"},
    {name:"Linux",        pct:88, icon:"fab fa-linux",           c:"#374151"},
    {name:"Nginx",        pct:78, icon:"fas fa-network-wired",   c:"#16A34A"},
  ],
};

const PROJECTS = [
title: "Readly.in The ",
    subtitle: "Full-Stack Blogs Website ",
    desc: "The is Blogs website Daily New Blogs by Authors and Millions Of readers.",
    tech: ["React", "Node.js", "MongoDB", "three.js", "express"],
    color: "#2563EB",
    accent: "#EFF6FF",
    icon: "fas fa-shopping-cart",
    github: "https://github.com/amolpatil1955/Readly.in",
    live: "https://readly-in-fronted.onrender.com/",
    stats: { stars: 340, forks: 89, views: "12K" },
    featured: true,
       // {title:"ChatSphere",  subtitle:"Real-Time Chat App",     desc:"Scalable chat platform with WebSocket integration, E2E encryption, WebRTC video calling, group management and file sharing. Handles 10K+ concurrent users with zero downtime.",tech:["React","Socket.io","Node.js","MongoDB","WebRTC"],accent:"#6366F1",icon:"fas fa-comments",stats:{stars:520,forks:134,views:"18K"},featured:true},
  // {title:"DevBoard",    subtitle:"Project Management SaaS",desc:"Jira-like project tool with Kanban boards, sprint planning, burndown charts, GitHub integration and automated deployment tracking for agile development teams.",tech:["Next.js","Express","PostgreSQL","GraphQL","Docker"],accent:"#7C3AED",icon:"fas fa-tasks",stats:{stars:280,forks:67,views:"9K"},featured:false},
  // {title:"AiNotes",    subtitle:"AI Note Taking App",      desc:"Smart note-taking with GPT-4 integration, semantic search, auto-tagging, mind-map visualization, markdown support and intelligent summarization of long documents.",tech:["React","Node.js","MongoDB","OpenAI","Langchain"],accent:"#0EA5E9",icon:"fas fa-brain",stats:{stars:410,forks:102,views:"15K"},featured:true},
  // {title:"FinTrack Pro",subtitle:"Finance Dashboard",      desc:"Comprehensive finance tracker with bank API integration, automated categorization, portfolio tracking, budget alerts and predictive analytics with beautiful data visualizations.",tech:["React","Express","MongoDB","Chart.js","Plaid"],accent:"#16A34A",icon:"fas fa-chart-line",stats:{stars:195,forks:48,views:"7K"},featured:false},
  // {title:"CryptoVault", subtitle:"Crypto Portfolio",       desc:"Real-time crypto management with live price feeds, DeFi protocol integration, NFT tracking, tax loss harvesting suggestions and automated trading bots.",tech:["React","Node.js","WebSockets","MongoDB","Web3.js"],accent:"#D97706",icon:"fab fa-bitcoin",stats:{stars:620,forks:178,views:"22K"},featured:false},
];

const EXP = [

  {
    role: "Full-Stack Developer | Intern",
    company: "GM INFOTECH PVT LTD",
    period: "Dec 2025 – Jan 2026",
    type: "Full-Time ",
    desc: "Developed a production-ready Age Verification Popup (AVP) Shopify plugin using the MERN stack, enabling seamless integration for online stores  Engineered a secure pay-to-use plugin system, allowing merchants to install and manage the extension efficiently.– Built a dynamic admin dashboard with customizable popup settings, improving merchant control and usability.– Implemented an analytics module with interactive graphs to track visitor verification data and user behavior",
    achievements: [
      "React.js",
      "MongoDB",
      "Node.js",
      "Express.js",
      "Shopify API",
      "React Polarise",
    ],
    color: "#2563EB",
    icon: "fas fa-rocket",
  },

];

const STATS_DATA = [
  {val:"5+", label:"Years Experience",  icon:"fas fa-calendar-alt"},
  {val:"80+",label:"Projects Completed",icon:"fas fa-project-diagram"},
  {val:"50+",label:"Happy Clients",     icon:"fas fa-smile"},
  {val:"2M+",label:"Users Served",      icon:"fas fa-users"},
];

// ─── HOOKS ──────────────────────────────────────────────────

function useReveal(t=0.12){
  const ref=useRef(null); const [v,sv]=useState(false);
  useEffect(()=>{
    const o=new IntersectionObserver(([e])=>{if(e.isIntersecting)sv(true);},{threshold:t});
    if(ref.current)o.observe(ref.current);
    return ()=>o.disconnect();
  },[]);
  return [ref,v];
}

// ─── ANIMATED SVG CODE-TYPING PROFILE ───────────────────────

function CodeAvatar(){
  const lines=[
    {txt:"const developer = {",  color:"#1D4ED8", indent:0},
    {txt:'  name: "Alex Johnson",', color:"#059669", indent:0},
    {txt:'  role: "MERN Expert",',  color:"#059669", indent:0},
    {txt:"  skills: [",           color:"#1D4ED8", indent:0},
    {txt:'    "React", "Node",',  color:"#D97706", indent:0},
    {txt:'    "MongoDB","Express"',color:"#D97706", indent:0},
    {txt:"  ],",                  color:"#1D4ED8", indent:0},
    {txt:"  passion: true,",      color:"#7C3AED", indent:0},
    {txt:"  available: true",     color:"#059669", indent:0},
    {txt:"};",                    color:"#1D4ED8", indent:0},
    {txt:"",                      color:"transparent", indent:0},
    {txt:"developer.build()",     color:"#2563EB", indent:0},
    {txt:"  .then(launch) 🚀",    color:"#059669", indent:0},
  ];
  const [shown,setShown]=useState(0);
  const [charIdx,setCharIdx]=useState(0);
  const [linesDone,setLinesDone]=useState([]);

  useEffect(()=>{
    if(shown>=lines.length)return;
    const cur=lines[shown].txt;
    if(charIdx<cur.length){
      const t=setTimeout(()=>setCharIdx(c=>c+1),38+Math.random()*25);
      return ()=>clearTimeout(t);
    } else {
      const t=setTimeout(()=>{
        setLinesDone(d=>[...d,{...lines[shown],txt:cur}]);
        setShown(s=>s+1);
        setCharIdx(0);
      },90);
      return ()=>clearTimeout(t);
    }
  },[shown,charIdx]);

  const curLine=shown<lines.length?lines[shown]:null;

  return(
    <div style={{width:"100%",maxWidth:420,background:"#F8FAFF",border:"1.5px solid #E2E8F0",borderRadius:20,overflow:"hidden",boxShadow:"0 20px 60px rgba(37,99,235,0.12), 0 4px 20px rgba(0,0,0,0.06)"}}>
      {/* Window bar */}
      <div style={{background:"#F1F5F9",borderBottom:"1px solid #E2E8F0",padding:"0.75rem 1rem",display:"flex",alignItems:"center",gap:"0.5rem"}}>
        {["#EF4444","#F59E0B","#22C55E"].map(c=><div key={c} style={{width:11,height:11,borderRadius:"50%",background:c}}/>)}
        <span style={{marginLeft:"0.5rem",fontSize:"0.72rem",color:"#94A3B8",fontFamily:"'JetBrains Mono',monospace",fontWeight:600}}>developer.js</span>
        <div style={{marginLeft:"auto",display:"flex",gap:"0.3rem"}}>
          {["fas fa-code-branch","fas fa-check-circle"].map(ic=><i key={ic} className={ic} style={{color:"#CBD5E1",fontSize:"0.7rem"}}/>)}
        </div>
      </div>
      {/* Code area */}
      <div style={{padding:"1.25rem 1.25rem 1rem",minHeight:240,fontFamily:"'JetBrains Mono',monospace",fontSize:"0.78rem",lineHeight:1.75,position:"relative"}}>
        {/* Line numbers */}
        <div style={{position:"absolute",left:0,top:"1.25rem",bottom:"1rem",width:32,textAlign:"right",paddingRight:6,color:"#CBD5E1",fontSize:"0.68rem",lineHeight:1.75,userSelect:"none"}}>
          {Array.from({length:linesDone.length+(curLine?1:0)},(_,i)=><div key={i}>{i+1}</div>)}
        </div>
        <div style={{marginLeft:36}}>
          {linesDone.map((l,i)=>(
            <div key={i} style={{color:l.color,minHeight:"1.3em"}}>
              {l.txt||"\u00A0"}
            </div>
          ))}
          {curLine&&(
            <div style={{color:curLine.color,display:"flex",alignItems:"center",minHeight:"1.3em"}}>
              {lines[shown].txt.slice(0,charIdx)}
              <span style={{display:"inline-block",width:2,height:"1em",background:"#2563EB",marginLeft:1,animation:"cursorBlink 1s step-end infinite"}}/>
            </div>
          )}
        </div>
      </div>
      {/* Status bar */}
      <div style={{background:"#2563EB",padding:"0.3rem 1rem",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <span style={{fontSize:"0.65rem",color:"rgba(255,255,255,0.8)",fontFamily:"'JetBrains Mono',monospace",fontWeight:600}}>✓ JavaScript  •  UTF-8</span>
        <span style={{fontSize:"0.65rem",color:"rgba(255,255,255,0.7)",fontFamily:"'JetBrains Mono',monospace"}}>Ln {Math.min(shown+1,lines.length)}, Col {charIdx+1}</span>
      </div>
    </div>
  );
}

// ─── ANIMATED HERO BLOB / FLOATING SHAPES ───────────────────

function HeroBlob(){
  return(
    <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none",zIndex:0}}>
      {/* Large soft blob top-right */}
      <div style={{position:"absolute",top:"-15%",right:"-10%",width:600,height:600,borderRadius:"50%",background:"radial-gradient(circle,rgba(37,99,235,0.07) 0%,transparent 70%)",animation:"blobFloat 8s ease-in-out infinite"}}/>
      {/* Small blob bottom-left */}
      <div style={{position:"absolute",bottom:"5%",left:"-8%",width:380,height:380,borderRadius:"50%",background:"radial-gradient(circle,rgba(99,102,241,0.06) 0%,transparent 70%)",animation:"blobFloat 10s ease-in-out infinite reverse"}}/>
      {/* Dot grid */}
      <svg style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",opacity:0.4}} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" fill="#BFDBFE"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)"/>
      </svg>
      {/* Floating tech icons */}
      {[
        {icon:"fab fa-react",  top:"18%",left:"6%", color:"#61DAFB",size:26,dur:5},
        {icon:"fab fa-node-js",top:"65%",left:"4%", color:"#8CC84B",size:22,dur:7},
        {icon:"fas fa-leaf",   top:"25%",right:"5%",color:"#4DB33D",size:20,dur:6},
        {icon:"fas fa-database",top:"70%",right:"6%",color:"#6366F1",size:22,dur:8},
        {icon:"fab fa-js",     top:"45%",left:"2%", color:"#F7DF1E",size:20,dur:9},
        {icon:"fab fa-docker", top:"50%",right:"3%",color:"#2496ED",size:22,dur:6.5},
      ].map((f,i)=>(
        <div key={i} style={{position:"absolute",top:f.top,left:f.left||undefined,right:f.right||undefined,animation:`floatIcon ${f.dur}s ease-in-out infinite ${i*0.8}s`,opacity:0.55}}>
          <div style={{width:44,height:44,background:"#fff",borderRadius:12,boxShadow:"0 4px 16px rgba(37,99,235,0.1)",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <i className={f.icon} style={{fontSize:f.size,color:f.color}}/>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── THREE.JS SECTION DIVIDER ───────────────────────────────

function ThreeWave(){
  const ref=useRef(null);
  useEffect(()=>{
    const w=ref.current.offsetWidth,h=120;
    const scene=new THREE.Scene();
    const cam=new THREE.OrthographicCamera(-w/2,w/2,h/2,-h/2,0.1,100);
    cam.position.z=10;
    const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true});
    renderer.setSize(w,h);
    renderer.setClearColor(0xffffff,0);
    ref.current.appendChild(renderer.domElement);
    const N=120;
    const pts=[];
    for(let i=0;i<N;i++){pts.push(new THREE.Vector3((i/(N-1))*w-w/2,0,0));}
    const geo=new THREE.BufferGeometry().setFromPoints(pts);
    const mat=new THREE.LineBasicMaterial({color:0x3B82F6,transparent:true,opacity:0.35});
    const lines2=[];
    for(let j=0;j<4;j++){
      const g=geo.clone();
      const m=new THREE.Line(g,new THREE.LineBasicMaterial({color:[0x3B82F6,0x6366F1,0x0EA5E9,0x93C5FD][j],transparent:true,opacity:0.25-j*0.04}));
      scene.add(m);lines2.push({mesh:m,off:j*0.8,amp:18-j*3,freq:0.012+j*0.003});
    }
    let t2=0,af;
    const tick=()=>{
      af=requestAnimationFrame(tick);t2+=0.018;
      lines2.forEach(({mesh,off,amp,freq})=>{
        const pos=mesh.geometry.attributes.position;
        for(let i=0;i<N;i++){
          pos.setY(i,Math.sin(i*freq+t2+off)*amp);
        }
        pos.needsUpdate=true;
      });
      renderer.render(scene,cam);
    };
    tick();
    return()=>{cancelAnimationFrame(af);if(ref.current?.contains(renderer.domElement))ref.current.removeChild(renderer.domElement);renderer.dispose();};
  },[]);
  return <div ref={ref} style={{width:"100%",height:120,overflow:"hidden"}}/>;
}

// ─── TYPEWRITER ──────────────────────────────────────────────

function TW({words}){
  const [txt,st]=useState(""); const [wi,sw]=useState(0); const [ci,sc]=useState(0); const [dl,sd]=useState(false);
  useEffect(()=>{
    const w=words[wi],sp=dl?50:100;
    const t=setTimeout(()=>{
      if(!dl){st(w.slice(0,ci+1));ci+1===w.length?setTimeout(()=>sd(true),1900):sc(ci+1);}
      else{st(w.slice(0,ci-1));ci-1===0?(sd(false),sw((wi+1)%words.length),sc(0)):sc(ci-1);}
    },sp);
    return()=>clearTimeout(t);
  },[ci,dl,wi]);
  return<span style={{color:"#2563EB"}}>{txt}<span style={{animation:"cursorBlink 1s step-end infinite",color:"#2563EB"}}>|</span></span>;
}

// ─── SKILL BAR ───────────────────────────────────────────────

function SkBar({name,pct,icon,c,delay}){
  const [a,sa]=useState(false); const [ref,v]=useReveal(0.2);
  useEffect(()=>{if(v)setTimeout(()=>sa(true),delay);},[v]);
  return(
    <div ref={ref} style={{opacity:v?1:0,transform:v?"translateX(0)":"translateX(-12px)",transition:`opacity .5s ${delay}ms,transform .5s ${delay}ms`}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:"0.38rem"}}>
        <span style={{display:"flex",alignItems:"center",gap:"0.45rem",fontSize:"0.84rem",fontWeight:700,color:"#1E293B"}}>
          <i className={icon} style={{color:c,fontSize:"0.82rem",width:14}}/>{name}
        </span>
        <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"0.76rem",fontWeight:700,color:c}}>{pct}%</span>
      </div>
      <div style={{height:7,borderRadius:4,background:"#EFF6FF",overflow:"hidden",border:"1px solid #DBEAFE"}}>
        <div style={{height:"100%",borderRadius:4,background:`linear-gradient(90deg,${c}BB,${c})`,width:a?`${pct}%`:"0%",transition:"width 1.3s cubic-bezier(.4,0,.2,1)",boxShadow:`0 2px 8px ${c}44`}}/>
      </div>
    </div>
  );
}

// ─── STAT CARD ───────────────────────────────────────────────

function StatCard({s,i}){
  const [ref,v]=useReveal(0.2);
  return(
    <div ref={ref}
      style={{textAlign:"center",padding:"2rem 1rem",background:"#fff",border:"1.5px solid #E2E8F0",borderRadius:18,position:"relative",overflow:"hidden",transition:`all .6s cubic-bezier(.4,0,.2,1) ${i*90}ms`,opacity:v?1:0,transform:v?"translateY(0)":"translateY(20px)",boxShadow:"0 4px 20px rgba(37,99,235,0.06)",cursor:"default"}}
      onMouseEnter={e=>{e.currentTarget.style.borderColor="#BFDBFE";e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 12px 32px rgba(37,99,235,0.12)";}}
      onMouseLeave={e=>{e.currentTarget.style.borderColor="#E2E8F0";e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 4px 20px rgba(37,99,235,0.06)";}}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:"linear-gradient(90deg,#3B82F6,#6366F1)"}}/>
      <div style={{fontSize:"1.5rem",marginBottom:"0.65rem",color:"#2563EB"}}><i className={s.icon}/></div>
      <div style={{fontFamily:"'Syne',sans-serif",fontSize:"2.4rem",fontWeight:800,background:"linear-gradient(135deg,#1D4ED8,#6366F1)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",lineHeight:1,marginBottom:"0.38rem"}}>{s.val}</div>
      <div style={{fontSize:"0.72rem",color:"#64748B",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em"}}>{s.label}</div>
    </div>
  );
}

// ─── PROJECT CARD ────────────────────────────────────────────

function ProjCard({p,index}){
  const [h,sh]=useState(false); const [ref,v]=useReveal(0.08);
  return(
    <div ref={ref} onMouseEnter={()=>sh(true)} onMouseLeave={()=>sh(false)}
      style={{background:h?"#fff":"#FAFCFF",border:`1.5px solid ${h?"#BFDBFE":"#E2E8F0"}`,borderRadius:20,padding:"1.6rem",position:"relative",overflow:"hidden",cursor:"default",transition:"all .3s cubic-bezier(.4,0,.2,1)",transform:v?(h?"translateY(-5px)":"translateY(0)"):"translateY(24px)",opacity:v?1:0,transitionDelay:v?`${index*80}ms`:"0ms",boxShadow:h?"0 20px 48px rgba(37,99,235,0.13), 0 4px 16px rgba(0,0,0,0.04)":"0 2px 12px rgba(0,0,0,0.04)"}}>
      {/* Top color line */}
      <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:p.accent,opacity:h?1:0.4,transition:"opacity .3s"}}/>
      {p.featured&&<div style={{position:"absolute",top:"1rem",right:"1rem",background:`${p.accent}14`,border:`1px solid ${p.accent}44`,borderRadius:20,padding:"0.18rem 0.6rem",fontSize:"0.67rem",fontWeight:700,color:p.accent,letterSpacing:"0.06em"}}>★ Featured</div>}
      <div style={{width:46,height:46,borderRadius:13,background:`${p.accent}12`,border:`1.5px solid ${p.accent}30`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"1rem"}}>
        <i className={p.icon} style={{color:p.accent,fontSize:"1.1rem"}}/>
      </div>
      <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:"1.18rem",fontWeight:800,color:"#0F172A",marginBottom:"0.18rem",letterSpacing:"-0.01em"}}>{p.title}</h3>
      <p style={{fontSize:"0.7rem",color:"#94A3B8",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"0.7rem",fontFamily:"'JetBrains Mono',monospace"}}>{p.subtitle}</p>
      <p style={{fontSize:"0.86rem",color:"#475569",lineHeight:1.75,marginBottom:"0.9rem"}}>{p.desc}</p>
      <div style={{display:"flex",gap:"1.1rem",marginBottom:"0.9rem"}}>
        {[["fas fa-star","#D97706",p.stats.stars],["fas fa-code-branch",p.accent,p.stats.forks],["fas fa-eye","#94A3B8",p.stats.views]].map(([ic,cl,vl])=>(
          <span key={ic} style={{fontSize:"0.75rem",color:"#94A3B8",display:"flex",alignItems:"center",gap:"0.28rem",fontFamily:"'JetBrains Mono',monospace"}}><i className={ic} style={{color:cl}}/>{vl}</span>
        ))}
      </div>
      <div style={{display:"flex",flexWrap:"wrap",gap:"0.32rem",marginBottom:"1.25rem"}}>
        {p.tech.map(t=><span key={t} style={{padding:"0.22rem 0.62rem",fontSize:"0.69rem",fontWeight:700,borderRadius:6,border:`1px solid ${p.accent}30`,color:p.accent,fontFamily:"'JetBrains Mono',monospace",background:`${p.accent}08`}}>{t}</span>)}
      </div>
      <div style={{display:"flex",gap:"0.6rem"}}>
        <a href="#" style={{padding:"0.46rem 0.95rem",borderRadius:9,border:"1.5px solid #E2E8F0",color:"#475569",fontSize:"0.78rem",fontWeight:700,textDecoration:"none",display:"flex",alignItems:"center",gap:"0.32rem",transition:"all .2s",fontFamily:"'DM Sans',sans-serif"}}
          onMouseEnter={e=>{e.currentTarget.style.borderColor="#BFDBFE";e.currentTarget.style.color="#2563EB";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="#E2E8F0";e.currentTarget.style.color="#475569";}}>
          <i className="fab fa-github"/>Code
        </a>
        <a href="#" style={{padding:"0.46rem 0.95rem",borderRadius:9,background:p.accent,color:"#fff",fontSize:"0.78rem",fontWeight:700,textDecoration:"none",display:"flex",alignItems:"center",gap:"0.32rem",transition:"opacity .2s",fontFamily:"'DM Sans',sans-serif"}}
          onMouseEnter={e=>e.currentTarget.style.opacity="0.85"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
          <i className="fas fa-external-link-alt"/>Live Demo
        </a>
      </div>
    </div>
  );
}

// ─── EXP CARD ────────────────────────────────────────────────

function ExpCard({e,i}){
  const [ref,v]=useReveal(0.1);
  return(
    <div ref={ref} style={{display:"grid",gridTemplateColumns:"auto 1fr",gap:"0 1.25rem",marginBottom:"1.4rem",opacity:v?1:0,transform:v?"translateX(0)":"translateX(-20px)",transition:`all .56s cubic-bezier(.4,0,.2,1) ${i*110}ms`}}>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
        <div style={{width:40,height:40,borderRadius:12,background:`${e.accent}14`,border:`1.5px solid ${e.accent}50`,display:"flex",alignItems:"center",justifyContent:"center",color:e.accent,fontSize:"0.95rem",flexShrink:0}}><i className={e.icon}/></div>
        {i<EXP.length-1&&<div style={{flex:1,width:2,background:`linear-gradient(${e.accent}55,transparent)`,marginTop:6,minHeight:32}}/>}
      </div>
      <div style={{background:"#fff",border:"1.5px solid #E2E8F0",borderRadius:18,padding:"1.5rem",boxShadow:"0 2px 12px rgba(0,0,0,0.04)"}}>
        <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:"0.65rem",marginBottom:"0.7rem"}}>
          <div>
            <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:"1.08rem",fontWeight:800,color:e.accent,letterSpacing:"-0.01em",marginBottom:"0.16rem"}}>{e.role}</h3>
            <p style={{fontSize:"0.86rem",color:"#64748B",fontWeight:600}}>{e.company}</p>
          </div>
          <div style={{textAlign:"right"}}>
            <span style={{display:"block",fontFamily:"'JetBrains Mono',monospace",fontSize:"0.72rem",color:"#94A3B8",marginBottom:"0.3rem"}}><i className="fas fa-calendar" style={{marginRight:"0.3rem"}}/>{e.period}</span>
            <span style={{fontSize:"0.67rem",fontWeight:700,padding:"0.16rem 0.55rem",borderRadius:20,background:"#F1F5F9",color:"#64748B",textTransform:"uppercase",letterSpacing:"0.08em"}}>{e.type}</span>
          </div>
        </div>
        <p style={{fontSize:"0.86rem",color:"#475569",lineHeight:1.8,marginBottom:"0.9rem"}}>{e.desc}</p>
        <div style={{display:"flex",flexWrap:"wrap",gap:"0.4rem"}}>
          {e.wins.map(w=><span key={w} style={{padding:"0.26rem 0.72rem",border:`1px solid ${e.accent}35`,borderRadius:20,fontSize:"0.72rem",fontWeight:700,color:e.accent,display:"flex",alignItems:"center",gap:"0.28rem",fontFamily:"'JetBrains Mono',monospace",background:`${e.accent}07`}}><i className="fas fa-check-circle"/>{w}</span>)}
        </div>
      </div>
    </div>
  );
}

// ─── SECTION HEADER ──────────────────────────────────────────

function SecHead({tag,title,sub}){
  const [ref,v]=useReveal(0.3);
  return(
    <div ref={ref} style={{textAlign:"center",marginBottom:"3.2rem",opacity:v?1:0,transform:v?"translateY(0)":"translateY(22px)",transition:"all .65s cubic-bezier(.4,0,.2,1)"}}>
      <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"0.7rem",fontWeight:600,color:"#3B82F6",letterSpacing:"0.25em",textTransform:"uppercase",display:"block",marginBottom:"0.65rem"}}>{tag}</span>
      <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(1.9rem,4vw,2.9rem)",fontWeight:800,letterSpacing:"-0.03em",color:"#0F172A",marginBottom:"0.75rem",lineHeight:1.1}}>{title}</h2>
      {sub&&<p style={{color:"#64748B",fontSize:"0.95rem",maxWidth:440,margin:"0 auto 1.1rem",lineHeight:1.8}}>{sub}</p>}
      <div style={{display:"flex",justifyContent:"center"}}>
        <div style={{width:44,height:3,background:"linear-gradient(90deg,#2563EB,#6366F1)",borderRadius:2}}/>
      </div>
    </div>
  );
}

// ─── LOADER ──────────────────────────────────────────────────

function Loader({onDone}){
  const [pct,sp]=useState(0);
  useEffect(()=>{
    let v=0;
    const t=setInterval(()=>{
      v+=Math.random()*7+2;
      if(v>=100){v=100;clearInterval(t);setTimeout(onDone,500);}
      sp(Math.floor(Math.min(v,100)));
    },55);
    return()=>clearInterval(t);
  },[]);
  return(
    <div style={{position:"fixed",inset:0,background:"linear-gradient(135deg,#EFF6FF 0%,#F0F4FF 50%,#EFF6FF 100%)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:99999,flexDirection:"column",gap:"1.6rem"}}>
      <div style={{fontFamily:"'Syne',sans-serif",fontSize:"4.5rem",fontWeight:800,letterSpacing:"-0.04em",lineHeight:1}}>
        {["M","E","R","N"].map((l,i)=><span key={l} style={{color:["#2563EB","#6366F1","#0EA5E9","#0F172A"][i]}}>{l}</span>)}
      </div>
      <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"0.72rem",letterSpacing:"0.38em",color:"#94A3B8",textTransform:"uppercase"}}>Alex Johnson · Portfolio</div>
      <div style={{width:280,height:3,background:"#E2E8F0",borderRadius:2,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(90deg,#2563EB,#6366F1,#0EA5E9)",width:`${pct}%`,transition:"width .05s linear",borderRadius:2,boxShadow:"0 0 12px rgba(37,99,235,0.4)"}}/>
      </div>
      <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"0.74rem",color:"#94A3B8",letterSpacing:"0.08em"}}>{pct}% — {pct<30?"Initializing…":pct<65?"Loading portfolio…":pct<90?"Rendering…":"Welcome!"}</div>
    </div>
  );
}

// ─── CURSOR ──────────────────────────────────────────────────

function Cursor(){
  const dot=useRef(null),ring=useRef(null),rp=useRef({x:0,y:0}),dp=useRef({x:0,y:0});
  useEffect(()=>{
    const mv=e=>{dp.current={x:e.clientX,y:e.clientY};if(dot.current)dot.current.style.transform=`translate(${e.clientX}px,${e.clientY}px)`;};
    window.addEventListener("mousemove",mv);
    let af;
    const lp=()=>{rp.current.x+=(dp.current.x-rp.current.x)*.1;rp.current.y+=(dp.current.y-rp.current.y)*.1;if(ring.current)ring.current.style.transform=`translate(${rp.current.x}px,${rp.current.y}px)`;af=requestAnimationFrame(lp);};
    lp();
    return()=>{window.removeEventListener("mousemove",mv);cancelAnimationFrame(af);};
  },[]);
  return(<>
    <div ref={dot}  style={{position:"fixed",top:-5,left:-5,width:10,height:10,borderRadius:"50%",background:"#2563EB",pointerEvents:"none",zIndex:9999,willChange:"transform"}}/>
    <div ref={ring} style={{position:"fixed",top:-18,left:-18,width:36,height:36,borderRadius:"50%",border:"1.5px solid rgba(37,99,235,0.4)",pointerEvents:"none",zIndex:9998,willChange:"transform"}}/>
  </>);
}

// ─── MAIN ────────────────────────────────────────────────────

export default function Portfolio(){
  const [loaded,sl]=useState(false);
  const [sy,sSy]=useState(0);
  const [aN,sAN]=useState("Home");
  const [mOpen,sMO]=useState(false);
  const [sTab,sST]=useState("Frontend");
  const [form,sF]=useState({name:"",email:"",subject:"",message:""});
  const [fSt,sFSt]=useState("");

  useEffect(()=>{
    const fn=()=>{
      sSy(window.scrollY);
      NAV.forEach(n=>{const el=document.getElementById(n.toLowerCase());if(el&&window.scrollY>=el.offsetTop-130)sAN(n);});
    };
    window.addEventListener("scroll",fn);
    return()=>window.removeEventListener("scroll",fn);
  },[]);

  const go=id=>{document.getElementById(id.toLowerCase())?.scrollIntoView({behavior:"smooth"});sMO(false);};
  const submit=e=>{e.preventDefault();sFSt("sending");setTimeout(()=>{sFSt("sent");sF({name:"",email:"",subject:"",message:""});},2000);};

  const BP={padding:"0.78rem 1.75rem",background:"linear-gradient(135deg,#2563EB,#6366F1)",color:"#fff",border:"none",borderRadius:10,fontWeight:800,fontSize:"0.88rem",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",letterSpacing:"0.02em",display:"inline-flex",alignItems:"center",gap:"0.42rem",transition:"all .24s",boxShadow:"0 6px 20px rgba(37,99,235,0.25)",textDecoration:"none"};
  const BO={padding:"0.78rem 1.75rem",background:"#fff",border:"1.5px solid #E2E8F0",color:"#374151",borderRadius:10,fontWeight:700,fontSize:"0.88rem",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",letterSpacing:"0.02em",display:"inline-flex",alignItems:"center",gap:"0.42rem",transition:"all .24s",textDecoration:"none",boxShadow:"0 2px 8px rgba(0,0,0,0.04)"};
  const IN={width:"100%",background:"#F8FAFF",border:"1.5px solid #E2E8F0",borderRadius:10,color:"#0F172A",fontFamily:"'DM Sans',sans-serif",fontSize:"0.9rem",fontWeight:500,padding:"0.72rem 0.95rem",outline:"none",transition:"all .2s"};
  const LB={display:"block",fontSize:"0.7rem",fontWeight:700,color:"#64748B",marginBottom:"0.42rem",textTransform:"uppercase",letterSpacing:"0.12em",fontFamily:"'JetBrains Mono',monospace"};

  if(!loaded)return<Loader onDone={()=>sl(true)}/>;

  return(<>
    {/* FONTS + FA */}
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""/>
    <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"/>

    <style>{`
      *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
      html{scroll-behavior:smooth}
      body{font-family:'DM Sans',sans-serif;background:#F8FAFF;color:#0F172A;overflow-x:hidden;cursor:none;min-height:100vh;}
      ::-webkit-scrollbar{width:3px}
      ::-webkit-scrollbar-track{background:#F1F5F9}
      ::-webkit-scrollbar-thumb{background:linear-gradient(#2563EB,#6366F1);border-radius:2px}
      @keyframes cursorBlink{50%{opacity:0}}
      @keyframes blobFloat{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-18px) scale(1.03)}}
      @keyframes floatIcon{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-10px) rotate(4deg)}}
      @keyframes spin{to{transform:rotate(360deg)}}
      @keyframes pulse{0%,100%{opacity:.6}50%{opacity:1}}
      @keyframes slideUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
      section{position:relative}
      .C{max-width:1160px;margin:0 auto;padding:0 2rem}
      @media(max-width:960px){.hg{grid-template-columns:1fr!important}.hav{display:none!important}.ag{grid-template-columns:1fr!important}.cg{grid-template-columns:1fr!important}}
      @media(max-width:768px){.dn{display:none!important}.hb{display:flex!important}.sg{grid-template-columns:repeat(2,1fr)!important}.skg{grid-template-columns:1fr!important}}
      @media(max-width:600px){.pg{grid-template-columns:1fr!important}.fr{grid-template-columns:1fr!important}}
    `}</style>

    <Cursor/>

    {/* ═══ NAVBAR ═══════════════════════════════════════════════ */}
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:1000,height:66,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 2.5rem",background:sy>20?"rgba(248,250,255,0.94)":"transparent",backdropFilter:sy>20?"blur(20px)":"none",borderBottom:sy>20?"1px solid rgba(226,232,240,0.8)":"none",transition:"all .3s"}}>
      <div onClick={()=>go("home")} style={{fontFamily:"'Syne',sans-serif",fontSize:"1.45rem",fontWeight:800,color:"#0F172A",cursor:"pointer",letterSpacing:"-0.02em"}}>
        Alex<span style={{color:"#2563EB"}}>.</span>dev
      </div>
      <ul className="dn" style={{display:"flex",gap:"0.1rem",listStyle:"none"}}>
        {NAV.map(n=>(
          <li key={n} onClick={()=>go(n)} style={{padding:"0.42rem 0.9rem",fontSize:"0.85rem",fontWeight:600,color:aN===n?"#2563EB":"#475569",cursor:"pointer",borderRadius:8,transition:"all .2s",background:aN===n?"rgba(37,99,235,0.06)":"transparent"}}>
            {n}
          </li>
        ))}
      </ul>
      <div style={{display:"flex",gap:"0.75rem",alignItems:"center"}}>
        <button onClick={()=>go("contact")} style={{...BP,padding:"0.52rem 1.15rem",fontSize:"0.82rem"}} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-1px)"} onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
          <i className="fas fa-paper-plane"/>Hire Me
        </button>
        <div className="hb" onClick={()=>sMO(!mOpen)} style={{display:"none",flexDirection:"column",gap:5,cursor:"pointer"}}>
          {[0,1,2].map(i=><span key={i} style={{width:22,height:2,background:"#475569",display:"block",borderRadius:1}}/>)}
        </div>
      </div>
    </nav>

    {/* Mobile menu */}
    <div style={{position:"fixed",inset:0,background:"rgba(248,250,255,0.97)",backdropFilter:"blur(20px)",zIndex:999,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"1.8rem",opacity:mOpen?1:0,pointerEvents:mOpen?"all":"none",transition:"opacity .3s"}}>
      <div onClick={()=>sMO(false)} style={{position:"absolute",top:"1.5rem",right:"2rem",color:"#94A3B8",fontSize:"1.4rem",cursor:"pointer"}}><i className="fas fa-times"/></div>
      {NAV.map(n=><div key={n} onClick={()=>go(n)} style={{fontFamily:"'Syne',sans-serif",fontSize:"2rem",fontWeight:800,color:"#475569",cursor:"pointer",transition:"color .2s"}} onMouseEnter={e=>e.currentTarget.style.color="#2563EB"} onMouseLeave={e=>e.currentTarget.style.color="#475569"}>{n}</div>)}
    </div>

    {/* ═══ HERO ══════════════════════════════════════════════════ */}
    <section id="home" style={{minHeight:"100vh",display:"flex",alignItems:"center",paddingTop:66,position:"relative",background:"linear-gradient(160deg,#EFF6FF 0%,#F8FAFF 45%,#F0F4FF 100%)"}}>
      <HeroBlob/>
      <div className="C hg" style={{width:"100%",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"3rem",alignItems:"center",position:"relative",zIndex:1}}>

        {/* LEFT */}
        <div style={{animation:"slideUp .8s ease both"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:"0.55rem",background:"rgba(37,99,235,0.08)",border:"1px solid rgba(37,99,235,0.18)",borderRadius:20,padding:"0.35rem 1rem",marginBottom:"1.4rem"}}>
            <span style={{width:7,height:7,borderRadius:"50%",background:"#22C55E",boxShadow:"0 0 8px #22C55E",animation:"pulse 1.5s ease infinite",display:"inline-block"}}/>
            <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"0.72rem",fontWeight:700,color:"#2563EB",letterSpacing:"0.12em"}}>AVAILABLE FOR WORK</span>
          </div>

          <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(2.8rem,6vw,5.2rem)",fontWeight:800,lineHeight:1.0,letterSpacing:"-0.04em",color:"#0F172A",marginBottom:"0.9rem"}}>
            Alex<br/>
            <span style={{background:"linear-gradient(135deg,#2563EB 0%,#6366F1 60%,#0EA5E9 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Johnson</span>
          </h1>

          <div style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(1.1rem,2.2vw,1.6rem)",fontWeight:700,color:"#475569",marginBottom:"1.4rem",minHeight:"2rem"}}>
            <TW words={["MERN Stack Developer","Full-Stack Engineer","MongoDB Expert","React Architect","Node.js Developer","Cloud Solutions Architect"]}/>
          </div>

          <p style={{fontSize:"0.97rem",color:"#64748B",lineHeight:1.88,maxWidth:500,marginBottom:"2.2rem",fontWeight:400}}>
            Crafting high-performance, scalable web applications with the MERN stack. Transforming complex problems into elegant digital experiences that serve{" "}
            <strong style={{color:"#1D4ED8",fontWeight:700}}>millions of users</strong> worldwide.
          </p>

          <div style={{display:"flex",gap:"0.75rem",flexWrap:"wrap",marginBottom:"2.2rem"}}>
            <button onClick={()=>go("projects")} style={BP} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 12px 28px rgba(37,99,235,0.35)";}} onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 6px 20px rgba(37,99,235,0.25)";}}>
              <i className="fas fa-rocket"/>View Projects
            </button>
            <button onClick={()=>go("contact")} style={BO} onMouseEnter={e=>{e.currentTarget.style.borderColor="#BFDBFE";e.currentTarget.style.color="#2563EB";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="#E2E8F0";e.currentTarget.style.color="#374151";}}>
              <i className="fas fa-envelope"/>Get In Touch
            </button>
            <a href="#" style={BO} onMouseEnter={e=>{e.currentTarget.style.borderColor="#BFDBFE";e.currentTarget.style.color="#2563EB";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="#E2E8F0";e.currentTarget.style.color="#374151";}}>
              <i className="fas fa-download"/>Download CV
            </a>
          </div>

          {/* Socials */}
          <div style={{display:"flex",gap:"0.5rem"}}>
            {[["fab fa-github","#0F172A"],["fab fa-linkedin","#0077B5"],["fab fa-twitter","#1DA1F2"],["fab fa-dev","#0F172A"],["fab fa-npm","#CC3534"]].map(([ic,hc])=>(
              <a key={ic} href="#" style={{width:40,height:40,background:"#fff",border:"1.5px solid #E2E8F0",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",color:"#64748B",fontSize:"0.9rem",textDecoration:"none",transition:"all .22s",boxShadow:"0 2px 8px rgba(0,0,0,0.04)"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="#BFDBFE";e.currentTarget.style.color=hc;e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 6px 16px rgba(37,99,235,0.12)";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="#E2E8F0";e.currentTarget.style.color="#64748B";e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 2px 8px rgba(0,0,0,0.04)";}}><i className={ic}/></a>
            ))}
          </div>

          {/* Mini stats */}
          <div style={{display:"flex",gap:"2.2rem",marginTop:"2.6rem",paddingTop:"1.8rem",borderTop:"1px solid #E2E8F0",flexWrap:"wrap"}}>
            {STATS_DATA.map(s=>(
              <div key={s.label}>
                <div style={{fontFamily:"'Syne',sans-serif",fontSize:"1.8rem",fontWeight:800,background:"linear-gradient(135deg,#1D4ED8,#6366F1)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",lineHeight:1}}>{s.val}</div>
                <div style={{fontSize:"0.68rem",color:"#94A3B8",fontWeight:700,marginTop:"0.15rem",textTransform:"uppercase",letterSpacing:"0.09em"}}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — animated code SVG avatar */}
        <div className="hav" style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"1.25rem",animation:"slideUp .9s .15s ease both"}}>
          <CodeAvatar/>

          {/* Floating badges below editor */}
          <div style={{display:"flex",gap:"0.75rem",flexWrap:"wrap",justifyContent:"center"}}>
            {[["fas fa-star","#D97706","4.9 / 5.0 Rating"],["fas fa-check-circle","#16A34A","100% Job Success"],["fas fa-bolt","#2563EB","Fast Delivery"]].map(([ic,cl,lb])=>(
              <div key={lb} style={{display:"flex",alignItems:"center",gap:"0.45rem",background:"#fff",border:"1.5px solid #E2E8F0",borderRadius:20,padding:"0.38rem 0.85rem",boxShadow:"0 2px 10px rgba(0,0,0,0.05)",fontSize:"0.76rem",fontWeight:700,color:"#374151"}}>
                <i className={ic} style={{color:cl,fontSize:"0.8rem"}}/>{lb}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div onClick={()=>go("about")} style={{position:"absolute",bottom:"2rem",left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:"0.38rem",cursor:"pointer",opacity:0.45}}>
        <span style={{fontSize:"0.65rem",letterSpacing:"0.18em",textTransform:"uppercase",fontFamily:"'JetBrains Mono',monospace",color:"#64748B"}}>Scroll</span>
        <div style={{width:22,height:22,border:"1.5px solid #CBD5E1",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",animation:"blobFloat 1.8s ease-in-out infinite"}}>
          <i className="fas fa-chevron-down" style={{fontSize:"0.55rem",color:"#64748B"}}/>
        </div>
      </div>
    </section>

    {/* Three.js wave divider */}
    <ThreeWave/>

    {/* ═══ ABOUT ════════════════════════════════════════════════ */}
    <section id="about" style={{padding:"6rem 0",background:"#fff"}}>
      <div className="C">
        <SecHead tag="// About Me" title="Who I Am" sub="A passionate engineer turning ideas into scalable digital solutions"/>
        <div className="ag" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4rem",alignItems:"center"}}>
          {/* Avatar panel */}
          <div style={{position:"relative"}}>
            <div style={{borderRadius:24,background:"linear-gradient(135deg,#EFF6FF,#F0F4FF)",border:"1.5px solid #DBEAFE",aspectRatio:"1",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden",boxShadow:"0 12px 40px rgba(37,99,235,0.08)"}}>
              {/* Animated SVG illustration */}
              <svg viewBox="0 0 320 320" style={{width:"80%",height:"80%"}} xmlns="http://www.w3.org/2000/svg">
                {/* Monitor */}
                <rect x="60" y="60" width="200" height="140" rx="12" fill="#fff" stroke="#DBEAFE" strokeWidth="2"/>
                <rect x="60" y="60" width="200" height="30" rx="12" fill="#EFF6FF"/>
                <rect x="60" y="90" width="200" height="2" fill="#E2E8F0"/>
                {/* Window dots */}
                <circle cx="78" cy="75" r="5" fill="#EF4444"/>
                <circle cx="94" cy="75" r="5" fill="#F59E0B"/>
                <circle cx="110" cy="75" r="5" fill="#22C55E"/>
                {/* Animated code lines */}
                <g fontFamily="monospace" fontSize="11">
                  <text x="75" y="115" fill="#2563EB" style={{animation:"pulse 2s ease infinite"}}>const dev = &#123;</text>
                  <text x="85" y="132" fill="#059669">  name: "Alex",</text>
                  <text x="85" y="149" fill="#7C3AED">  stack: "MERN",</text>
                  <text x="85" y="166" fill="#059669">  coffee: true</text>
                  <text x="75" y="183" fill="#2563EB">&#125;;</text>
                </g>
                {/* Cursor blink */}
                <rect x="120" y="175" width="2" height="11" fill="#2563EB" style={{animation:"cursorBlink 1s step-end infinite"}}/>
                {/* Stand */}
                <rect x="148" y="200" width="24" height="28" rx="4" fill="#DBEAFE"/>
                <rect x="120" y="226" width="80" height="8" rx="4" fill="#BFDBFE"/>
                {/* Keyboard */}
                <rect x="80" y="250" width="160" height="30" rx="6" fill="#EFF6FF" stroke="#DBEAFE" strokeWidth="1.5"/>
                {[0,1,2,3,4].map(i=>[0,1,2,3,4,5,6].map(j=>(
                  <rect key={`${i}${j}`} x={90+j*20} y={255+i*3.5} width="14" height="2.5" rx="1" fill="#BFDBFE"/>
                )))}
                {/* Floating elements */}
                <g style={{animation:"floatIcon 3s ease-in-out infinite"}}>
                  <rect x="18" y="80" width="36" height="36" rx="10" fill="#DBEAFE"/>
                  <text x="36" y="103" textAnchor="middle" fontSize="16">⚛</text>
                </g>
                <g style={{animation:"floatIcon 4s ease-in-out infinite .8s"}}>
                  <rect x="266" y="80" width="36" height="36" rx="10" fill="#D1FAE5"/>
                  <text x="284" y="103" textAnchor="middle" fontSize="16">🍃</text>
                </g>
                <g style={{animation:"floatIcon 3.5s ease-in-out infinite 0.4s"}}>
                  <rect x="18" y="185" width="36" height="36" rx="10" fill="#EDE9FE"/>
                  <text x="36" y="208" textAnchor="middle" fontSize="16">🚀</text>
                </g>
                <g style={{animation:"floatIcon 5s ease-in-out infinite 1.2s"}}>
                  <rect x="266" y="185" width="36" height="36" rx="10" fill="#FEF3C7"/>
                  <text x="284" y="208" textAnchor="middle" fontSize="16">⚡</text>
                </g>
              </svg>
            </div>
            <div style={{position:"absolute",bottom:-16,right:-16,width:130,height:130,borderRadius:16,border:"1.5px solid #DBEAFE",background:"rgba(239,246,255,0.5)",zIndex:-1}}/>
          </div>

          {/* Text */}
          <div>
            <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:"1.5rem",fontWeight:800,letterSpacing:"-0.02em",marginBottom:"1rem",lineHeight:1.3,color:"#0F172A"}}>
              Building the{" "}
              <span style={{background:"linear-gradient(135deg,#2563EB,#6366F1)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>future</span>
              {" "}of the web, one commit at a time.
            </h3>
            {["I'm a Senior Full-Stack Developer with 5+ years of experience specializing in the MERN stack. I architect and build enterprise-grade applications that handle massive scale — from initial design to cloud deployment.",
              "My expertise spans the full development lifecycle: crafting pixel-perfect React UIs, designing robust Node.js APIs, optimizing MongoDB databases, and setting up production-grade DevOps pipelines on AWS."
            ].map((t,i)=>(
              <p key={i} style={{color:"#475569",fontSize:"0.95rem",lineHeight:1.88,marginBottom:"0.85rem"}}>{t}</p>
            ))}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.65rem",margin:"1.6rem 0"}}>
              {[["fas fa-map-marker-alt","San Francisco, CA"],["fas fa-graduation-cap","B.Tech Computer Science"],["fas fa-briefcase","5+ Years Experience"],["fas fa-certificate","AWS Certified Developer"],["fas fa-globe","Available Worldwide"],["fas fa-language","English · Hindi · Spanish"]].map(([ic,tx])=>(
                <div key={tx} style={{display:"flex",alignItems:"center",gap:"0.55rem",fontSize:"0.85rem",color:"#475569",fontWeight:500}}>
                  <i className={ic} style={{color:"#3B82F6",fontSize:"0.78rem",width:13}}/>{tx}
                </div>
              ))}
            </div>
            <div style={{display:"flex",gap:"0.75rem",flexWrap:"wrap"}}>
              <button onClick={()=>go("contact")} style={BP} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"} onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}><i className="fas fa-envelope"/>Let's Talk</button>
              <button onClick={()=>go("projects")} style={BO} onMouseEnter={e=>{e.currentTarget.style.borderColor="#BFDBFE";e.currentTarget.style.color="#2563EB";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="#E2E8F0";e.currentTarget.style.color="#374151";}}><i className="fas fa-folder-open"/>My Work</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ═══ STATS STRIP ══════════════════════════════════════════ */}
    <section style={{padding:"3.5rem 0",background:"linear-gradient(135deg,#EFF6FF,#F0F4FF)",borderTop:"1px solid #E2E8F0",borderBottom:"1px solid #E2E8F0"}}>
      <div className="C">
        <div className="sg" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"1.25rem"}}>
          {STATS_DATA.map((s,i)=><StatCard key={s.label} s={s} i={i}/>)}
        </div>
      </div>
    </section>

    {/* ═══ SKILLS ═══════════════════════════════════════════════ */}
    <section id="skills" style={{padding:"6rem 0",background:"#fff"}}>
      <div className="C">
        <SecHead tag="// Tech Stack" title="Skills & Expertise" sub="My complete technical arsenal built through years of real-world engineering"/>
        {/* Tabs */}
        <div style={{display:"flex",gap:"0.42rem",justifyContent:"center",marginBottom:"2.8rem",flexWrap:"wrap"}}>
          {Object.keys(SKILLS).map(t=>(
            <button key={t} onClick={()=>sST(t)} style={{padding:"0.52rem 1.3rem",borderRadius:9,fontSize:"0.84rem",fontWeight:700,cursor:"pointer",border:"1.5px solid",borderColor:sTab===t?"#3B82F6":"#E2E8F0",background:sTab===t?"#EFF6FF":"#fff",color:sTab===t?"#2563EB":"#475569",transition:"all .2s",fontFamily:"'DM Sans',sans-serif",boxShadow:"0 2px 6px rgba(0,0,0,0.04)"}}>
              {t}
            </button>
          ))}
        </div>
        <div className="skg" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1.6rem 3rem"}}>
          {SKILLS[sTab].map((s,i)=><SkBar key={s.name} {...s} delay={i*72}/>)}
        </div>
        {/* Extra pills */}
        <div style={{marginTop:"3.5rem",paddingTop:"2.5rem",borderTop:"1px solid #F1F5F9"}}>
          <p style={{textAlign:"center",fontSize:"0.68rem",color:"#94A3B8",letterSpacing:"0.22em",textTransform:"uppercase",marginBottom:"1.5rem",fontFamily:"'JetBrains Mono',monospace"}}>Also experienced with</p>
          <div style={{display:"flex",flexWrap:"wrap",gap:"0.52rem",justifyContent:"center"}}>
            {["Python","Golang","Flutter","React Native","Kubernetes","Terraform","Jenkins","Kafka","Prisma","Jest","Cypress","Storybook","Vite","Webpack","Babel","Socket.io"].map(t=>(
              <span key={t} style={{padding:"0.3rem 0.82rem",background:"#F8FAFF",border:"1px solid #E2E8F0",borderRadius:8,fontSize:"0.74rem",color:"#64748B",fontWeight:600,fontFamily:"'JetBrains Mono',monospace"}}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Three.js wave divider */}
    <ThreeWave/>

    {/* ═══ PROJECTS ════════════════════════════════════════════ */}
    <section id="projects" style={{padding:"6rem 0",background:"linear-gradient(160deg,#F8FAFF,#EFF6FF 60%,#F8FAFF)"}}>
      <div className="C">
        <SecHead tag="// Portfolio" title="Featured Projects" sub="Real-world applications built with passion, precision, and production-grade quality"/>
        <div className="pg" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(340px,1fr))",gap:"1.2rem"}}>
          {PROJECTS.map((p,i)=><ProjCard key={p.title} p={p} index={i}/>)}
        </div>
        <div style={{textAlign:"center",marginTop:"2.8rem"}}>
          <a href="#" style={BO} onMouseEnter={e=>{e.currentTarget.style.borderColor="#BFDBFE";e.currentTarget.style.color="#2563EB";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="#E2E8F0";e.currentTarget.style.color="#374151";}}>
            <i className="fab fa-github"/>View All on GitHub
          </a>
        </div>
      </div>
    </section>

    {/* ═══ EXPERIENCE ══════════════════════════════════════════ */}
    <section id="experience" style={{padding:"6rem 0",background:"#fff"}}>
      <div className="C">
        <SecHead tag="// Work History" title="Experience" sub="A track record of delivering impactful solutions at scale"/>
        {EXP.map((e,i)=><ExpCard key={e.company} e={e} i={i}/>)}
      </div>
    </section>

    {/* Three.js wave divider */}
    <ThreeWave/>

    {/* ═══ CONTACT ═════════════════════════════════════════════ */}
    <section id="contact" style={{padding:"6rem 0",background:"linear-gradient(160deg,#EFF6FF,#F8FAFF 60%,#F0F4FF)"}}>
      <div className="C">
        <SecHead tag="// Say Hello" title="Get In Touch" sub="Ready to build something amazing together? Let's talk!"/>
        <div className="cg" style={{display:"grid",gridTemplateColumns:"1fr 1.38fr",gap:"3rem",alignItems:"start"}}>
          {/* Info */}
          <div>
            <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:"1.5rem",fontWeight:800,letterSpacing:"-0.02em",marginBottom:"0.9rem",lineHeight:1.3,color:"#0F172A"}}>
              Let's Create Something{" "}
              <span style={{background:"linear-gradient(135deg,#2563EB,#6366F1)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Extraordinary</span>
            </h3>
            <p style={{color:"#64748B",fontSize:"0.93rem",lineHeight:1.85,marginBottom:"1.8rem"}}>
              Whether you have a project in mind, want to collaborate, or just want to say hi — my inbox is always open. I typically respond within 24 hours.
            </p>
            <div style={{display:"flex",flexDirection:"column",gap:"0.65rem",marginBottom:"1.8rem"}}>
              {[["fas fa-envelope","Email","alex@developer.com"],["fas fa-phone","Phone","+1 (555) 123-4567"],["fas fa-map-marker-alt","Location","San Francisco, CA"],["fas fa-clock","Availability","Mon–Fri, 9AM–6PM PST"]].map(([ic,lb,vl])=>(
                <div key={lb} style={{display:"flex",alignItems:"center",gap:"0.8rem",padding:"0.8rem 1rem",background:"#fff",border:"1.5px solid #E2E8F0",borderRadius:13,transition:"all .22s",cursor:"default",boxShadow:"0 2px 8px rgba(0,0,0,0.03)"}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor="#BFDBFE";e.currentTarget.style.transform="translateX(4px)";e.currentTarget.style.boxShadow="0 4px 16px rgba(37,99,235,0.1)";}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor="#E2E8F0";e.currentTarget.style.transform="translateX(0)";e.currentTarget.style.boxShadow="0 2px 8px rgba(0,0,0,0.03)";}}>
                  <div style={{width:36,height:36,borderRadius:10,background:"#EFF6FF",display:"flex",alignItems:"center",justifyContent:"center",color:"#2563EB",flexShrink:0,fontSize:"0.88rem"}}><i className={ic}/></div>
                  <div>
                    <div style={{fontSize:"0.66rem",color:"#94A3B8",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.12em",fontFamily:"'JetBrains Mono',monospace"}}>{lb}</div>
                    <div style={{fontSize:"0.88rem",color:"#1E293B",fontWeight:600}}>{vl}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{display:"flex",gap:"0.55rem"}}>
              {[["fab fa-github","#0F172A"],["fab fa-linkedin","#0077B5"],["fab fa-twitter","#1DA1F2"],["fab fa-dev","#0F172A"],["fab fa-youtube","#FF0000"]].map(([ic,hc])=>(
                <a key={ic} href="#" style={{width:42,height:42,background:"#fff",border:"1.5px solid #E2E8F0",borderRadius:11,display:"flex",alignItems:"center",justifyContent:"center",color:"#64748B",fontSize:"0.92rem",textDecoration:"none",transition:"all .22s",boxShadow:"0 2px 8px rgba(0,0,0,0.04)"}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor="#BFDBFE";e.currentTarget.style.color=hc;e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 6px 16px rgba(37,99,235,0.12)";}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor="#E2E8F0";e.currentTarget.style.color="#64748B";e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 2px 8px rgba(0,0,0,0.04)";}}><i className={ic}/></a>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={submit} style={{background:"#fff",border:"1.5px solid #E2E8F0",borderRadius:22,padding:"2.2rem",boxShadow:"0 8px 32px rgba(37,99,235,0.07)"}}>
            <div className="fr" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.9rem"}}>
              {[["name","text","Your Name","John Doe"],["email","email","Email Address","john@example.com"]].map(([fd,tp,lb,ph])=>(
                <div key={fd}>
                  <label style={LB}>{lb}</label>
                  <input type={tp} required placeholder={ph} value={form[fd]} onChange={e=>sF({...form,[fd]:e.target.value})} style={IN}
                    onFocus={e=>{e.target.style.borderColor="#3B82F6";e.target.style.boxShadow="0 0 0 3px rgba(59,130,246,0.1)";e.target.style.background="#fff";}}
                    onBlur={e=>{e.target.style.borderColor="#E2E8F0";e.target.style.boxShadow="none";e.target.style.background="#F8FAFF";}}/>
                </div>
              ))}
            </div>
            <div style={{marginTop:"0.9rem"}}>
              <label style={LB}>Subject</label>
              <input type="text" required placeholder="Project Collaboration" value={form.subject} onChange={e=>sF({...form,subject:e.target.value})} style={IN}
                onFocus={e=>{e.target.style.borderColor="#3B82F6";e.target.style.boxShadow="0 0 0 3px rgba(59,130,246,0.1)";e.target.style.background="#fff";}}
                onBlur={e=>{e.target.style.borderColor="#E2E8F0";e.target.style.boxShadow="none";e.target.style.background="#F8FAFF";}}/>
            </div>
            <div style={{marginTop:"0.9rem"}}>
              <label style={LB}>Message</label>
              <textarea required placeholder="Tell me about your project, goals, and timeline…" value={form.message} onChange={e=>sF({...form,message:e.target.value})} style={{...IN,resize:"vertical",minHeight:118}}
                onFocus={e=>{e.target.style.borderColor="#3B82F6";e.target.style.boxShadow="0 0 0 3px rgba(59,130,246,0.1)";e.target.style.background="#fff";}}
                onBlur={e=>{e.target.style.borderColor="#E2E8F0";e.target.style.boxShadow="none";e.target.style.background="#F8FAFF";}}/>
            </div>
            <button type="submit" disabled={fSt==="sending"} style={{...BP,width:"100%",marginTop:"1.1rem",justifyContent:"center",opacity:fSt==="sending"?0.72:1}}
              onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"} onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
              {fSt==="sending"?<><i className="fas fa-spinner fa-spin"/>Sending…</>:<><i className="fas fa-paper-plane"/>Send Message</>}
            </button>
            {fSt==="sent"&&(
              <div style={{marginTop:"0.9rem",padding:"0.85rem",textAlign:"center",background:"#F0FDF4",border:"1px solid #BBF7D0",borderRadius:10,color:"#16A34A",fontWeight:700,fontSize:"0.88rem"}}>
                <i className="fas fa-check-circle" style={{marginRight:"0.4rem"}}/>Message sent! I'll be in touch soon.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>

    {/* ═══ FOOTER ═══════════════════════════════════════════════ */}
    <footer style={{padding:"2.2rem 0",background:"#fff",borderTop:"1px solid #E2E8F0"}}>
      <div className="C" style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"1rem"}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:"1.28rem",fontWeight:800,color:"#0F172A"}}>
          Alex<span style={{color:"#2563EB"}}>.</span>dev
        </div>
        <p style={{fontSize:"0.8rem",color:"#94A3B8"}}>
          © 2024 Alex Johnson · Built with <span style={{color:"#2563EB"}}>♥</span> using MERN Stack &amp; Three.js
        </p>
        <div style={{display:"flex",gap:"1.2rem"}}>
          {["Privacy","Terms","Sitemap"].map(l=>(
            <a key={l} href="#" style={{fontSize:"0.8rem",color:"#94A3B8",textDecoration:"none",transition:"color .2s"}}
              onMouseEnter={e=>e.currentTarget.style.color="#2563EB"} onMouseLeave={e=>e.currentTarget.style.color="#94A3B8"}>{l}</a>
          ))}
        </div>
      </div>
    </footer>

    {/* Back to top */}
    {sy>400&&(
      <button onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} style={{position:"fixed",bottom:"2rem",right:"2rem",width:42,height:42,background:"linear-gradient(135deg,#2563EB,#6366F1)",border:"none",borderRadius:12,color:"#fff",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.88rem",boxShadow:"0 6px 20px rgba(37,99,235,0.3)",transition:"all .22s",zIndex:500}}
        onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 10px 28px rgba(37,99,235,0.4)";}}
        onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 6px 20px rgba(37,99,235,0.3)";}}>
        <i className="fas fa-chevron-up"/>
      </button>
    )}
  </>);
}
