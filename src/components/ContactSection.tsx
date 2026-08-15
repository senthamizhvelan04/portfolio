import { FormEvent, useState } from "react";
import { ArrowUpRight, Github, Linkedin, Mail, Send } from "lucide-react";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const text = encodeURIComponent(
      "Hello, my name is " + name.trim() + "\n\n" + message.trim()
    );
    window.open("https://wa.me/918015404762?text=" + text, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="contact-section" aria-labelledby="contact-title">
      <div className="contact-intro">
        <p className="section-kicker">Contact</p>
        <h2 id="contact-title">Let’s build something useful.</h2>
        <p>
          For AI engineering roles, project collaboration, or a technical conversation, email me
          directly or open a WhatsApp message.
        </p>

        <div className="contact-direct">
          <a href="mailto:senthamizhvelanm@gmail.com">
            <span>Email</span>
            <strong>senthamizhvelanm@gmail.com</strong>
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <a href="https://wa.me/918015404762" target="_blank" rel="noopener noreferrer">
            <span>WhatsApp</span>
            <strong>Start a conversation</strong>
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="contact-name">Your name</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Senthamizh"
            required
            aria-required="true"
          />
          <p>Used only to introduce your WhatsApp message.</p>
        </div>

        <div className="field">
          <label htmlFor="contact-message">Your message</label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Tell me about the role or project."
            required
            aria-required="true"
          />
          <p>WhatsApp opens only after you choose “Open WhatsApp.”</p>
        </div>

        <button
          className="button button-primary contact-submit"
          type="submit"
          disabled={!name.trim() || !message.trim()}
        >
          Open WhatsApp <Send size={16} aria-hidden="true" />
        </button>
      </form>

      <footer className="statement-footer">
        <p>Build the retrieval well. Make the reasoning visible. Ship the complete system.</p>
        <div>
          <span>Senthamizhvelan M · 2026</span>
          <nav aria-label="Social links">
            <a href="https://www.linkedin.com/in/senthamizhvelan" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin size={19} aria-hidden="true" />
            </a>
            <a href="https://github.com/senthamizhvelan04" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github size={19} aria-hidden="true" />
            </a>
            <a href="mailto:senthamizhvelanm@gmail.com" aria-label="Email">
              <Mail size={19} aria-hidden="true" />
            </a>
          </nav>
        </div>
      </footer>
    </section>
  );
}