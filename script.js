/* =============================================
   IGRIS PORTFOLIO — script.js
============================================= */

// ---- TYPING EFFECT ----
const roles = [
  "Cybersecurity Enthusiast",
  "Web Developer",
  "Ethical Hacker",
  "Python Programmer",
  "Network Security Analyst"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeRole() {
  const el = document.getElementById("typed-role");
  if (!el) return;

  const current = roles[roleIndex];

  if (isDeleting) {
    el.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    el.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 45 : 90;

  if (!isDeleting && charIndex === current.length) {
    speed = 1600;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 300;
  }

  setTimeout(typeRole, speed);
}

// ---- NAVBAR ----
const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navLinks.classList.toggle("open");
});

// Close menu on link click
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navLinks.classList.remove("open");
  });
});

// Active nav highlight on scroll
const sections = document.querySelectorAll("section[id]");
function highlightNav() {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const id = section.getAttribute("id");
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (!link) return;
    const top = section.offsetTop;
    const height = section.offsetHeight;
    if (scrollY >= top && scrollY < top + height) {
      document.querySelectorAll(".nav-link").forEach(l => l.style.color = "");
      link.style.color = "var(--accent)";
    }
  });
}
window.addEventListener("scroll", highlightNav);

// ---- PARTICLES ----
function createParticles() {
  const container = document.getElementById("particles");
  if (!container) return;

  const count = 40;
  for (let i = 0; i < count; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    const size = Math.random() * 3 + 1;
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      width: ${size}px;
      height: ${size}px;
      animation-duration: ${Math.random() * 15 + 10}s;
      animation-delay: ${Math.random() * 8}s;
      opacity: 0;
    `;
    // Random colors
    const colors = ["var(--accent)", "var(--accent2)", "var(--accent3)"];
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    container.appendChild(p);
  }
}

// ---- SCROLL REVEAL ----
function addRevealClasses() {
  const targets = [
    ".about-grid",
    ".project-card",
    ".skill-category",
    ".tool-badge",
    ".contact-card",
    ".resume-card",
    ".section-header"
  ];
  targets.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add("reveal");
      el.style.transitionDelay = `${i * 0.08}s`;
    });
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.12 });

function observeReveal() {
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
}

// ---- SKILL BARS ----
function animateSkillBars() {
  const fills = document.querySelectorAll(".skill-fill");
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const w = fill.getAttribute("data-w");
        fill.style.width = w + "%";
        barObserver.unobserve(fill);
      }
    });
  }, { threshold: 0.5 });

  fills.forEach(fill => barObserver.observe(fill));
}

// ---- TILT EFFECT (subtle) ----
function initTilt() {
  document.querySelectorAll("[data-tilt]").forEach(card => {
    card.addEventListener("mousemove", e => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      card.style.transform = `
        translateY(-4px)
        rotateX(${-dy * 4}deg)
        rotateY(${dx * 4}deg)
      `;
      card.style.transition = "transform 0.05s";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) rotateX(0) rotateY(0)";
      card.style.transition = "transform 0.4s ease";
    });
  });
}

// ---- TERMINAL TYPE BOOT SEQUENCE ----
function bootTerminal() {
  const lines = document.querySelectorAll(".terminal-line, .terminal-output");
  lines.forEach((el, i) => {
    el.style.opacity = "0";
    el.style.transform = "translateX(-10px)";
    el.style.transition = `opacity 0.3s ${i * 0.22}s, transform 0.3s ${i * 0.22}s`;
    setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "none";
    }, 50 + i * 220);
  });
}

// ---- SMOOTH SCROLL FOR OLDER BROWSERS ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (!href || href === "#") return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 64;
    window.scrollTo({ top, behavior: "smooth" });
  });
});

// ---- CURSOR GLOW TRAIL ----
function initCursorGlow() {
  const glow = document.createElement("div");
  glow.style.cssText = `
    position: fixed;
    width: 300px; height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(30,144,255,0.04) 0%, transparent 70%);
    pointer-events: none;
    z-index: 9998;
    transform: translate(-50%, -50%);
    transition: left 0.15s ease, top 0.15s ease;
  `;
  document.body.appendChild(glow);

  document.addEventListener("mousemove", e => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  });
}

// ---- YEAR IN FOOTER ----
function setYear() {
  const yr = document.querySelector(".footer-bottom");
  if (yr) yr.textContent = `© ${new Date().getFullYear()} Naresh · All Rights Reserved`;
}

// ---- INIT ----
document.addEventListener("DOMContentLoaded", () => {
  bootTerminal();
  setTimeout(typeRole, 1200);
  addRevealClasses();
  observeReveal();
  animateSkillBars();
  initTilt();
  // Particle background and cursor glow removed per user request
  setYear();
});
