export default function EngineeringDecisions() {
  const decisions = [
    {
      title: "Why allowlisted remediation?",
      answer: "CloudGuardian never accepts arbitrary shell commands from the API. Remediation actions are explicitly registered and risk-classified. Sensitive operations like service restarts require human approval before SSM execution.",
      project: "CloudGuardian"
    },
    {
      title: "Why GitHub OIDC?",
      answer: "Long-lived AWS access keys in CI/CD pipelines are a security risk. GitHub OIDC generates short-lived credentials scoped to each workflow run, eliminating stored secrets and reducing the blast radius of a compromised pipeline.",
      project: "CloudGuardian"
    },
    {
      title: "Why multi-stage Docker builds?",
      answer: "The build stage compiles the React app with Node.js, but the production image contains only Nginx Alpine and static files. Node.js, npm, and source code are excluded — reducing the image from hundreds of megabytes to 27 MB.",
      project: "ExamPrep"
    },
    {
      title: "Why dual image tags?",
      answer: "Every CI/CD build publishes both a latest tag and a commit-SHA tag to GHCR. The latest tag simplifies deployment. The SHA tag provides traceability and enables instant rollback to any previous build without rebuilding.",
      project: "ExamPrep"
    }
  ];

  return (
    <section id="decisions" className="decisions-section" aria-labelledby="decisions-title">
      <div className="decisions-header">
        <p className="section-kicker">Engineering thinking</p>
        <h2 id="decisions-title">Why I built it that way.</h2>
        <p>Real engineering decisions from production systems — each one backed by measurement, constraints, or failure analysis.</p>
      </div>

      <div className="decisions-grid">
        {decisions.map((decision, index) => (
          <article key={index} className="decision-card">
            <h3>{decision.title}</h3>
            <p>{decision.answer}</p>
            <span className="decision-project">{decision.project}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
