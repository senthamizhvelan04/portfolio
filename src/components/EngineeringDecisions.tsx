export default function EngineeringDecisions() {
  const decisions = [
    {
      title: "Why hybrid search?",
      answer: "Dense retrieval captures semantic similarity, but misses exact keywords. BM25 handles keyword matching. Combining both in NeuralRAG catches queries that either approach alone would miss.",
      project: "NeuralRAG"
    },
    {
      title: "Why provider fallback?",
      answer: "LLM APIs can fail or hit rate limits mid-research. The agent falls back from Groq Llama 3.3 70B to Gemini 2.0 Flash automatically, so a research session never fails silently.",
      project: "Research Agent"
    },
    {
      title: "Why disable FlashRank?",
      answer: "FlashRank improved retrieval ranking but introduced unacceptable latency under the deployment platform's 30-second request limit. After profiling, I disabled it in production and prioritized predictable response time.",
      project: "NeuralRAG"
    },
    {
      title: "Why SELECT-only SQL?",
      answer: "Restricting generated SQL to SELECT statements reduces the risk of destructive database operations. The text-to-SQL tool rejects any query containing INSERT, UPDATE, DELETE, or DROP.",
      project: "NeuralRAG"
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
