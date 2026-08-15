import { ArrowUpRight, ChevronRight, Github } from "lucide-react";
import { KeyboardEvent, useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import ProjectPreview from "./ProjectPreview";

type TabId = "projects" | "tech";

const tabs: { id: TabId; label: string }[] = [
  { id: "projects", label: "Projects" },
  { id: "tech", label: "Tech stack" },
];

type Project = {
  title: string;
  preview: "neural" | "research";
  label: string;
  summary: string;
  contribution: string;
  challenge: string;
  tech: string[];
  github?: string;
  link?: string;
  architecture?: string;
  highlights?: string[];
  decision?: { title: string; detail: string };
  metrics?: { value: string; label: string }[];
};

const projects: Project[] = [
  {
    title: "NeuralRAG — Multi-Tool Agentic RAG Platform",
    preview: "neural" as const,
    label: "Flagship project",
    summary:
      "Production-oriented agentic AI platform combining hybrid BM25 + ChromaDB retrieval, SQL reasoning, web search, and system tools — with multi-provider LLM routing and ONNX-optimized deployment.",
    contribution:
      "Built the LangChain agent, hybrid ChromaDB + BM25 retrieval pipeline, SQL safety guard, multi-provider routing with API-key rotation, Flask API, and React/TypeScript product interface.",
    challenge:
      "Balancing retrieval quality, tool safety, provider reliability, and deployment constraints without turning the workflow into an opaque black box.",
    tech: ["Python", "LangChain", "ChromaDB", "BM25", "Flask", "React/TypeScript"],
    github: "https://github.com/senthamizhvelan04/Neural-RAG-system",
    link: "https://neural-rag-system.onrender.com/",
    architecture: `User → LangChain Agent → Tool Router
├── Hybrid RAG (ChromaDB + BM25)
├── Text-to-SQL (SELECT-only guard)
├── Web Search
├── System Control
├── Image Generation
└── Chart Generation`,
    highlights: [
      "6 dynamically toggled tools",
      "Hybrid BM25 + vector retrieval",
      "Text-to-SQL with SELECT-only safety guard",
      "Multi-provider LLM routing with API-key rotation",
      "React/TypeScript frontend",
      "Flask backend → Render deployment",
      "ONNX embedding optimization for boot timeout",
    ],
    decision: {
      title: "Why disable FlashRank?",
      detail:
        "FlashRank improved retrieval ranking but introduced unacceptable latency under the deployment platform's 30-second request limit. After profiling, I disabled it in production and prioritized predictable response time.",
    },
    metrics: [
      { value: "6", label: "agent tools" },
      { value: "<2s", label: "query response" },
      { value: "500+", label: "documents indexed" },
    ],
  },
  {
    title: "AI-Powered Research Agent",
    preview: "research" as const,
    label: "Agentic workflow",
    summary:
      "A hand-built autonomous research system using a Plan–Act–Observe–Reflect loop with dual-LLM resilience, custom tool-call parsing, source verification, and real-time SSE streaming.",
    contribution:
      "Implemented the Plan–Act–Observe–Reflect loop, custom JSON/XML tool-call parsing, source verification, Groq-to-Gemini fallback, SSE streaming, and Render deployment.",
    challenge:
      "Handling inconsistent tool-call output, rate limits, conflicting sources, and bounded execution while keeping the final answer traceable.",
    tech: ["Python", "FastAPI", "Groq", "Gemini", "Tool Calling", "SSE"],
    github: "https://github.com/senthamizhvelan04/AI-powered-research-agent",
    link: "https://ai-powered-research-agent-0nm3.onrender.com/",
    architecture: `Research Question → PLAN → TOOL CALL
├── Web Search
├── Webpage Reader
└── Calculator
→ OBSERVE → VERIFY → REFLECT → Final Report

Fallback: Groq Llama 3.3 70B → Gemini 2.0 Flash`,
    highlights: [
      "Plan–Act–Observe–Reflect reasoning loop",
      "Custom JSON/XML tool-call parser",
      "Groq → Gemini dual-provider fallback",
      "Rate-limit handling with automatic retry",
      "15-iteration reasoning cap",
      "Source verification + conflicting-info detection",
      "SSE streaming to frontend",
      "Render deployment",
    ],
    decision: {
      title: "Why dual-provider fallback?",
      detail:
        "LLM APIs can fail or hit rate limits mid-research. The agent falls back from Groq Llama 3.3 70B to Gemini 2.0 Flash automatically, so a research session never fails silently.",
    },
    metrics: [
      { value: "15", label: "max reasoning iterations" },
      { value: "2", label: "LLM providers" },
      { value: "4", label: "tool types" },
    ],
  },
];

const technologies = [
  {
    group: "AI / Retrieval",
    signal: "Reason",
    summary: "Grounded model workflows that retrieve context, use tools, route across providers, and stay inside explicit boundaries.",
    application: "Used in NeuralRAG for hybrid dense + sparse retrieval, and across the research agent for tool calling and provider fallback.",
    items: ["RAG", "LangChain", "LLM tool calling", "MCP", "Prompt guardrails", "Hybrid Search"],
  },
  {
    group: "Backend",
    signal: "Serve",
    summary: "Service layers that turn model and data workflows into reliable, inspectable application capabilities.",
    application: "Used to expose AI workflows as application services in NeuralRAG (Flask) and the research agent (FastAPI).",
    items: ["Python", "FastAPI", "Flask", "REST APIs", "n8n"],
  },
  {
    group: "Data",
    signal: "Ground",
    summary: "Structured storage and analysis for the evidence, metadata, and operational data behind each system.",
    application: "ChromaDB + BM25 for NeuralRAG retrieval corpora. SQL for text-to-SQL queries. Pandas/NumPy for data exploration.",
    items: ["SQL", "PostgreSQL", "MySQL", "ChromaDB", "Pandas", "NumPy"],
  },
  {
    group: "Product",
    signal: "Ship",
    summary: "Interfaces and delivery tooling that make complex AI behavior understandable and useful to people.",
    application: "React/TypeScript frontend for NeuralRAG. Both projects deployed to Render with Git-based delivery.",
    items: ["React", "TypeScript", "HTML", "CSS", "Git", "Render"],
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className={"project-card project-card-" + (index + 1)}>
      <div className="project-visual">
        <ProjectPreview type={project.preview} />
      </div>

      <div className="project-content">
        <p className="project-label">{project.label}</p>
        <h3>{project.title}</h3>
        <p className="project-summary">{project.summary}</p>

        {project.architecture && (
          <div className="project-architecture">
            <p className="project-architecture-label">Architecture</p>
            <pre>{project.architecture}</pre>
          </div>
        )}

        {project.highlights && (
          <div className="project-highlights">
            <p className="project-highlights-label">Engineering highlights</p>
            <ul>
              {project.highlights.map((item) => (
                <li key={item}><span aria-hidden="true" />{item}</li>
              ))}
            </ul>
          </div>
        )}

        {project.decision && (
          <div className="project-decision">
            <h4>{project.decision.title}</h4>
            <p>{project.decision.detail}</p>
          </div>
        )}

        {project.metrics && (
          <div className="project-metrics">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="project-metric">
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        )}

        <dl className="project-details">
          <div>
            <dt>My contribution</dt>
            <dd>{project.contribution}</dd>
          </div>
          <div>
            <dt>Technical challenge</dt>
            <dd>{project.challenge}</dd>
          </div>
        </dl>

        <div className="project-footer">
          <ul aria-label={project.title + " technologies"}>
            {project.tech.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <div className="project-links">
            {"link" in project && project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <ArrowUpRight size={16} aria-hidden="true" />
                Live Demo
                <ArrowUpRight size={14} aria-hidden="true" style={{ opacity: 0 }} />
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <Github size={16} aria-hidden="true" />
                Source code
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ShowcaseSection() {
  const [activeTab, setActiveTab] = useState<TabId>("projects");
  const [activeTechnologyIndex, setActiveTechnologyIndex] = useState(0);

  useEffect(() => {
    // Re-initialize EVE if React remounts the component (e.g. StrictMode or hot reload)
    if (typeof window !== "undefined" && (window as any).initEve) {
        setTimeout(() => (window as any).initEve(), 50);
    }
  }, []);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeTechnology = technologies[activeTechnologyIndex];

  const selectTab = (id: TabId, index?: number) => {
    setActiveTab(id);
    if (typeof index === "number") {
      tabRefs.current[index]?.focus({ preventScroll: true });
    }
  };

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();

    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = tabs.length - 1;

    selectTab(tabs[next].id, next);
  };

  return (
    <section className="showcase-section" aria-labelledby="showcase-title">
      <div className="section-heading showcase-heading">
        <div>
          <p className="section-kicker">Selected work</p>
          <h2 id="showcase-title">Systems you can inspect.</h2>
        </div>
        <p>
          Real interfaces and public repositories, with the engineering decisions behind each build.
        </p>
        
        <div className="eve-3d-wrapper showcase-id-card" style={{ position: 'relative', gridArea: 'showcase-card', minWidth: 0, height: '400px', isolation: 'isolate' }}>
            <div id="eve-3d-container" className="eve-3d-container" style={{ width: '100%', height: '100%', cursor: 'grab' }}></div>
            <div className="eve-label" style={{ position: 'absolute', top: '16px', left: '16px', zIndex: 10, color: 'rgba(255,255,255,0.85)' }}>
                <span className="eve-label-dot"></span>
                EVE — Portfolio Guide
            </div>
            <div className="eve-actions" style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <a href="#showcase" className="eve-action-btn" onClick={() => { if ((window as any).eveAnimate) (window as any).eveAnimate('wave'); }}>Projects</a>
                <a href="#decisions" className="eve-action-btn" onClick={() => { if ((window as any).eveAnimate) (window as any).eveAnimate('wave'); }}>Engineering</a>
                <Link to="/about" className="eve-action-btn" onClick={() => { if ((window as any).eveAnimate) (window as any).eveAnimate('wave'); }}>About</Link>
                <a href="#contact" className="eve-action-btn" onClick={() => { if ((window as any).eveAnimate) (window as any).eveAnimate('wave'); }}>Contact</a>
            </div>
        </div>
        <div className="showcase-tabs" role="tablist" aria-label="Portfolio content">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              ref={(element) => { tabRefs.current[index] = element; }}
              id={"tab-" + tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={"panel-" + tab.id}
              tabIndex={activeTab === tab.id ? 0 : -1}
              onClick={() => selectTab(tab.id)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>


      <div
        id={"panel-" + activeTab}
        role="tabpanel"
        aria-labelledby={"tab-" + activeTab}
        className="showcase-panel"
      >
        {activeTab === "projects" ? (
          <div className="project-grid">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
        ) : (
          <div className="technology-workbench">
            <header className="technology-overview technology-card">
              <p className="technology-status"><span aria-hidden="true" />Engineering map</p>
              <p>
                A practical stack organised by the role each layer plays—from grounding a model
                to shipping the interface around it.
              </p>
            </header>

            <div className="technology-layout">
              <div className="technology-rail technology-card" role="group" aria-label="Technology disciplines">
                {technologies.map((technology, index) => (
                  <button
                    key={technology.group}
                    type="button"
                    aria-pressed={activeTechnologyIndex === index}
                    aria-controls="technology-focus"
                    onClick={() => setActiveTechnologyIndex(index)}
                  >
                    <span className="technology-rail-copy">
                      <strong>{technology.group}</strong>
                      <small>{technology.signal}</small>
                    </span>
                    <span className="technology-rail-meta">{technology.items.length} tools</span>
                    <ChevronRight size={18} aria-hidden="true" />
                  </button>
                ))}
              </div>

              <section
                key={activeTechnology.group}
                id="technology-focus"
                className="technology-focus technology-card"
                aria-live="polite"
              >
                <header>
                  <p>{activeTechnology.signal}</p>
                  <h3>{activeTechnology.group}</h3>
                  <span>{activeTechnology.summary}</span>
                </header>

                <ul className="technology-capabilities">
                  {activeTechnology.items.map((item) => (
                    <li key={item}>
                      <span aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>

                <footer className="technology-application">
                  <p>Where it fits</p>
                  <span>{activeTechnology.application}</span>
                </footer>
              </section>
            </div>

            <ol className="technology-flow technology-card" aria-label="Engineering workflow">
              {technologies.map((technology) => (
                <li key={technology.signal}>
                  <span>{technology.signal}</span>
                  <small>{technology.group}</small>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </section>
  );
}