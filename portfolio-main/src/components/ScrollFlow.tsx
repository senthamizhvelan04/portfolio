import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const flowGroups = [
  { selector: ".intro-rail", variant: "up" },
  { selector: ".proof-bar-headline", variant: "scale" },
  { selector: ".proof-bar-stat", variant: "up" },
  { selector: ".proof-bar-experience", variant: "card" },
  { selector: ".expertise-heading", variant: "scale" },
  { selector: ".capability-item", variant: "up" },
  { selector: ".skill-list", variant: "up" },
  { selector: ".proof-stat", variant: "up" },
  { selector: ".experience-list > li", variant: "up" },
  { selector: ".about-proof-list li", variant: "up" },
  { selector: ".section-heading", variant: "scale" },
  { selector: ".showcase-tabs", variant: "up" },
  { selector: ".project-card", variant: "card" },
  { selector: ".technology-card", variant: "card" },
  { selector: ".decisions-header", variant: "scale" },
  { selector: ".decision-card", variant: "up" },
  { selector: ".contact-intro", variant: "left" },
  { selector: ".contact-form", variant: "card" },
  { selector: ".statement-footer", variant: "up" },
  { selector: ".about-intro", variant: "scale" },
  { selector: ".about-document > section", variant: "up" },
] as const;

export default function ScrollFlow() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets: HTMLElement[] = [];

    flowGroups.forEach(({ selector, variant }) => {
      document.querySelectorAll<HTMLElement>(selector).forEach((target, index) => {
        target.dataset.flow = variant;
        target.style.setProperty("--flow-index", String(index % 4));
        target.classList.add("flow-pending");
        targets.push(target);
      });
    });

    if (reducedMotion || !("IntersectionObserver" in window)) {
      targets.forEach((target) => target.classList.add("flow-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("flow-visible", entry.isIntersecting);
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}