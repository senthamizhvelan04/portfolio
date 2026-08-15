type ProjectPreviewType = "neural" | "research";

export default function ProjectPreview({ type }: { type: ProjectPreviewType }) {
  if (type === "neural") {
    return (
      <div className="relative h-full w-full overflow-hidden bg-[#151a1e]">
        <img
          src={`${import.meta.env.BASE_URL}assets/neural-rag-v4.png`}
          alt="NeuralRAG System Ready interface"
          className="h-full w-full object-cover object-top brightness-[1.08] contrast-[1.04]"
          loading="lazy"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 65% 18%, rgba(34, 168, 255, 0.09), transparent 25%), linear-gradient(to bottom, transparent 58%, rgba(8, 11, 14, 0.42) 100%)",
          }}
        />
        <div className="pointer-events-none absolute inset-0 border border-white/[0.05] shadow-[inset_0_0_24px_rgba(0,0,0,0.2)]" />
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      <img
        src={`${import.meta.env.BASE_URL}assets/research-agent-v2.png`}
        alt="AI-Powered Research Agent interface"
        className="h-full w-full object-cover object-top brightness-[1.22] contrast-[1.08]"
        loading="lazy"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 38%, rgba(255, 255, 255, 0.035), transparent 32%), linear-gradient(to bottom, transparent 60%, rgba(0, 0, 0, 0.45) 100%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 border border-white/[0.05] shadow-[inset_0_0_24px_rgba(0,0,0,0.28)]" />
    </div>
  );
}