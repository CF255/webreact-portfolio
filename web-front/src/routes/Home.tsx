import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faLocationDot, faDownload } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { useAuth } from "../auth/AuthProvider";
import { loginRequest } from "../auth/loginRequest";
import cvFile from "../assets/AndrewsFernandez-CV.pdf";
import "../../public/css/landing.css";

const GITHUB_URL = "https://github.com/CF255";
const REPO_URL = "https://github.com/CF255/webreact-portfolio";
const EMAIL = "andrewsluis2011@gmail.com";
const PHONE = "+1 849-201-1090";
const LOCATION = "Calderón, República Dominicana";

const SKILLS = [
  "React", "React Native", "TypeScript", "Next.js", "Node.js",
  "Microservices", "RabbitMQ", "PostgreSQL", "REST", "API Design",
  "WebSockets", "MySQL", "GraphQL", "Distributed Systems",
  "Performance Optimization", "Security Best Practices",
  "Real-time Data Processing", "Jest", "CI/CD",
];

const EXPERIENCE = [
  {
    role: "Full-Stack Developer",
    company: "Intellisys D' Corp — The Brain",
    bullets: [
      "Designed and implemented full-stack architecture from scratch for scalable web applications and backend services",
      "Developed APIs using GraphQL and Prisma, improving data consistency and operational efficiency",
      "Implemented a granular permission system, enhancing security and access control",
      "Standardized APIs and project structures, reducing complexity and improving maintainability",
      "Designed event-driven architecture using RabbitMQ for scalable and asynchronous processing",
      "Managed a monorepo with reusable packages, accelerating development across multiple applications",
    ],
  },
  {
    role: "Full-Stack Developer",
    company: "Intellisys D' Corp — Ferremundo",
    bullets: [
      "Developed and maintained web and mobile applications using React and React Native",
      "Implemented and integrated APIs with Node.js, improving frontend-backend communication",
      "Enhanced application performance and stability in production, reducing errors and failures",
      "Implemented automated testing with Jest to ensure code quality and reliability",
      "Contributed to CI/CD processes, enabling faster and more reliable deployments",
    ],
  },
  {
    role: "Full-Stack Developer",
    company: "Intellisys D' Corp — Web Projects",
    bullets: [
      "Developed optimized landing pages using HTML, CSS, and JavaScript",
      "Implemented semantic HTML to improve accessibility and SEO",
      "Optimized performance and load times across multiple projects",
      "Enhanced user experience through responsive design and accessibility improvements",
    ],
  },
];

const EDUCATION = [
  { degree: "Software Development Technologist", school: "ITLA" },
  { degree: "Software Developer", school: "CIC" },
];

const APP_FEATURES = [
  "JWT auth with access + refresh tokens and server-side revocation",
  "Full CRUD for notes, with ownership-based access control",
  "Real-time chat with Socket.IO",
  "Admin panel with per-user feature toggles",
  "Movie and GIF search integrations",
];

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#project", label: "Project" },
  { href: "#contact", label: "Contact" },
];

export default function Home() {
  const auth = useAuth();
  const goTo = useNavigate();
  const [demoError, setDemoError] = useState("");
  const [demoLoading, setDemoLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  async function handleDemoLogin() {
    setDemoLoading(true);
    setDemoError("");
    try {
      const json = await loginRequest("demo", "demo1234");
      auth.saveUser(json);
      goTo("/dashboard");
    } catch (error) {
      setDemoError("Couldn't start the demo, please try again.");
      setDemoLoading(false);
    }
  }

  return (
    <div className="landing">
      <header className="landing-nav">
        <span className="landing-nav-brand">Andrews Fernandez</span>

        <nav className={`landing-nav-links ${menuOpen ? "landing-nav-links-open" : ""}`}>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>
          ))}
          <a href={cvFile} download="Andrews-Fernandez-CV.pdf" onClick={() => setMenuOpen(false)}>Download CV</a>
          <Link to={auth.isAuthenticated ? "/dashboard" : "/login"} className="landing-nav-cta landing-nav-cta-mobile" onClick={() => setMenuOpen(false)}>
            {auth.isAuthenticated ? "Go to dashboard" : "Log in"}
          </Link>
        </nav>

        <div className="landing-nav-actions">
          <a href={cvFile} download="Andrews-Fernandez-CV.pdf" className="landing-nav-cv">
            <FontAwesomeIcon icon={faDownload} aria-hidden="true" /> CV
          </a>
          <Link to={auth.isAuthenticated ? "/dashboard" : "/login"} className="landing-nav-cta landing-nav-cta-desktop">
            {auth.isAuthenticated ? "Go to dashboard" : "Log in"}
          </Link>
        </div>

        <button
          type="button"
          className="landing-nav-toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <section className="landing-hero">
        <h1>Andrews Luis Fernandez</h1>
        <hr className="landing-hero-rule" />
        <p className="landing-hero-title">Full-Stack Developer</p>
        <p className="landing-hero-text">
          Full-Stack Developer with 3+ years of experience building scalable web and
          mobile applications in production environments. Specialized in React, Next.js,
          and Node.js, with a strong focus on software architecture, performance, and
          maintainability.
        </p>
        <div className="landing-hero-actions">
          <button type="button" onClick={handleDemoLogin} disabled={demoLoading} aria-busy={demoLoading} className="landing-btn landing-btn-solid">
            {demoLoading ? "Loading..." : "Explore the app (demo)"}
          </button>
          <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="landing-btn landing-btn-outline">
            <FontAwesomeIcon icon={faGithub} aria-hidden="true" /> View code
          </a>
        </div>
        {!!demoError && <p className="landing-hero-error" role="alert">{demoError}</p>}
        <p className="landing-hero-subtext">
          No account needed — the demo button logs you straight in. Prefer to try
          the real flow? <Link to="/signup">Create an account</Link> or <Link to="/login">log in</Link> instead.
        </p>
      </section>

      <section id="about" className="landing-section">
        <p className="landing-eyebrow">Who I am</p>
        <h2>About me</h2>
        <p>
          Proven experience in designing and developing APIs, distributed systems, and
          event-driven architectures using RabbitMQ, consistently delivering end-to-end
          solutions with direct impact on end users.
        </p>
      </section>

      <section id="skills" className="landing-section">
        <p className="landing-eyebrow">What I work with</p>
        <h2>Skills</h2>
        <div className="landing-skills">
          {SKILLS.map((skill) => (
            <span className="landing-skill-tag" key={skill}>{skill}</span>
          ))}
        </div>
      </section>

      <section id="experience" className="landing-section">
        <p className="landing-eyebrow">Where I've worked</p>
        <h2>Experience</h2>
        <div className="landing-experience-list">
          {EXPERIENCE.map((job) => (
            <article className="landing-experience-item" key={job.company}>
              <h3>{job.role}</h3>
              <p className="landing-experience-company">{job.company}</p>
              <ul>
                {job.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <h3 className="landing-subheading">Education</h3>
        <ul className="landing-education-list">
          {EDUCATION.map((item) => (
            <li key={item.school}><strong>{item.degree}</strong> — {item.school}</li>
          ))}
        </ul>
      </section>

      <section id="project" className="landing-section">
        <p className="landing-eyebrow">A working demo, not a screenshot</p>
        <h2>Featured project</h2>
        <article className="landing-project-card">
          <h3>WebReact — Full-Stack Portfolio App</h3>
          <p>
            This site itself: a full-stack demo app (React + TypeScript + Vite on the
            front, Node.js + Express + MongoDB on the back) built to showcase real
            production-style patterns, not just a static page.
          </p>
          <div className="landing-skills landing-project-features">
            {APP_FEATURES.map((feature) => (
              <span className="landing-skill-tag" key={feature}>{feature}</span>
            ))}
          </div>
          <div className="landing-hero-actions">
            <button type="button" onClick={handleDemoLogin} disabled={demoLoading} aria-busy={demoLoading} className="landing-btn landing-btn-solid">
              {demoLoading ? "Loading..." : "Try it live"}
            </button>
            <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="landing-btn landing-btn-outline">
              <FontAwesomeIcon icon={faGithub} aria-hidden="true" /> Source code
            </a>
          </div>
          {!!demoError && <p className="landing-hero-error" role="alert">{demoError}</p>}
        </article>
      </section>

      <section id="contact" className="landing-section">
        <p className="landing-eyebrow">Let's talk</p>
        <h2>Contact</h2>
        <ul className="landing-contact-list">
          <li>
            <FontAwesomeIcon icon={faEnvelope} aria-hidden="true" />
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </li>
          <li>
            <FontAwesomeIcon icon={faPhone} aria-hidden="true" />
            <a href={`tel:${PHONE.replace(/\s/g, "")}`}>{PHONE}</a>
          </li>
          <li>
            <FontAwesomeIcon icon={faLocationDot} aria-hidden="true" />
            <span>{LOCATION}</span>
          </li>
          <li>
            <FontAwesomeIcon icon={faGithub} aria-hidden="true" />
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">github.com/CF255</a>
          </li>
        </ul>
        <a href={cvFile} download="Andrews-Fernandez-CV.pdf" className="landing-btn landing-btn-outline">
          <FontAwesomeIcon icon={faDownload} aria-hidden="true" /> Download CV
        </a>
      </section>

      <footer className="landing-footer">
        <p>Andrews Fernandez — Built with React, Node.js and MongoDB.</p>
      </footer>
    </div>
  );
}
