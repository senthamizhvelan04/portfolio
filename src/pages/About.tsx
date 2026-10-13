import { ArrowLeft, ArrowUpRight, Download } from "lucide-react";
import { Link } from "react-router-dom";

const skillGroups = [
  { label: "Cloud & AWS", items: "EC2, VPC, IAM, S3, ECR, CloudWatch, EventBridge, SSM, ELB" },
  { label: "DevOps", items: "Docker, GitHub Actions, Terraform, CI/CD, GHCR, Nginx" },
  { label: "Linux & Networking", items: "Ubuntu, Bash, SSH, TCP/IP, Security Groups" },
  { label: "Monitoring", items: "Prometheus, Grafana, CloudWatch, Trivy" },
  { label: "Backend", items: "Python, boto3, pytest, FastAPI, SQL" },
];

const experience = [
  {
    role: "AI Intern",
    company: "HEPL (Hema's Enterprises Private Limited)",
    period: "Feb 2026 – Aug 2026",
    points: [
      "Reduced manual workflow processing time by 20% by designing and deploying automated n8n pipelines across internal business systems.",
      "Built and deployed RAG-based knowledge-retrieval systems integrated through REST API endpoints for internal information access.",
      "Implemented MCP integrations connecting LLM workflows to internal tools and data sources, extending automation beyond RPA-only pipelines.",
    ],
  },
];

const education = [
  {
    qualification: "Bachelor of Technology in Artificial Intelligence & Data Science",
    institution: "CK College of Engineering and Technology, Cuddalore",
    period: "2026",
    result: "CGPA 8.5/10",
  },
  {
    qualification: "Higher Secondary (12th)",
    institution: "Anandhan Memorial Metric HSS",
    result: "87.53%",
  },
  {
    qualification: "Secondary (10th)",
    institution: "Anandhan Memorial Metric HSS",
    result: "84.6%",
  },
];

export default function About() {
  return (
    <div className="about-page">
      <header className="about-nav">
        <Link to="/" className="text-link">
          <ArrowLeft size={16} aria-hidden="true" />
          Home
        </Link>
        <a className="button button-secondary" href={`${import.meta.env.BASE_URL}assets/Senthamizhvelan_M_Resume.pdf`} download>
          Resume <Download size={16} aria-hidden="true" />
        </a>
      </header>

      <main className="about-document">
        <header className="about-intro">
          <p className="section-kicker">About Senthamizhvelan M</p>
          <h1>I build cloud infrastructure from provisioning layer to deployment pipeline.</h1>
          <p className="about-lede">
            I’m a Cloud & DevOps engineer focused on production-minded AWS infrastructure,
            Docker containerization, CI/CD automation, and full-stack delivery.
          </p>
        </header>

        <section aria-labelledby="about-story">
          <h2 id="about-story">Background</h2>
          <p>
            My work sits between cloud infrastructure and practical software. I design scalable and
            secure architecture, expose it through dependable automation, and build pipelines that
            make complex deployments predictable for teams.
          </p>
          <p>
            During my internship at Hema's Enterprises Private Limited, I reduced manual workflow
            processing by 20%, built RAG systems handling 500+ internal documents, and implemented
            MCP integrations connecting LLM workflows to internal tools. That experience reinforced
            a principle I still follow: a system is useful only when its data flow, failure
            modes, and user experience are designed together.
          </p>
        </section>

        <section aria-labelledby="about-proof">
          <h2 id="about-proof">Selected proof</h2>
          <ul className="about-proof-list">
            <li><strong>20%</strong><span>reduction in manual workflow processing time</span></li>
            <li><strong>500+</strong><span>documents served through a RAG knowledge system</span></li>
            <li><strong>&lt;2s</strong><span>query response time in the RAG backend</span></li>
            <li><strong>70%</strong><span>reduction in information retrieval time</span></li>
            <li><strong>6</strong><span>dynamically toggled tools in CloudGuardian</span></li>
            <li><strong>15</strong><span>reasoning iterations capped per research query</span></li>
          </ul>
        </section>

        <section aria-labelledby="about-experience">
          <h2 id="about-experience">Experience</h2>
          <ul className="experience-list">
            {experience.map((entry) => (
              <li key={entry.company}>
                <div>
                  <h3>{entry.role}</h3>
                  <p>{entry.company}</p>
                </div>
                <span>{entry.period}</span>
                <ul>
                  {entry.points.map((point) => <li key={point}>{point}</li>)}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="about-work">
          <h2 id="about-work">Selected work</h2>
          <p>
            <strong>CloudGuardian</strong> combines explicitly registered remediation actions with risk-classification, 
            requiring human approval for sensitive operations before SSM execution.
            The <strong>ExamPrep</strong> project uses multi-stage Docker builds to reduce image size, 
            and publishes dual image tags to GHCR for traceability and instant rollbacks.
          </p>
          <a className="text-link" href="/#showcase">
            Inspect the projects <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </section>

        <section aria-labelledby="about-approach">
          <h2 id="about-approach">Engineering decisions</h2>
          <ul className="principle-list">
            <li><strong>Ground before generating.</strong> Retrieval quality, source verification, and traceability come first.</li>
            <li><strong>Design failure paths.</strong> Provider fallback, retries, iteration caps, and uncertainty are explicit parts of the system.</li>
            <li><strong>Profile before adding complexity.</strong> FlashRank reranking was disabled in production after profiling showed it could exceed the platform's 30-second request timeout.</li>
            <li><strong>Optimize for deployment constraints.</strong> GitHub OIDC eliminated long-lived AWS credentials from the CI/CD pipeline, generating short-lived tokens scoped to each workflow run.</li>
            <li><strong>Ship the whole workflow.</strong> APIs, UI, deployment, and operational constraints matter as much as the model call.</li>
          </ul>
        </section>

        <section aria-labelledby="about-education">
          <h2 id="about-education">Education</h2>
          <ul className="education-list">
            {education.map((entry) => (
              <li key={entry.qualification}>
                <div>
                  <h3>{entry.qualification}</h3>
                  <p>{entry.institution}</p>
                </div>
                <dl>
                  {entry.period && (
                    <div>
                      <dt>Year</dt>
                      <dd>{entry.period}</dd>
                    </div>
                  )}
                  <div>
                    <dt>Result</dt>
                    <dd>{entry.result}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="about-skills">
          <h2 id="about-skills">Working stack</h2>
          <dl className="about-skills">
            {skillGroups.map((group) => (
              <div key={group.label}>
                <dt>{group.label}</dt>
                <dd>{group.items}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="about-close" aria-labelledby="about-next">
          <h2 id="about-next">What I’m looking for</h2>
          <p>
            Cloud, DevOps, and Platform engineering opportunities where I can contribute to
            scalable, production-ready infrastructure while continuing to deepen my work in AWS,
            containerization, and reliable CI/CD systems.
          </p>
          <div className="about-actions">
            <a className="button button-primary" href="mailto:senthamizhvelanm@gmail.com">
              Email me
            </a>
            <a className="button button-secondary" href={`${import.meta.env.BASE_URL}assets/Senthamizhvelan_M_Resume.pdf`} download>
              Download resume
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
