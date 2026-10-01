import { type PointerEvent } from "react";

export default function BandCard({ compact = false }: { compact?: boolean }) {
  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const horizontal = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const vertical = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;

    event.currentTarget.style.setProperty("--id-tilt-x", `${(-vertical * 4).toFixed(2)}deg`);
    event.currentTarget.style.setProperty("--id-tilt-y", `${(horizontal * 6).toFixed(2)}deg`);
  };

  const resetTilt = (element: HTMLDivElement) => {
    element.style.setProperty("--id-tilt-x", "0deg");
    element.style.setProperty("--id-tilt-y", "0deg");
    delete element.dataset.active;
  };

  return (
    <div
      className={`portfolio-id-stage${compact ? " is-compact" : ""}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={(event) => resetTilt(event.currentTarget)}
      onMouseLeave={(event) => resetTilt(event.currentTarget)}
      onPointerDown={(event) => {
        if (event.pointerType === "mouse") event.currentTarget.dataset.active = "true";
      }}
      onPointerUp={(event) => resetTilt(event.currentTarget)}
      onPointerCancel={(event) => resetTilt(event.currentTarget)}
    >
      <div className="portfolio-id-lanyard" aria-hidden="true">
        <span>THAMIZH</span>
      </div>
      <div className="portfolio-id-clip" aria-hidden="true"><span /></div>
      <figure className="portfolio-id-card">
        <img
          src={`${import.meta.env.BASE_URL}assets/card-face-enhanced.webp`}
          alt="Senthamizhvelan M portfolio identification card"
          draggable="false"
        />
      </figure>
    </div>
  );
}