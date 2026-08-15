import { ArrowRight, Download } from "lucide-react";
import { Link } from "react-router-dom";

const capabilities = [
  {
    title: "Retrieval systems",
    detail: "Hybrid dense + sparse retrieval, grounded generation, and FastAPI delivery for knowledge-heavy workflows.",
  },
  {
    title: "Agent workflows",
    detail: "Plan–Act–Observe–Reflect loops, tool/function calling, provider fallback, and explicit failure paths.",
  },
  {
    title: "Applied AI products",
    detail: "Full-stack interfaces and services that turn model capability into inspectable, deployable workflows.",
  },
];

const skills = ["Python", "RAG", "LangChain", "LLM agents", "FastAPI", "SQL", "ChromaDB", "React"];

const proof = [
  { value: "20%", label: "manual workflow time reduced" },
  { value: "500+", label: "documents in RAG knowledge access" },
  { value: "<2s", label: "RAG query response time" },
  { value: "70%", label: "information retrieval time reduced" },
  { value: "6", label: "tools in the NeuralRAG agent" },
  { value: "15", label: "reasoning iterations capped per query" },
];

export default function FrontendDeveloperSection() {
  return (
    <section className="expertise-section" aria-labelledby="expertise-title">
      <div className="expertise-heading">
        <p className="section-kicker">Available for AI/ML opportunities</p>
        <h2 id="expertise-title">AI systems, built end to end.</h2>
        <p>
          I work across retrieval, orchestration, APIs, and interface design—taking an AI idea
          from architecture to a working product with measurable constraints and failure paths.
        </p>
        <div className="expertise-actions">
          <Link className="button button-primary" to="/about">
            About me <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <a className="button button-secondary" href={`${import.meta.env.BASE_URL}assets/Senthamizhvelan_M_Resume.pdf`} download>
            Resume <Download size={16} aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="expertise-proof">
        <div className="capability-list">
          {capabilities.map((capability) => (
            <article key={capability.title} className="capability-item">
              <h3>{capability.title}</h3>
              <p>{capability.detail}</p>
            </article>
          ))}
        </div>
        <ul className="skill-list" aria-label="Primary technologies">
          {skills.map((skill) => <li key={skill}>{skill}</li>)}
        </ul>

        <div className="proof-grid" aria-label="Selected engineering outcomes">
          {proof.map((item) => (
            <article key={item.label} className="proof-stat">
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
