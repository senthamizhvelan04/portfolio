import { ArrowUpRight } from 'lucide-react';

const stats = [
  { value: '20%', label: 'workflow processing time reduced' },
  { value: '27MB', label: 'production Docker image size' },
  { value: '<1min', label: 'automated deployment time' },
  { value: '10', label: 'incident runbooks built' },
  { value: 'OIDC', label: 'GitHub to AWS authentication' },
];

export default function ProofBar() {
  return (
    <section className="proof-bar" aria-label="Engineering proof">
      <div className="proof-bar-metrics">
        <h2 className="proof-bar-headline">Built systems, not just demos.</h2>
        <div className="proof-bar-grid">
          {stats.map((stat, index) => (
            <div key={index} className="proof-bar-stat">
              <div className="proof-bar-stat-value">{stat.value}</div>
              <div className="proof-bar-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="proof-bar-experience">
        <div className="section-kicker">Professional experience</div>
        <div className="proof-bar-experience-header">
          <h3 className="proof-bar-experience-role">AI Intern — HEPL</h3>
          <span className="proof-bar-experience-period">Feb 2026 – Aug 2026</span>
        </div>
        <ul className="proof-bar-experience-list">
          <li>RAG-based knowledge retrieval systems via REST APIs</li>
          <li>MCP integrations connecting LLMs to internal tools</li>
          <li>Automated n8n business pipelines (20% time reduction)</li>
          <li>REST API delivery for internal tools</li>
        </ul>
      </div>
    </section>
  );
}
