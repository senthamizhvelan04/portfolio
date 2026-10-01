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
    title: "CloudGuardian",
    preview: "neural" as const,
    label: "AI-Assisted CloudOps Incident Response Platform",
    summary:
      "Event-driven AWS incident-response platform with automated detection, diagnosis, controlled remediation, and recovery verification.",
    contribution:
      "Full-stack cloud architecture, CI/CD pipeline, Docker containerization, OIDC authentication, SSM-based remediation engine.",
    challenge:
      "Implementing controlled remediation that prevents arbitrary command execution while still allowing automated recovery through allowlisted SSM actions with human approval gates.",
    tech: ["AWS", "Docker", "GitHub Actions", "Terraform", "FastAPI", "Prometheus", "EC2", "SSM"],
    github: "https://github.com/senthamizhvelan04/cloudguardian",
    architecture: `CloudWatch Alarm
       ↓
  EventBridge
       ↓
  API Gateway
       ↓
    FastAPI
       ↓
  Diagnosis Engine
  ├── Runbook Search
  └── Incident Rules
       ↓
   Risk Engine
       ↓
  Human Approval
       ↓
  SSM Execution
       ↓
 Recovery Verify`,
    highlights: [
      "Event-driven alarm pipeline via CloudWatch + EventBridge",
      "GitHub OIDC — no long-lived AWS credentials",
      "CI/CD with Ruff, pytest, Trivy security scanning",
      "Docker images published to Amazon ECR",
      "Allowlisted SSM remediation actions",
      "Risk-classified abort/rollback with human approval",
      "Prometheus metrics + health/readiness endpoints",
      "10 incident runbooks + Bash failure-injection scripts",
    ],
    decision: {
      title: "Why allowlisted remediation?",
      detail:
        "CloudGuardian never accepts arbitrary shell commands from the API. Remediation actions are explicitly registered and risk-classified. Sensitive actions require human approval before SSM execution, preventing an external request from turning into arbitrary command execution on the server.",
    },
    metrics: [
      { value: "10", label: "runbooks" },
      { value: "OIDC", label: "auth" },
      { value: "<1min", label: "deploy" },
    ],
  },
  {
    title: "ExamPrep",
    preview: "research" as const,
    label: "AI Question Paper Generator",
    summary:
      "Containerized React/Vite application deployed on AWS EC2 through a fully automated GitHub Actions CI/CD pipeline with Docker multi-stage builds.",
    contribution:
      "Docker containerization, CI/CD automation, EC2 deployment, multi-stage builds, GHCR image management, production troubleshooting.",
    challenge:
      "Troubleshooting real deployment issues — EC2 security groups blocking traffic, Docker daemon permission errors, and container replacement without downtime.",
    tech: ["AWS EC2", "Docker", "GitHub Actions", "GHCR", "Nginx", "React", "Vite", "SSH"],
    github: "https://github.com/senthamizhvelan04/Question-paper-generator",
    architecture: `git push (main)
       ↓
  GitHub Actions
  ├── Build Stage
  │   ├── Docker Build
  │   └── Push to GHCR
  └── Deploy Stage
      ├── SSH to EC2
      ├── Pull Image
      └── Run Container
           ↓
     Nginx → ExamPrep
       (Port 80)`,
    highlights: [
      "Multi-stage Dockerfile — 27 MB production image",
      "Dual image tags: latest + commit-SHA for rollback",
      "Automated EC2 deployment via SSH",
      "Container restart policies + health checks",
      "Gemini + Llama 3.3 70B with provider failover",
      "PDF and Word export functionality",
      "GitHub Secrets for credential management",
      "Nginx reverse proxy serving static assets",
    ],
    decision: {
      title: "Why multi-stage Docker builds?",
      detail:
        "The build stage uses Node.js 22 Alpine for compilation, but the production image only contains Nginx Alpine with the compiled static files. Node.js, npm, and source code are excluded entirely, reducing the image from hundreds of megabytes to approximately 27 MB.",
    },
    metrics: [
      { value: "27MB", label: "image" },
      { value: "2", label: "tags/build" },
      { value: "<1min", label: "deploy" },
    ],
  },
];

const technologies = [
  {
    group: "Cloud & AWS",
    signal: "Infrastructure",
    summary: "Core cloud infrastructure for compute, monitoring, and event-driven architecture.",
    application: "Used across CloudGuardian and ExamPrep for compute, monitoring, event routing, and deployment.",
    items: ["EC2", "VPC", "IAM", "S3", "ECR", "EBS", "RDS", "CloudWatch", "EventBridge", "API Gateway", "SSM", "SNS", "SQS", "ELB", "Auto Scaling", "Route 53", "CloudFront"],
  },
  {
    group: "DevOps & CI/CD",
    signal: "Automation",
    summary: "Automated pipelines for build, test, security scanning, and deployment.",
    application: "Built CI/CD pipelines with security scanning, multi-stage Docker builds, and automated EC2 deployments.",
    items: ["Git", "GitHub", "GitHub Actions", "Docker", "Docker Compose", "Terraform", "GHCR", "Nginx"],
  },
  {
    group: "Linux & Networking",
    signal: "System",
    summary: "Foundational operating system management and network configuration.",
    application: "Managed EC2 instances, configured networking, and automated infrastructure with shell scripts.",
    items: ["Ubuntu", "Bash", "SSH", "Nginx", "TCP/IP", "DNS", "HTTP/HTTPS", "Subnets", "Routing", "Security Groups", "Load Balancing"],
  },
  {
    group: "Monitoring & Security",
    signal: "Observability",
    summary: "Continuous monitoring, incident response, and security best practices.",
    application: "Implemented observability, security scanning, and incident detection across production systems.",
    items: ["Prometheus", "Grafana", "CloudWatch", "CloudTrail", "IAM Least Privilege", "Health Checks", "Secrets Management", "Incident Response", "Trivy"],
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