import { ArrowRight, Download } from "lucide-react";
import { Link } from "react-router-dom";

const capabilities = [
  {
    title: "AWS Infrastructure",
    detail: "Building and managing cloud resources with EC2, VPC, IAM, S3, and auto-scaling.",
  },
  {
    title: "CI/CD Automation",
    detail: "End-to-end pipelines with GitHub Actions, Docker builds, and automated deployments.",
  },
  {
    title: "Containerization",
    detail: "Docker multi-stage builds, container orchestration, and production optimization.",
  },
  {
    title: "Infrastructure Monitoring",
    detail: "Prometheus, CloudWatch, health checks, and incident response automation.",
  },
];

const skills = ["AWS", "Docker", "Terraform", "GitHub Actions", "CI/CD", "Linux", "Prometheus", "Python"];

const proof = [
  { value: "10", label: "incident runbooks built" },
  { value: "27MB", label: "production Docker image size" },
  { value: "<1min", label: "automated deployment time" },
  { value: "OIDC", label: "GitHub to AWS authentication" },
  { value: "20%", label: "workflow processing time reduced" },
  { value: "0", label: "long-lived credentials in CI/CD" },
];

export default function FrontendDeveloperSection() {
  return (
    <section className="expertise-section" aria-labelledby="expertise-title">
      <div className="expertise-heading">
        <p className="section-kicker">Available for Cloud & DevOps opportunities</p>
        <h2 id="expertise-title">Cloud systems, built end to end.</h2>
        <p>
          I work across AWS infrastructure, CI/CD automation, containerization, and monitoring—taking
          cloud systems from architecture to production with measurable constraints and automated recovery.
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
