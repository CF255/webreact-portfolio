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

export default function Home() {
  const auth = useAuth();
  const goTo = useNavigate();
  const [demoError, setDemoError] = useState("");
  const [demoLoading, setDemoLoading] = useState(false);

  async function handleDemoLogin() {
    setDemoLoading(true);
    setDemoError("");
    try {
      const json = await loginRequest("demo", "demo1234");
      auth.saveUser(json);
      goTo("/dashboard");
    } catch (error) {
      setDemoError("No se pudo iniciar la demo, intenta de nuevo.");
      setDemoLoading(false);
    }
  }

  return (
    <div className="landing">
      <header className="landing-nav">
        <span className="landing-nav-brand">Andrews Fernandez</span>
        <nav className="landing-nav-links">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#experience">Experience</a>
          <a href="#project">Project</a>
          <a href="#contact">Contact</a>
        </nav>
        {auth.isAuthenticated ? (
          <Link to="/dashboard" className="landing-nav-cta">Go to dashboard</Link>
        ) : (
          <Link to="/login" className="landing-nav-cta">Log in</Link>
        )}
      </header>

      <section className="landing-hero">
        <h1>Andrews Luis Fernandez</h1>
        <p className="landing-hero-title">Full-Stack Developer</p>
        <p className="landing-hero-text">
          Full-Stack Developer with 3+ years of experience building scalable web and
          mobile applications in production environments. Specialized in React, Next.js,
          and Node.js, with a strong focus on software architecture, performance, and
          maintainability.
        </p>
        <div className="landing-hero-actions">
          <button onClick={handleDemoLogin} disabled={demoLoading} className="landing-btn landing-btn-solid">
            {demoLoading ? "Cargando..." : "Explore the app (demo)"}
          </button>
          <a href={REPO_URL} target="_blank" rel="noreferrer" className="landing-btn landing-btn-outline">
            <FontAwesomeIcon icon={faGithub} /> View code
          </a>
        </div>
        {!!demoError && <p className="landing-hero-error">{demoError}</p>}
        <p className="landing-hero-subtext">
          No account needed — the demo button logs you straight in. Prefer to try
          the real flow? <Link to="/signup">Create an account</Link> or <Link to="/login">log in</Link> instead.
        </p>
      </section>

      <section id="about" className="landing-section">
        <h2>About me</h2>
        <p>
          Proven experience in designing and developing APIs, distributed systems, and
          event-driven architectures using RabbitMQ, consistently delivering end-to-end
          solutions with direct impact on end users.
        </p>
      </section>

      <section id="skills" className="landing-section">
        <h2>Skills</h2>
        <div className="landing-skills">
          {SKILLS.map((skill) => (
            <span className="landing-skill-tag" key={skill}>{skill}</span>
          ))}
        </div>
      </section>

      <section id="experience" className="landing-section">
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
        <h2>Featured project</h2>
        <article className="landing-project-card">
          <h3>WebReact — Full-Stack Portfolio App</h3>
          <p>
            This site itself: a full-stack demo app (React + TypeScript + Vite on the
            front, Node.js + Express + MongoDB on the back) built to showcase real
            production-style patterns, not just a static page.
          </p>
          <ul>
            {APP_FEATURES.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <div className="landing-hero-actions">
            <button onClick={handleDemoLogin} disabled={demoLoading} className="landing-btn landing-btn-solid">
              Try it live
            </button>
            <a href={REPO_URL} target="_blank" rel="noreferrer" className="landing-btn landing-btn-outline">
              <FontAwesomeIcon icon={faGithub} /> Source code
            </a>
          </div>
        </article>
      </section>

      <section id="contact" className="landing-section">
        <h2>Contact</h2>
        <ul className="landing-contact-list">
          <li>
            <FontAwesomeIcon icon={faEnvelope} />
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </li>
          <li>
            <FontAwesomeIcon icon={faPhone} />
            <a href={`tel:${PHONE.replace(/\s/g, "")}`}>{PHONE}</a>
          </li>
          <li>
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{LOCATION}</span>
          </li>
          <li>
            <FontAwesomeIcon icon={faGithub} />
            <a href={GITHUB_URL} target="_blank" rel="noreferrer">github.com/CF255</a>
          </li>
        </ul>
        <a href={cvFile} download="Andrews-Fernandez-CV.pdf" className="landing-btn landing-btn-outline">
          <FontAwesomeIcon icon={faDownload} /> Download CV
        </a>
      </section>

      <footer className="landing-footer">
        <p>Andrews Fernandez — Built with React, Node.js and MongoDB.</p>
      </footer>
    </div>
  );
}
