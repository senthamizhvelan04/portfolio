import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import FrontendDeveloperSection from "@/components/FrontendDeveloperSection";
import Showcase from "@/components/Showcase";
import ContactSection from "@/components/ContactSection";
import ScrollFlow from "@/components/ScrollFlow";
import ProofBar from "@/components/ProofBar";
import EngineeringDecisions from "@/components/EngineeringDecisions";
import About from "@/pages/About";

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="portfolio-shell">
      <header className="site-nav">
        <a className="site-wordmark" href="#home" aria-label="Senthamizhvelan portfolio home">
          <span aria-hidden="true">S</span>
          <span>SENTHAMIZHVELAN · AI/ML</span>
        </a>

        <a className="nav-primary-link" href="https://github.com/senthamizhvelan04" target="_blank" rel="noopener noreferrer">
          View projects <ArrowUpRight size={15} aria-hidden="true" />
        </a>

        <button
          className="nav-menu-button"
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </header>

      {menuOpen && (
        <nav id="mobile-navigation" className="mobile-navigation" aria-label="Mobile navigation">
          <a href="#home" onClick={closeMenu}>Home</a>
          <a href="#about" onClick={closeMenu}>Expertise</a>
          <a href="#showcase" onClick={closeMenu}>Projects</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
          <a href="/about" onClick={closeMenu}>About me</a>
        </nav>
      )}

      <main>
        <section id="home" className="hero-section" aria-labelledby="hero-title">
          <div className="hero-portrait-wrap" aria-hidden="true">
            <img
              src={`${import.meta.env.BASE_URL}assets/hero-portrait.png`}
              alt=""
              className="hero-portrait"
              width="1176"
              height="1338"
              fetchPriority="high"
            />
          </div>

          <div className="hero-content">
            <h1 id="hero-title" className="hero-name" aria-label="Thamizh">
              <span className="hero-name-solid">THA</span>
              <span className="hero-name-outline">MIZH</span>
            </h1>

            <p className="hero-role">AI/ML engineer</p>
            <p className="hero-statement">Production-oriented RAG pipelines, agentic workflows, and LLM-powered applications.</p>
            <p className="hero-keywords">Python · RAG · LLM Agents · FastAPI · LangChain · SQL</p>
          </div>
        </section>

        <section className="intro-rail" aria-label="Introduction">
          <p>Production-minded RAG pipelines, autonomous research agents, and reliable LLM tooling.</p>
          <div className="intro-links">
            <a href="mailto:senthamizhvelanm@gmail.com">Email</a>
            <a href="https://github.com/senthamizhvelan04" target="_blank" rel="noopener noreferrer">
              GitHub <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </section>

        <ProofBar />

        <section id="about">
          <FrontendDeveloperSection />
        </section>

        <section id="showcase">
          <Showcase />
        </section>

        <section id="decisions">
          <EngineeringDecisions />
        </section>

        <section id="contact">
          <ContactSection />
        </section>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <>
      <ScrollFlow />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}