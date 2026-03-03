import React, { useState, useEffect, useRef, useCallback } from "react";
import * as THREE from "three";

// ============================================================
// MERN STACK PORTFOLIO - WHITE + LIGHT BLUE THEME
// ============================================================

const NAV_LINKS = [
  "Home",
  "About",
  "Skills",
  "Projects",
  "Experience",
  "Contact",
];

const SKILLS = {
  Frontend: [
    { name: "React.js", level: 95, icon: "fab fa-react", color: "#2563EB" },
    { name: "Next.js", level: 90, icon: "fas fa-code", color: "#1D4ED8" },
    { name: "TypeScript", level: 88, icon: "fas fa-file-code", color: "#3B82F6" },
    { name: "Tailwind CSS", level: 92, icon: "fab fa-css3-alt", color: "#0EA5E9" },
    { name: "Three.js", level: 80, icon: "fas fa-cube", color: "#6366F1" },
    { name: "Redux", level: 85, icon: "fas fa-layer-group", color: "#7C3AED" },
  ],
  Backend: [
    { name: "Node.js", level: 93, icon: "fab fa-node-js", color: "#16A34A" },
    { name: "Express.js", level: 90, icon: "fas fa-server", color: "#2563EB" },
    { name: "REST APIs", level: 95, icon: "fas fa-plug", color: "#0284C7" },
    { name: "GraphQL", level: 82, icon: "fas fa-project-diagram", color: "#DB2777" },
    { name: "WebSockets", level: 78, icon: "fas fa-wifi", color: "#0891B2" },
    { name: "JWT Auth", level: 88, icon: "fas fa-shield-alt", color: "#D97706" },
  ],
  Database: [
    { name: "MongoDB", level: 92, icon: "fas fa-leaf", color: "#16A34A" },
    { name: "PostgreSQL", level: 85, icon: "fas fa-database", color: "#2563EB" },
    { name: "Redis", level: 78, icon: "fas fa-bolt", color: "#DC2626" },
    { name: "Mongoose", level: 90, icon: "fas fa-sitemap", color: "#7C3AED" },
    { name: "Firebase", level: 83, icon: "fas fa-fire", color: "#D97706" },
    { name: "Elasticsearch", level: 72, icon: "fas fa-search", color: "#0891B2" },
  ],
  DevOps: [
    { name: "Docker", level: 85, icon: "fab fa-docker", color: "#2563EB" },
    { name: "AWS", level: 80, icon: "fab fa-aws", color: "#D97706" },
    { name: "CI/CD", level: 82, icon: "fas fa-infinity", color: "#6366F1" },
    { name: "Git & GitHub", level: 95, icon: "fab fa-github", color: "#1F2937" },
    { name: "Linux", level: 88, icon: "fab fa-linux", color: "#374151" },
    { name: "Nginx", level: 78, icon: "fas fa-network-wired", color: "#16A34A" },
  ],
};

const PROJECTS = [
  {
    title: "Readly.in The ",
    subtitle: "Full-Stack Blogs Website ",
    desc: "The is Blogs website Daily New Blogs by Authors and Millions Of readers.",
    tech: ["React", "Node.js", "MongoDB", "three.js", "express","", ],
    color: "#2563EB",
    accent: "#EFF6FF",
    icon: "fas fa-shopping-cart",
    github: "https://github.com/amolpatil1955/Readly.in",
    live: "https://readly-in-fronted.onrender.com/",
    stats: { stars: 340, forks: 89, views: "12K" },
    featured: true,
  },
  // {
  //   title: "ChatSphere",
  //   subtitle: "Real-Time Communication Platform",
  //   desc: "Scalable real-time chat app with WebSocket integration, end-to-end encryption, video calling via WebRTC, group management, file sharing, and push notifications. Handles 10K+ concurrent users.",
  //   tech: ["React", "Socket.io", "Node.js", "MongoDB", "WebRTC", "Redis"],
  //   color: "#6366F1",
  //   accent: "#EEF2FF",
  //   icon: "fas fa-comments",
  //   github: "#",
  //   live: "#",
  //   stats: { stars: 520, forks: 134, views: "18K" },
  //   featured: true,
  // },
  // {
  //   title: "DevBoard",
  //   subtitle: "Project Management SaaS",
  //   desc: "Jira-like project management tool with Kanban boards, sprint planning, burndown charts, team collaboration, GitHub integration, and automated deployment tracking.",
  //   tech: ["Next.js", "Express", "PostgreSQL", "GraphQL", "JWT", "Docker"],
  //   color: "#0891B2",
  //   accent: "#ECFEFF",
  //   icon: "fas fa-tasks",
  //   github: "#",
  //   live: "#",
  //   stats: { stars: 280, forks: 67, views: "9K" },
  //   featured: false,
  // },
  // {
  //   title: "AiNotes",
  //   subtitle: "AI-Powered Note Taking App",
  //   desc: "Smart note-taking with GPT-4 integration, semantic search, auto-tagging, mind map visualization, markdown support, and intelligent summarization of long documents.",
  //   tech: ["React", "Node.js", "MongoDB", "OpenAI API", "Langchain", "Pinecone"],
  //   color: "#7C3AED",
  //   accent: "#F5F3FF",
  //   icon: "fas fa-brain",
  //   github: "#",
  //   live: "#",
  //   stats: { stars: 410, forks: 102, views: "15K" },
  //   featured: true,
  // },
  // {
  //   title: "FinTrack Pro",
  //   subtitle: "Personal Finance Dashboard",
  //   desc: "Comprehensive finance tracker with bank API integration, automated categorization, investment portfolio tracking, budget alerts, tax report generation, and predictive analytics.",
  //   tech: ["React", "Express", "MongoDB", "Chart.js", "Plaid API", "Elasticsearch"],
  //   color: "#16A34A",
  //   accent: "#F0FDF4",
  //   icon: "fas fa-chart-line",
  //   github: "#",
  //   live: "#",
  //   stats: { stars: 195, forks: 48, views: "7K" },
  //   featured: false,
  // },
  // {
  //   title: "CryptoVault",
  //   subtitle: "Crypto Portfolio Tracker",
  //   desc: "Real-time cryptocurrency portfolio management with live price feeds, DeFi protocol integration, NFT tracking, tax loss harvesting suggestions, and automated trading bots.",
  //   tech: ["React", "Node.js", "WebSockets", "MongoDB", "CoinGecko API", "Web3.js"],
  //   color: "#D97706",
  //   accent: "#FFFBEB",
  //   icon: "fab fa-bitcoin",
  //   github: "#",
  //   live: "#",
  //   stats: { stars: 620, forks: 178, views: "22K" },
  //   featured: false,
  // },
];

const EXPERIENCE = [
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

const STATS = [
  { value: "1+", label: "Years Experience", icon: "fas fa-calendar-alt" },
  { value: "10+", label: "Projects Completed", icon: "fas fa-project-diagram" },
  { value: "5+", label: "Happy Clients", icon: "fas fa-smile" },
  { value: "50K+", label: "Users Served", icon: "fas fa-users" },
];

// ============================================================
// THREE.JS BACKGROUND COMPONENT
// ============================================================
function ThreeBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Particle system — soft blue palette for white bg
    const geo = new THREE.BufferGeometry();
    const count = 2000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const colorPalette = [
      [0.22, 0.60, 0.98],  // blue
      [0.37, 0.51, 0.96],  // indigo
      [0.74, 0.82, 0.99],  // light blue
      [0.06, 0.64, 0.87],  // sky
      [0.48, 0.39, 0.93],  // violet
    ];

    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 120;
      positions[i + 1] = (Math.random() - 0.5) * 120;
      positions[i + 2] = (Math.random() - 0.5) * 120;
      const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i] = c[0];
      colors[i + 1] = c[1];
      colors[i + 2] = c[2];
    }
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.16,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
    });
    const particles = new THREE.Points(geo, mat);
    scene.add(particles);

    // Floating geometric shapes — blue wireframe
    const shapes = [];
    const shapeGeos = [
      new THREE.OctahedronGeometry(1.5),
      new THREE.TetrahedronGeometry(1.2),
      new THREE.IcosahedronGeometry(1),
    ];
    const shapeMats = [
      new THREE.MeshBasicMaterial({ color: 0x3b82f6, wireframe: true, transparent: true, opacity: 0.18 }),
      new THREE.MeshBasicMaterial({ color: 0x6366f1, wireframe: true, transparent: true, opacity: 0.15 }),
      new THREE.MeshBasicMaterial({ color: 0x0ea5e9, wireframe: true, transparent: true, opacity: 0.12 }),
    ];

    for (let i = 0; i < 8; i++) {
      const idx = i % 3;
      const mesh = new THREE.Mesh(shapeGeos[idx], shapeMats[idx]);
      mesh.position.set(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 30,
      );
      mesh.userData = {
        rx: Math.random() * 0.005,
        ry: Math.random() * 0.005,
        rz: Math.random() * 0.003,
      };
      scene.add(mesh);
      shapes.push(mesh);
    }

    let mouseX = 0, mouseY = 0;
    const onMouse = (e) => {
      mouseX = (e.clientX / w - 0.5) * 0.3;
      mouseY = (e.clientY / h - 0.5) * 0.3;
    };
    window.addEventListener("mousemove", onMouse);

    let frame;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      particles.rotation.y += 0.0003;
      particles.rotation.x += 0.0001;
      shapes.forEach((s) => {
        s.rotation.x += s.userData.rx;
        s.rotation.y += s.userData.ry;
        s.rotation.z += s.userData.rz;
      });
      camera.position.x += (mouseX - camera.position.x) * 0.02;
      camera.position.y += (-mouseY - camera.position.y) * 0.02;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}

// ============================================================
// TYPEWRITER COMPONENT
// ============================================================
function Typewriter({ words }) {
  const [display, setDisplay] = useState("");
  const [wi, setWi] = useState(0);
  const [ci, setCi] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wi];
    const speed = deleting ? 60 : 110;
    const timer = setTimeout(() => {
      if (!deleting) {
        setDisplay(word.slice(0, ci + 1));
        if (ci + 1 === word.length) {
          setTimeout(() => setDeleting(true), 1800);
        } else {
          setCi(ci + 1);
        }
      } else {
        setDisplay(word.slice(0, ci - 1));
        if (ci - 1 === 0) {
          setDeleting(false);
          setWi((wi + 1) % words.length);
          setCi(0);
        } else {
          setCi(ci - 1);
        }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [ci, deleting, wi, words]);

  return (
    <span className="typewriter-text">
      {display}
      <span className="typewriter-cursor">|</span>
    </span>
  );
}

// ============================================================
// SKILL BAR COMPONENT
// ============================================================
function SkillBar({ name, level, icon, color, delay }) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setAnimated(true); },
      { threshold: 0.3 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="skill-bar-item" style={{ animationDelay: `${delay}ms` }}>
      <div className="skill-bar-header">
        <span className="skill-name">
          <i className={`${icon} skill-icon`} style={{ color }} />
          {name}
        </span>
        <span className="skill-level" style={{ color }}>{level}%</span>
      </div>
      <div className="skill-bar-track">
        <div
          className="skill-bar-fill"
          style={{
            width: animated ? `${level}%` : "0%",
            background: `linear-gradient(90deg, ${color}88, ${color})`,
            boxShadow: `0 0 10px ${color}44`,
            transition: "width 1.4s cubic-bezier(0.4,0,0.2,1)",
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

// ============================================================
// PROJECT CARD COMPONENT
// ============================================================
function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.1 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`project-card ${vis ? "visible" : ""} ${project.featured ? "featured" : ""}`}
      style={{
        "--card-color": project.color,
        "--card-accent": project.accent,
        animationDelay: `${index * 120}ms`,
        borderColor: hovered ? project.color : "#E2E8F0",
        boxShadow: hovered
          ? `0 20px 48px ${project.color}22, 0 4px 16px rgba(0,0,0,0.06)`
          : "0 2px 12px rgba(0,0,0,0.05)",
        background: hovered ? project.accent : "#ffffff",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {project.featured && <div className="featured-badge">⭐ Featured</div>}
      <div className="project-card-inner">
        <div
          className="project-icon-wrap"
          style={{
            background: `${project.color}15`,
            border: `1px solid ${project.color}44`,
          }}
        >
          <i className={project.icon} style={{ color: project.color, fontSize: "1.6rem" }} />
        </div>
        <h3 className="project-title" style={{ color: project.color }}>{project.title}</h3>
        <p className="project-subtitle">{project.subtitle}</p>
        <p className="project-desc">{project.desc}</p>
        <div className="project-stats">
          <span><i className="fas fa-star" style={{ color: "#D97706" }} /> {project.stats.stars}</span>
          <span><i className="fas fa-code-branch" style={{ color: project.color }} /> {project.stats.forks}</span>
          <span><i className="fas fa-eye" style={{ color: "#94A3B8" }} /> {project.stats.views}</span>
        </div>
        <div className="tech-tags">
          {project.tech.map((t) => (
            <span key={t} className="tech-tag" style={{ borderColor: `${project.color}44`, color: project.color }}>
              {t}
            </span>
          ))}
        </div>
        <div className="project-links">
          <a href={project.github} className="proj-btn" style={{ borderColor: project.color, color: project.color }}>
            <i className="fab fa-github" /> Code
          </a>
          <a href={project.live} className="proj-btn proj-btn-filled" style={{ background: project.color, color: "#fff" }}>
            <i className="fas fa-external-link-alt" /> Live Demo
          </a>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// EXPERIENCE CARD
// ============================================================
function ExperienceCard({ exp, index }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.1 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`exp-card ${vis ? "visible" : ""}`} style={{ animationDelay: `${index * 150}ms` }}>
      <div className="exp-line" style={{ background: exp.color }} />
      <div className="exp-icon" style={{ background: `${exp.color}18`, border: `2px solid ${exp.color}`, color: exp.color }}>
        <i className={exp.icon} />
      </div>
      <div className="exp-content">
        <div className="exp-header">
          <div>
            <h3 className="exp-role" style={{ color: exp.color }}>{exp.role}</h3>
            <p className="exp-company">{exp.company}</p>
          </div>
          <div className="exp-meta">
            <span className="exp-period"><i className="fas fa-calendar" /> {exp.period}</span>
            <span className="exp-type">{exp.type}</span>
          </div>
        </div>
        <p className="exp-desc">{exp.desc}</p>
        <div className="exp-achievements">
          {exp.achievements.map((a) => (
            <span key={a} className="achievement-tag" style={{ borderColor: `${exp.color}44`, color: exp.color }}>
              <i className="fas fa-check-circle" /> {a}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// LOADER COMPONENT
// ============================================================
function Loader({ onDone }) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    let v = 0;
    const t = setInterval(() => {
      v += Math.random() * 8 + 2;
      if (v >= 100) {
        v = 100;
        clearInterval(t);
        setTimeout(onDone, 500);
      }
      setPct(Math.min(Math.floor(v), 100));
    }, 60);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="loader-overlay">
      <div className="loader-content">
        <div className="loader-logo">
          <span className="loader-m">M</span>
          <span className="loader-e">E</span>
          <span className="loader-r">R</span>
          <span className="loader-n">N</span>
        </div>
        <div className="loader-name">AMOL PATIL ...</div>
        <div className="loader-bar-track">
          <div className="loader-bar-fill" style={{ width: `${pct}%` }} />
          <div className="loader-bar-glow" style={{ left: `${pct}%` }} />
        </div>
        <div className="loader-pct">{pct}%</div>
        <div className="loader-msg">
          {pct < 30 ? "Initializing systems..." : pct < 60 ? "Loading portfolio..." : pct < 90 ? "Rendering components..." : "Ready!"}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// CURSOR COMPONENT
// ============================================================
function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };
    window.addEventListener("mousemove", move);
    let af;
    const lerp = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      }
      af = requestAnimationFrame(lerp);
    };
    lerp();
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(af);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}

// ============================================================
// SECTION HEADER
// ============================================================
function SectionHeader({ tag, title, subtitle }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.3 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`section-header ${vis ? "visible" : ""}`}>
      <span className="section-tag">{tag}</span>
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
      <div className="section-line">
        <div className="section-line-inner" />
      </div>
    </div>
  );
}

// ============================================================
// MAIN PORTFOLIO APP
// ============================================================
export default function Portfolio() {
  const [loaded, setLoaded] = useState(false);
  const [activeNav, setActiveNav] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeSkillTab, setActiveSkillTab] = useState("Frontend");
  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [formStatus, setFormStatus] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
      const sections = NAV_LINKS.map((n) => document.getElementById(n.toLowerCase()));
      sections.forEach((s) => {
        if (s && window.scrollY >= s.offsetTop - 120)
          setActiveNav(s.id.charAt(0).toUpperCase() + s.id.slice(1));
      });
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleContact = (e) => {
    e.preventDefault();
    setFormStatus("sending");
    setTimeout(() => {
      setFormStatus("sent");
      setContactForm({ name: "", email: "", subject: "", message: "" });
    }, 2000);
  };

  if (!loaded) return <Loader onDone={() => setLoaded(true)} />;

  return (
    <>
      {/* ============================================================
          CSS STYLES — WHITE + LIGHTER BLUE THEME
          Same structure as original, all dark colors → light equivalents
      ============================================================ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          /* ── LIGHT THEME TOKENS ── */
          --bg:       #F8FAFF;
          --bg2:      #EFF6FF;
          --bg3:      #E8F0FE;
          --surface:  #FFFFFF;
          --surface2: #F1F5F9;
          --border:   #E2E8F0;
          --border2:  #BFDBFE;
          --text:     #0F172A;
          --text2:    #475569;
          --text3:    #94A3B8;

          /* ── ACCENT PALETTE ── */
          --blue:     #2563EB;
          --blue2:    #3B82F6;
          --blue3:    #BFDBFE;
          --indigo:   #6366F1;
          --sky:      #0EA5E9;

          --font-display: 'Syne', sans-serif;
          --font-body:    'Plus Jakarta Sans', sans-serif;
          --font-code:    'JetBrains Mono', monospace;
        }

        html { scroll-behavior: smooth; }
        body {
          font-family: var(--font-body);
          background: var(--bg);
          color: var(--text);
          overflow-x: hidden;
          cursor: none;
        }

        /* SCROLLBAR */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: var(--bg2); }
        ::-webkit-scrollbar-thumb { background: linear-gradient(var(--blue), var(--indigo)); border-radius: 2px; }

        /* CURSOR */
        .cursor-dot {
          position: fixed; top: -4px; left: -4px;
          width: 8px; height: 8px;
          background: var(--blue);
          border-radius: 50%;
          pointer-events: none; z-index: 9999;
          will-change: transform;
        }
        .cursor-ring {
          position: fixed; top: -16px; left: -16px;
          width: 32px; height: 32px;
          border: 1.5px solid rgba(37,99,235,0.45);
          border-radius: 50%;
          pointer-events: none; z-index: 9998;
          will-change: transform;
        }

        /* LOADER */
        .loader-overlay {
          position: fixed; inset: 0;
          background: linear-gradient(135deg, #EFF6FF 0%, #F8FAFF 50%, #EEF2FF 100%);
          display: flex; align-items: center; justify-content: center;
          height: 100vh; width: 100vw;
          z-index: 99999;
        }
        .loader-content { text-align: center; }
        .loader-logo {
          font-family: var(--font-display);
          font-size: 7rem; font-weight: 800;
          letter-spacing: -0.02em;
          margin-bottom: 0.5rem;
          filter: drop-shadow(0 4px 24px rgba(37,99,235,0.2));
        }
        .loader-m { color: #2563EB; }
        .loader-e { color: #6366F1; }
        .loader-r { color: #0EA5E9; }
        .loader-n { color: #0F172A; }
        .loader-name {
          font-family: var(--font-display);
          font-size: 1.1rem; font-weight: 600;
          color: var(--text3); letter-spacing: 0.4em;
          text-transform: uppercase; margin-bottom: 2.5rem;
        }
        .loader-bar-track {
          width: 320px; height: 4px;
          background: #DBEAFE;
          border-radius: 2px; position: relative;
          overflow: visible; margin: 0 auto 1rem;
        }
        .loader-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--blue), var(--indigo), var(--sky));
          border-radius: 2px;
          transition: width 0.05s linear;
          box-shadow: 0 0 14px rgba(37,99,235,0.5);
        }
        .loader-bar-glow {
          position: absolute; top: -4px;
          width: 12px; height: 12px;
          background: var(--blue);
          border-radius: 50%;
          transform: translateX(-50%);
          box-shadow: 0 0 18px var(--blue);
        }
        .loader-pct {
          font-family: var(--font-code);
          font-size: 1.1rem; font-weight: 700;
          color: var(--blue); margin-bottom: 0.5rem;
        }
        .loader-msg {
          font-size: 0.85rem; color: var(--text3);
          font-family: var(--font-code);
          letter-spacing: 0.1em;
        }

        /* NAVBAR */
        nav {
          position: fixed; top: 0; left: 0; right: 0;
          z-index: 1000;
          padding: 0 2rem;
          height: 70px;
          display: flex; align-items: center; justify-content: space-between;
          transition: all 0.3s ease;
          font-family: var(--font-body);
        }
        nav.scrolled {
          background: rgba(248,250,255,0.93);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border);
          box-shadow: 0 1px 20px rgba(37,99,235,0.07);
        }
        .nav-logo {
          font-family: var(--font-display);
          font-size: 1.6rem; font-weight: 800;
          color: var(--text); cursor: pointer;
          text-decoration: none;
          letter-spacing: -0.02em;
        }
        .nav-logo span { color: var(--blue); }
        .nav-links { display: flex; gap: 0.25rem; list-style: none; }
        @media (max-width: 768px) { .nav-links { display: none; } }
        .nav-link {
          padding: 0.5rem 1rem;
          font-size: 0.9rem; font-weight: 600;
          color: var(--text2);
          cursor: pointer; border-radius: 8px;
          transition: all 0.2s; letter-spacing: 0.02em;
          position: relative;
        }
        .nav-link:hover, .nav-link.active {
          color: var(--blue);
          background: rgba(37,99,235,0.07);
        }
        .nav-link.active::after {
          content: '';
          position: absolute; bottom: -2px; left: 50%; transform: translateX(-50%);
          width: 4px; height: 4px;
          background: var(--blue); border-radius: 50%;
        }
        .nav-cta {
          padding: 0.55rem 1.4rem;
          background: linear-gradient(135deg, var(--blue), var(--indigo));
          color: #fff; font-weight: 700;
          border-radius: 9px; cursor: pointer;
          font-size: 0.9rem; transition: all 0.25s;
          border: none; font-family: var(--font-body);
          letter-spacing: 0.02em;
          box-shadow: 0 4px 14px rgba(37,99,235,0.3);
        }
        .nav-cta:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(37,99,235,0.38); }

        /* HAMBURGER */
        .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; z-index: 1001; }
        @media (max-width: 768px) { .hamburger { display: flex; } }
        .hamburger span { display: block; width: 24px; height: 2px; background: var(--blue); border-radius: 2px; transition: all 0.3s; }
        .mobile-menu {
          position: fixed; inset: 0;
          background: rgba(248,250,255,0.97);
          backdrop-filter: blur(20px);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 2rem; z-index: 999;
          opacity: 0; pointer-events: none;
          transition: opacity 0.3s;
        }
        .mobile-menu.open { opacity: 1; pointer-events: all; }
        .mobile-menu-link {
          font-family: var(--font-display);
          font-size: 2.5rem; font-weight: 800;
          color: var(--text2); cursor: pointer;
          transition: color 0.2s;
        }
        .mobile-menu-link:hover { color: var(--blue); }

        /* MAIN LAYOUT */
        main { position: relative; z-index: 1; }
        section { position: relative; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }

        /* HERO */
        #home {
          min-height: 100vh;
          display: flex; align-items: center;
          padding-top: 70px;
          background: linear-gradient(160deg, #EFF6FF 0%, #F8FAFF 50%, #F0F4FF 100%);
        }
        .hero-inner {
          display: grid; grid-template-columns: 1fr auto;
          gap: 4rem; align-items: center;
          width: 100%;
        }
        @media (max-width: 900px) { .hero-inner { grid-template-columns: 1fr; } }
        .hero-greeting {
          font-family: var(--font-code);
          font-size: 1rem; font-weight: 500;
          color: var(--blue);
          letter-spacing: 0.15em;
          margin-bottom: 1.2rem;
          display: flex; align-items: center; gap: 0.75rem;
        }
        .hero-greeting::before {
          content: ''; display: block;
          width: 40px; height: 2px;
          background: linear-gradient(90deg, var(--blue), var(--indigo));
        }
        .hero-name {
          font-family: var(--font-display);
          font-size: clamp(3.5rem, 5vw, 6.5rem);
          font-weight: 800;
          line-height: 1.0;
          letter-spacing: -0.03em;
          margin-bottom: 1rem;
          color: var(--text);
        }
        .hero-name span {
          background: linear-gradient(135deg, #2563EB 0%, #6366F1 50%, #0EA5E9 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-role {
          font-family: var(--font-display);
          font-size: clamp(1.5rem, 3vw, 2.2rem);
          font-weight: 700;
          color: var(--text2);
          margin-bottom: 1.5rem;
          min-height: 2.6rem;
        }
        .typewriter-text { color: var(--blue); }
        .typewriter-cursor { color: var(--blue); animation: blink 1s step-end infinite; }
        @keyframes blink { 50% { opacity: 0; } }
        .hero-desc {
          font-size: 1.05rem; font-weight: 400;
          color: var(--text2);
          line-height: 1.8; max-width: 540px;
          margin-bottom: 2.5rem;
        }
        .hero-btns { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 3rem; }
        .btn-primary {
          padding: 0.85rem 2rem;
          background: linear-gradient(135deg, var(--blue), var(--indigo));
          color: #fff; font-weight: 800;
          border-radius: 10px; cursor: pointer;
          font-size: 0.95rem; border: none;
          font-family: var(--font-body);
          transition: all 0.25s; letter-spacing: 0.03em;
          display: flex; align-items: center; gap: 0.5rem;
          box-shadow: 0 4px 16px rgba(37,99,235,0.28);
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(37,99,235,0.4); }
        .btn-secondary {
          padding: 0.85rem 2rem;
          background: #fff;
          color: var(--text);
          border: 1.5px solid var(--border);
          border-radius: 10px; cursor: pointer;
          font-size: 0.95rem; font-weight: 700;
          font-family: var(--font-body);
          transition: all 0.25s; letter-spacing: 0.03em;
          display: flex; align-items: center; gap: 0.5rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        .btn-secondary:hover {
          border-color: var(--blue2);
          color: var(--blue);
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(37,99,235,0.12);
        }
        .hero-social { display: flex; gap: 1rem; }
        .social-icon {
          width: 42px; height: 42px;
          border: 1.5px solid var(--border);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          color: var(--text3); font-size: 1rem;
          cursor: pointer; transition: all 0.25s;
          text-decoration: none; background: #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.05);
        }
        .social-icon:hover {
          border-color: var(--blue2);
          color: var(--blue);
          background: rgba(37,99,235,0.06);
          transform: translateY(-3px);
          box-shadow: 0 6px 16px rgba(37,99,235,0.14);
        }
        .hero-avatar-wrap { position: relative; }
        .hero-avatar {
          width: 340px; height: 340px;
          border-radius: 50%;
          background: transparent;
          border: 2px solid var(--border2);
          display: flex; align-items: center; justify-content: center;
          position: relative; overflow: hidden;
          flex-shrink: 0;
          box-shadow: 0 20px 60px rgba(37,99,235,0.12);
        }
        @media (max-width: 900px) { .hero-avatar { width: 260px; height: 260px; } }
        .avatar-inner { width: 100%; height: 100%; }
        .hero-avatar::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(circle at 70% 30%, rgba(37,99,235,0.08), transparent 60%),
                      radial-gradient(circle at 30% 80%, rgba(99,102,241,0.06), transparent 60%);
        }
        .avatar-ring {
          position: absolute; border-radius: 50%;
          border: 1.5px solid rgba(37,99,235,0.2);
          animation: spin-ring linear infinite;
        }
        .avatar-ring-1 { width: 390px; height: 390px; top: -27px; left: -27px; animation-duration: 22s; }
        .avatar-ring-2 { width: 445px; height: 445px; top: -53px; left: -53px; animation-duration: 34s; animation-direction: reverse; border-color: rgba(99,102,241,0.14); }
        @keyframes spin-ring { to { transform: rotate(360deg); } }
        .avatar-badge {
          position: absolute;
          background: #fff;
          border: 1.5px solid var(--border);
          border-radius: 12px; padding: 0.6rem 1rem;
          display: flex; align-items: center; gap: 0.5rem;
          font-size: 0.8rem; font-weight: 700;
          backdrop-filter: blur(10px); white-space: nowrap;
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
          color: var(--text);
        }
        .avatar-badge-1 { top: -16px; right: -20px; }
        .avatar-badge-2 { bottom: -16px; left: -20px; }
        .badge-dot { width: 8px; height: 8px; border-radius: 50%; }
        .badge-dot-green { background: #22C55E; box-shadow: 0 0 8px #22C55E; }
        .badge-dot-blue { background: var(--blue2); box-shadow: 0 0 8px var(--blue2); }
        .hero-stats { display: flex; gap: 2.5rem; margin-top: 3rem; flex-wrap: wrap; }
        .hero-stat { text-align: center; }
        .hero-stat-value {
          font-family: var(--font-display);
          font-size: 2rem; font-weight: 800;
          background: linear-gradient(135deg, var(--blue), var(--indigo));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          line-height: 1;
        }
        .hero-stat-label {
          font-size: 0.78rem; color: var(--text3);
          font-weight: 500; margin-top: 0.25rem;
          text-transform: uppercase; letter-spacing: 0.08em;
        }
        .hero-scroll {
          position: absolute; bottom: 2.5rem; left: 50%;
          transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
          cursor: pointer; opacity: 0.55;
        }
        .scroll-text { font-size: 0.72rem; color: var(--text3); letter-spacing: 0.15em; text-transform: uppercase; font-family: var(--font-code); }
        .scroll-arrow {
          width: 24px; height: 24px;
          border: 1.5px solid var(--text3); border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          animation: bounce 1.5s ease infinite;
          color: var(--text3); font-size: 0.65rem;
        }
        @keyframes bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(6px); } }

        /* SECTION HEADER */
        .section-header { text-align: center; margin-bottom: 4rem; opacity: 0; transform: translateY(30px); transition: all 0.7s cubic-bezier(0.4,0,0.2,1); }
        .section-header.visible { opacity: 1; transform: translateY(0); }
        .section-tag { font-family: var(--font-code); font-size: 0.8rem; font-weight: 600; color: var(--blue); text-transform: uppercase; letter-spacing: 0.2em; display: block; margin-bottom: 0.75rem; }
        .section-title { font-family: var(--font-display); font-size: clamp(2.2rem, 4vw, 3.2rem); font-weight: 800; letter-spacing: -0.03em; margin-bottom: 1rem; color: var(--text); }
        .section-subtitle { font-size: 1rem; color: var(--text2); max-width: 500px; margin: 0 auto 1.5rem; line-height: 1.7; }
        .section-line { display: flex; justify-content: center; }
        .section-line-inner { width: 60px; height: 3px; background: linear-gradient(90deg, var(--blue), var(--indigo)); border-radius: 2px; }

        /* ABOUT */
        #about { padding: 7rem 0; background: #fff; }
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
        @media (max-width: 900px) { .about-grid { grid-template-columns: 1fr; } }
        .about-img-wrap { position: relative; }
        .about-img-wrap img { width: 100%; border-radius: 22px; object-fit: cover; border: 2px solid var(--border2); box-shadow: 0 16px 48px rgba(37,99,235,0.1); }
        .about-accent { position: absolute; width: 180px; height: 180px; border-radius: 20px; background: linear-gradient(135deg, rgba(37,99,235,0.1), rgba(99,102,241,0.07)); border: 1.5px solid rgba(37,99,235,0.15); bottom: -24px; right: -24px; z-index: -1; }
        .about-intro { font-family: var(--font-display); font-size: 1.6rem; font-weight: 700; margin-bottom: 1.25rem; line-height: 1.3; color: var(--text); }
        .about-intro span { background: linear-gradient(135deg, #2563EB, #6366F1); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .about-para { color: var(--text2); font-size: 0.97rem; line-height: 1.85; margin-bottom: 1rem; }
        .about-highlights { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 2rem 0; }
        .about-highlight { display: flex; align-items: center; gap: 0.75rem; font-size: 0.9rem; color: var(--text2); font-weight: 500; }
        .about-highlight i { color: var(--blue); font-size: 0.85rem; }
        .about-actions { display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 2rem; }

        /* SKILLS */
        #skills { padding: 7rem 0; background: var(--bg2); }
        .skills-tabs { display: flex; gap: 0.5rem; justify-content: center; margin-bottom: 3rem; flex-wrap: wrap; }
        .skills-tab {
          padding: 0.6rem 1.4rem; border-radius: 8px;
          font-size: 0.88rem; font-weight: 700; cursor: pointer;
          transition: all 0.2s; border: 1.5px solid var(--border);
          font-family: var(--font-body); color: var(--text3); background: #fff;
        }
        .skills-tab.active { border-color: var(--blue); color: var(--blue); background: rgba(37,99,235,0.06); }
        .skills-tab:hover:not(.active) { border-color: var(--blue3); color: var(--text2); }
        .skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        @media (max-width: 640px) { .skills-grid { grid-template-columns: 1fr; } }
        .skill-bar-item {
          opacity: 0; transform: translateX(-20px);
          animation: slideIn 0.6s forwards;
          background: #fff; border: 1px solid var(--border);
          border-radius: 12px; padding: 1rem 1rem 0.85rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        @keyframes slideIn { to { opacity: 1; transform: translateX(0); } }
        .skill-bar-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.55rem; }
        .skill-name { font-size: 0.88rem; font-weight: 700; color: var(--text); display: flex; align-items: center; gap: 0.6rem; }
        .skill-icon { font-size: 0.85rem; width: 16px; }
        .skill-level { font-family: var(--font-code); font-size: 0.82rem; font-weight: 700; }
        .skill-bar-track { height: 6px; border-radius: 3px; background: var(--bg3); overflow: hidden; border: 1px solid var(--border); }
        .skill-bar-fill { height: 100%; border-radius: 3px; }

        /* PROJECTS */
        #projects { padding: 7rem 0; background: var(--bg); }
        .projects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 1.5rem; }
        @media (max-width: 640px) { .projects-grid { grid-template-columns: 1fr; } }
        .project-card {
          background: #fff; border-radius: 20px;
          border: 1.5px solid var(--border);
          position: relative; overflow: hidden;
          opacity: 0; transform: translateY(30px);
          transition: all 0.6s cubic-bezier(0.4,0,0.2,1), border-color 0.3s, box-shadow 0.3s, background 0.3s;
          cursor: default;
        }
        .project-card.visible { opacity: 1; transform: translateY(0); }
        .project-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: var(--card-color, var(--blue));
          opacity: 0.5; transition: opacity 0.3s;
        }
        .project-card:hover::before { opacity: 1; }
        .featured-badge {
          position: absolute; top: 1rem; right: 1rem;
          background: rgba(255,255,255,0.9);
          border: 1px solid #FEF3C7; color: #D97706;
          font-size: 0.72rem; font-weight: 700;
          padding: 0.25rem 0.7rem; border-radius: 20px;
          backdrop-filter: blur(8px); letter-spacing: 0.05em;
          box-shadow: 0 2px 8px rgba(217,119,6,0.12);
        }
        .project-card-inner { padding: 1.8rem; }
        .project-icon-wrap { width: 52px; height: 52px; border-radius: 14px; display: flex; align-items: center; justify-content: center; margin-bottom: 1.2rem; }
        .project-title { font-family: var(--font-display); font-size: 1.35rem; font-weight: 800; margin-bottom: 0.25rem; letter-spacing: -0.01em; }
        .project-subtitle { font-size: 0.82rem; color: var(--text3); font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.9rem; }
        .project-desc { font-size: 0.88rem; color: var(--text2); line-height: 1.75; margin-bottom: 1rem; }
        .project-stats { display: flex; gap: 1.2rem; margin-bottom: 1rem; }
        .project-stats span { font-size: 0.8rem; color: var(--text3); display: flex; align-items: center; gap: 0.35rem; font-family: var(--font-code); }
        .tech-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.4rem; }
        .tech-tag { padding: 0.25rem 0.7rem; font-size: 0.73rem; font-weight: 600; border-radius: 6px; border: 1px solid; font-family: var(--font-code); }
        .project-links { display: flex; gap: 0.75rem; }
        .proj-btn { padding: 0.55rem 1.1rem; border-radius: 8px; border: 1.5px solid; font-size: 0.82rem; font-weight: 700; cursor: pointer; text-decoration: none; display: flex; align-items: center; gap: 0.4rem; transition: all 0.2s; font-family: var(--font-body); }
        .proj-btn:hover { transform: translateY(-1px); opacity: 0.88; }
        .proj-btn-filled { border-color: transparent !important; }

        /* EXPERIENCE */
        #experience { padding: 7rem 0; background: #fff; }
        .exp-timeline { position: relative; }
        .exp-card { display: grid; grid-template-columns: auto 1fr; gap: 0; margin-bottom: 1.5rem; opacity: 0; transform: translateX(-30px); transition: all 0.6s cubic-bezier(0.4,0,0.2,1); position: relative; }
        .exp-card.visible { opacity: 1; transform: translateX(0); }
        .exp-line { width: 2px; margin: 0 2rem; min-height: 100%; border-radius: 2px; opacity: 0.45; }
        .exp-icon { position: absolute; left: 1.4rem; top: 1.8rem; width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 0.95rem; transform: translateX(-50%); z-index: 2; flex-shrink: 0; }
        .exp-content { background: var(--bg2); border: 1.5px solid var(--border); border-radius: 18px; padding: 1.8rem; margin-left: 2rem; box-shadow: 0 2px 12px rgba(0,0,0,0.04); }
        .exp-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; margin-bottom: 0.9rem; flex-wrap: wrap; }
        .exp-role { font-family: var(--font-display); font-size: 1.2rem; font-weight: 800; letter-spacing: -0.01em; }
        .exp-company { font-size: 0.9rem; color: var(--text2); font-weight: 600; margin-top: 0.15rem; }
        .exp-meta { text-align: right; }
        .exp-period { display: block; font-family: var(--font-code); font-size: 0.78rem; color: var(--text3); font-weight: 600; margin-bottom: 0.4rem; }
        .exp-type { font-size: 0.72rem; font-weight: 700; padding: 0.2rem 0.65rem; background: rgba(37,99,235,0.07); border: 1px solid var(--border2); border-radius: 20px; color: var(--blue); text-transform: uppercase; letter-spacing: 0.08em; }
        .exp-desc { font-size: 0.9rem; color: var(--text2); line-height: 1.75; margin-bottom: 1rem; }
        .exp-achievements { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .achievement-tag { padding: 0.3rem 0.8rem; border: 1px solid; border-radius: 20px; font-size: 0.76rem; font-weight: 700; display: flex; align-items: center; gap: 0.35rem; font-family: var(--font-code); }

        /* STATS SECTION */
        #stats { padding: 5rem 0; background: linear-gradient(135deg, #EFF6FF, #EEF2FF); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; }
        @media (max-width: 768px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }
        .stat-card {
          text-align: center; padding: 2.5rem 1.5rem;
          background: #fff; border-radius: 18px;
          border: 1.5px solid var(--border); transition: all 0.3s;
          position: relative; overflow: hidden;
          box-shadow: 0 4px 18px rgba(37,99,235,0.07);
        }
        .stat-card:hover { transform: translateY(-4px); border-color: var(--blue3); box-shadow: 0 12px 32px rgba(37,99,235,0.13); }
        .stat-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, var(--blue), var(--indigo)); }
        .stat-icon { font-size: 1.8rem; margin-bottom: 1rem; background: linear-gradient(135deg, var(--blue), var(--indigo)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .stat-value { font-family: var(--font-display); font-size: 2.8rem; font-weight: 800; background: linear-gradient(135deg, var(--blue), var(--indigo)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; line-height: 1; margin-bottom: 0.5rem; }
        .stat-label { font-size: 0.82rem; color: var(--text3); font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; }

        /* CONTACT */
        #contact { padding: 7rem 0; background: var(--bg2); }
        .contact-grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: 4rem; align-items: start; }
        @media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr; } }
        .contact-info h3 { font-family: var(--font-display); font-size: 1.8rem; font-weight: 800; margin-bottom: 1rem; letter-spacing: -0.02em; color: var(--text); }
        .contact-info p { color: var(--text2); line-height: 1.8; margin-bottom: 2.5rem; }
        .contact-items { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2.5rem; }
        .contact-item { display: flex; align-items: center; gap: 1rem; padding: 1rem 1.2rem; background: #fff; border: 1.5px solid var(--border); border-radius: 14px; transition: all 0.25s; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
        .contact-item:hover { border-color: var(--blue3); transform: translateX(4px); box-shadow: 0 4px 16px rgba(37,99,235,0.1); }
        .contact-item-icon { width: 40px; height: 40px; border-radius: 10px; background: rgba(37,99,235,0.08); display: flex; align-items: center; justify-content: center; color: var(--blue); flex-shrink: 0; }
        .contact-item-label { font-size: 0.75rem; color: var(--text3); font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; }
        .contact-item-value { font-size: 0.9rem; color: var(--text); font-weight: 600; }
        .contact-socials { display: flex; gap: 0.75rem; }
        .contact-social { width: 44px; height: 44px; border: 1.5px solid var(--border); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--text3); font-size: 1rem; text-decoration: none; transition: all 0.25s; background: #fff; box-shadow: 0 2px 6px rgba(0,0,0,0.04); }
        .contact-social:hover { border-color: var(--blue2); color: var(--blue); background: rgba(37,99,235,0.06); transform: translateY(-2px); box-shadow: 0 6px 16px rgba(37,99,235,0.14); }
        .contact-form { background: #fff; border: 1.5px solid var(--border); border-radius: 24px; padding: 2.5rem; box-shadow: 0 8px 30px rgba(37,99,235,0.07); }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        @media (max-width: 600px) { .form-row { grid-template-columns: 1fr; } }
        .form-group { margin-bottom: 1.25rem; }
        .form-label { display: block; font-size: 0.8rem; font-weight: 700; color: var(--text2); margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.08em; font-family: var(--font-code); }
        .form-input, .form-textarea { width: 100%; background: var(--bg2); border: 1.5px solid var(--border); border-radius: 10px; color: var(--text); font-family: var(--font-body); font-size: 0.92rem; font-weight: 500; padding: 0.75rem 1rem; transition: all 0.2s; outline: none; }
        .form-input:focus, .form-textarea:focus { border-color: var(--blue2); background: #fff; box-shadow: 0 0 0 3px rgba(59,130,246,0.12); }
        .form-textarea { resize: vertical; min-height: 130px; }
        .form-submit { width: 100%; padding: 0.9rem; background: linear-gradient(135deg, var(--blue), var(--indigo)); color: #fff; font-weight: 800; font-size: 0.95rem; border: none; border-radius: 10px; cursor: pointer; font-family: var(--font-body); letter-spacing: 0.04em; transition: all 0.25s; display: flex; align-items: center; justify-content: center; gap: 0.5rem; box-shadow: 0 4px 16px rgba(37,99,235,0.28); }
        .form-submit:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(37,99,235,0.38); }
        .form-submit:disabled { opacity: 0.7; cursor: not-allowed; }
        .form-success { text-align: center; padding: 1rem; color: #16A34A; font-weight: 700; background: #F0FDF4; border-radius: 10px; margin-top: 1rem; border: 1px solid #BBF7D0; font-size: 0.9rem; }

        /* FOOTER */
        footer { padding: 3rem 0; background: #fff; border-top: 1px solid var(--border); }
        .footer-inner { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1.5rem; }
        .footer-logo { font-family: var(--font-display); font-size: 1.4rem; font-weight: 800; color: var(--text); letter-spacing: -0.02em; }
        .footer-logo span { color: var(--blue); }
        .footer-copy { font-size: 0.85rem; color: var(--text3); }
        .footer-copy span { color: var(--blue); }
        .footer-links { display: flex; gap: 1rem; }
        .footer-link { font-size: 0.85rem; color: var(--text3); text-decoration: none; transition: color 0.2s; font-weight: 500; }
        .footer-link:hover { color: var(--blue); }

        /* BACK TO TOP */
        .back-to-top { position: fixed; bottom: 2rem; right: 2rem; width: 44px; height: 44px; background: linear-gradient(135deg, var(--blue), var(--indigo)); color: #fff; border: none; border-radius: 12px; cursor: pointer; z-index: 500; display: flex; align-items: center; justify-content: center; font-size: 1rem; transition: all 0.25s; box-shadow: 0 6px 20px rgba(37,99,235,0.32); }
        .back-to-top:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(37,99,235,0.4); }

        /* GRID PATTERN */
        .grid-pattern {
          position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background-image: radial-gradient(circle, #BFDBFE 1px, transparent 1px);
          background-size: 30px 30px;
          opacity: 0.6;
        }

        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes pulse-glow { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }
      `}</style>

      {/* FONT AWESOME */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />

      <CustomCursor />
      <ThreeBackground />

      {/* NAVBAR */}
      <nav className={scrollY > 20 ? "scrolled" : ""}>
        <div className="nav-logo" onClick={() => scrollTo("home")}>
          Amol<span>.</span>Dev
        </div>
        <ul className="nav-links">
          {NAV_LINKS.map((n) => (
            <li key={n} className={`nav-link ${activeNav === n ? "active" : ""}`} onClick={() => scrollTo(n)}>
              {n}
            </li>
          ))}
        </ul>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <button className="nav-cta" onClick={() => scrollTo("contact")}>
            <i className="fas fa-paper-plane" style={{ marginRight: "0.4rem" }} />
            Hire Me
          </button>
          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <span />
            <span style={{ width: menuOpen ? "16px" : "24px" }} />
            <span />
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {NAV_LINKS.map((n) => (
          <div key={n} className="mobile-menu-link" onClick={() => scrollTo(n)}>{n}</div>
        ))}
      </div>

      <main>
        {/* HERO */}
        <section id="home" style={{ position: "relative" }}>
          <div className="grid-pattern" />
          <div className="container">
            <div className="hero-inner">
              <div className="hero-left">
                <div className="hero-greeting">
                  <i className="fas fa-terminal" />
                  Hello World! I'm
                </div>
                <h1 className="hero-name">
                  Amol <span>Patil</span>
                </h1>
                <div className="hero-role">
                  <Typewriter
                    words={[
                      "MERN Stack Developer",
                      "Full-Stack Engineer",
                      "MongoDB Expert",
                      "React Architect",
                      "Node.js Developer",
                      "UI/UX Enthusiast",
                    ]}
                  />
                </div>
                <p className="hero-desc">
                  Crafting high-performance, scalable web applications with the
                  MERN stack. I turn complex problems into elegant digital
                  experiences that serve millions of users worldwide.
                </p>
                <div className="hero-btns">
                  <button className="btn-primary" onClick={() => scrollTo("projects")}>
                    <i className="fas fa-rocket" /> View Projects
                  </button>
                  <button className="btn-secondary" onClick={() => scrollTo("contact")}>
                    <i className="fas fa-envelope" /> Get In Touch
                  </button>
                  <a href="#" className="btn-secondary" style={{ textDecoration: "none", color: "var(--text)" }}>
                    <i className="fas fa-download" /> Download CV
                  </a>
                </div>
                <div className="hero-social">
                  {[
                    { icon: "fab fa-github", href: "#" },
                    { icon: "fab fa-linkedin", href: "#" },
                    { icon: "fab fa-twitter", href: "#" },
                    { icon: "fab fa-dev", href: "#" },
                    { icon: "fab fa-npm", href: "#" },
                  ].map((s) => (
                    <a key={s.icon} href={s.href} className="social-icon">
                      <i className={s.icon} />
                    </a>
                  ))}
                </div>
                <div className="hero-stats">
                  {STATS.map((s) => (
                    <div key={s.label} className="hero-stat">
                      <div className="hero-stat-value">{s.value}</div>
                      <div className="hero-stat-label">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="hero-avatar-wrap">
                <div className="avatar-ring avatar-ring-1">
                  <span style={{ position: "absolute", top: "10%", left: "5%", color: "rgba(37,99,235,0.5)", fontSize: "0.7rem" }}>
                    <i className="fas fa-circle" />
                  </span>
                  <span style={{ position: "absolute", bottom: "15%", right: "8%", color: "rgba(99,102,241,0.5)", fontSize: "0.6rem" }}>
                    <i className="fas fa-circle" />
                  </span>
                </div>
                <div className="avatar-ring avatar-ring-2" />
                <div className="hero-avatar">
                  <div className="avatar-inner">
                    <img
                      src="https://i.pinimg.com/originals/81/17/8b/81178b47a8598f0c81c4799f2cdd4057.gif"
                      alt="Avatar"
                      style={{ width: "110%", height: "110%", borderRadius: "50%", objectFit: "cover" }}
                    />
                  </div>
                </div>
                <div className="avatar-badge avatar-badge-1">
                  <div className="badge-dot badge-dot-green" />
                  <span style={{ fontSize: "0.75rem" }}>Available for Work</span>
                </div>
                <div className="avatar-badge avatar-badge-2">
                  <div className="badge-dot badge-dot-blue" />
                  <span style={{ fontSize: "0.75rem" }}>Open Source Contributor</span>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-scroll" onClick={() => scrollTo("about")}>
            <span className="scroll-text">Scroll</span>
            <div className="scroll-arrow"><i className="fas fa-chevron-down" /></div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about">
          <div className="container">
            <SectionHeader
              tag="// About Me"
              title="Who I Am"
              subtitle="A passionate developer turning ideas into scalable digital solutions"
            />
            <div className="about-grid">
              <div className="about-img-wrap">
                <img
                  src="https://media0.giphy.com/media/v1.Y2lkPTZjMDliOTUydHVwNWlobG5mMzltMG0yMTM2M2g1a2w4enh4NDBwaGhvOXB6Yzc5NSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/qgQUggAC3Pfv687qPC/source.gif"
                  alt="About"
                  style={{ width: "100%", height: "360px", objectFit: "cover", borderRadius: "22px" }}
                />
                <div className="about-accent" />
              </div>
              <div className="about-text">
                <h3 className="about-intro">
                  Building the <span>future</span> of the web, one commit at a time.
                </h3>
                <p className="about-para">
                  I'm a Fresher Full-Stack Developer with 1+ years of experience
                  specializing in the MERN stack. I architect and build
                  enterprise-grade applications that handle massive scale — from
                  initial design to cloud deployment.
                </p>
                <p className="about-para">
                  My expertise spans the full development lifecycle: crafting
                  pixel-perfect React UIs, designing robust Node.js APIs,
                  optimizing MongoDB databases, and setting up production-grade
                  DevOps pipelines on AWS.
                </p>
                <div className="about-highlights">
                  {[
                    { icon: "fas fa-map-marker-alt", text: "Surat , Gujarat" },
                    { icon: "fas fa-graduation-cap", text: "Bachelor of Computer Applications (BCA)" },
                    { icon: "fas fa-briefcase", text: "1+ Years Experience" },
                    { icon: "fas fa-certificate", text: "AWS Certified Developer" },
                    { icon: "fas fa-globe", text: "Available In India" },
                    { icon: "fas fa-language", text: "English, Hindi, Gujarati , Marathi" },
                  ].map((h) => (
                    <div key={h.text} className="about-highlight">
                      <i className={h.icon} />
                      <span>{h.text}</span>
                    </div>
                  ))}
                </div>
                <div className="about-actions">
                  <button className="btn-primary" onClick={() => scrollTo("contact")}>
                    <i className="fas fa-envelope" /> Let's Talk
                  </button>
                  <button className="btn-secondary" onClick={() => scrollTo("projects")}>
                    <i className="fas fa-folder-open" /> My Work
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section id="stats">
          <div className="container">
            <div className="stats-grid">
              {STATS.map((s) => (
                <div key={s.label} className="stat-card">
                  <div className="stat-icon"><i className={s.icon} /></div>
                  <div className="stat-value">{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills">
          <div className="container">
            <SectionHeader
              tag="// Tech Stack"
              title="Skills & Expertise"
              subtitle="My complete technical arsenal — built through years of real-world development"
            />
            <div className="skills-tabs">
              {Object.keys(SKILLS).map((tab) => (
                <button
                  key={tab}
                  className={`skills-tab ${activeSkillTab === tab ? "active" : ""}`}
                  onClick={() => setActiveSkillTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="skills-grid">
              {SKILLS[activeSkillTab].map((skill, i) => (
                <SkillBar key={skill.name} {...skill} delay={i * 80} />
              ))}
            </div>

            {/* Tech Logos strip */}
            <div style={{ marginTop: "4rem", borderTop: "1px solid var(--border)", paddingTop: "3rem" }}>
              <p style={{ textAlign: "center", color: "var(--text3)", fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "2rem", fontFamily: "var(--font-code)" }}>
                Also experienced with
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center" }}>
                {["Python", "Golang", "Rust", "Flutter", "React Native", "Kubernetes", "Terraform", "Jenkins", "Kafka", "RabbitMQ", "Prisma", "Sequelize", "Jest", "Cypress", "Storybook"].map((t) => (
                  <span key={t} style={{ padding: "0.4rem 0.9rem", background: "#fff", border: "1px solid var(--border)", borderRadius: "8px", fontSize: "0.8rem", color: "var(--text2)", fontWeight: 600, fontFamily: "var(--font-code)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects">
          <div className="container">
            <SectionHeader
              tag="// Portfolio"
              title="Featured Projects"
              subtitle="Real-world applications built with passion, precision, and production-grade quality"
            />
            <div className="projects-grid">
              {PROJECTS.map((p, i) => (
                <ProjectCard key={p.title} project={p} index={i} />
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              <a href="#" className="btn-secondary" style={{ display: "inline-flex", textDecoration: "none", color: "var(--text)" }}>
                <i className="fab fa-github" /> View All on GitHub
              </a>
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience">
          <div className="container">
            <SectionHeader
              tag="// Work History"
              title="Experience"
              subtitle="A track record of delivering impactful solutions at scale"
            />
            <div className="exp-timeline">
              {EXPERIENCE.map((exp, i) => (
                <ExperienceCard key={exp.company} exp={exp} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact">
          <div className="container">
            <SectionHeader
              tag="// Say Hello"
              title="Get In Touch"
              subtitle="Ready to build something amazing together? Let's talk!"
            />
            <div className="contact-grid">
              <div className="contact-info">
                <h3>
                  Let's Create Something{" "}
                  <span style={{ background: "linear-gradient(135deg,#2563EB,#6366F1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    Extraordinary
                  </span>
                </h3>
                <p>
                  Whether you have a project in mind, want to collaborate, or
                  just want to say hi — my inbox is always open. I typically
                  respond within 24 hours.
                </p>
                <div className="contact-items">
                  {[
                    { icon: "fas fa-envelope", label: "Email", value: "ap195569@gmail.com" },
                    { icon: "fas fa-phone", label: "Phone", value: "+91 7574948640" },
                    { icon: "fas fa-map-marker-alt", label: "Location", value: "Surat , Gujarat" },
                  ].map((item) => (
                    <div key={item.label} className="contact-item">
                      <div className="contact-item-icon"><i className={item.icon} /></div>
                      <div>
                        <div className="contact-item-label">{item.label}</div>
                        <div className="contact-item-value">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="contact-socials">
                  {[
                    { icon: "fab fa-github", href: "#" },
                    { icon: "fab fa-linkedin", href: "#" },
                    { icon: "fab fa-twitter", href: "#" },
                    { icon: "fab fa-dev", href: "#" },
                    { icon: "fab fa-youtube", href: "#" },
                  ].map((s) => (
                    <a key={s.icon} href={s.href} className="contact-social">
                      <i className={s.icon} />
                    </a>
                  ))}
                </div>
              </div>

              <form className="contact-form" onSubmit={handleContact}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Your Name</label>
                    <input className="form-input" type="text" required placeholder="John Doe"
                      value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input className="form-input" type="email" required placeholder="john@example.com"
                      value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input className="form-input" type="text" required placeholder="Project Collaboration"
                    value={contactForm.subject} onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea className="form-textarea" required placeholder="Tell me about your project, goals, and timeline..."
                    value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} />
                </div>
                <button type="submit" className="form-submit" disabled={formStatus === "sending"}>
                  {formStatus === "sending"
                    ? <><i className="fas fa-spinner fa-spin" /> Sending...</>
                    : <><i className="fas fa-paper-plane" /> Send Message</>
                  }
                </button>
                {formStatus === "sent" && (
                  <div className="form-success">
                    <i className="fas fa-check-circle" /> Message sent successfully! I'll be in touch soon.
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer>
        <div className="container">
          <div className="footer-inner">
            <div className="footer-logo">Amol<span>.</span>Dev</div>
            <div className="footer-copy">
              © 2024 Amol Patil. Built with <span>❤</span> using MERN Stack & Three.js
            </div>
            <div className="footer-links">
              {["Privacy", "Terms", "Sitemap"].map((l) => (
                <a key={l} href="#" className="footer-link">{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* BACK TO TOP */}
      {scrollY > 400 && (
        <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <i className="fas fa-chevron-up" />
        </button>
      )}
    </>
  );
}
