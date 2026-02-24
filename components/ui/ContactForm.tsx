"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ContactForm() {
  const searchParams = useSearchParams();
  const prefillSubject = searchParams.get("subject") || "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: prefillSubject,
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("sent");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-foreground">Thank you for your message!</p>
        <p className="text-sm text-muted mt-2">
          I&apos;ll get back to you as soon as possible.
        </p>
      </div>
    );
  }

  const inputClasses =
    "w-full bg-transparent border border-border rounded-sm px-4 py-3 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
      <div>
        <label htmlFor="name" className="block text-sm text-muted mb-2">
          Name
        </label>
        <input
          id="name"
          type="text"
          required
          className={inputClasses}
          placeholder="Your name"
          value={formData.name}
          onChange={(e) =>
            setFormData((d) => ({ ...d, name: e.target.value }))
          }
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm text-muted mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          className={inputClasses}
          placeholder="your@email.com"
          value={formData.email}
          onChange={(e) =>
            setFormData((d) => ({ ...d, email: e.target.value }))
          }
        />
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm text-muted mb-2">
          Subject
        </label>
        <input
          id="subject"
          type="text"
          required
          className={inputClasses}
          placeholder="Project, collaboration..."
          value={formData.subject}
          onChange={(e) =>
            setFormData((d) => ({ ...d, subject: e.target.value }))
          }
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm text-muted mb-2">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={6}
          className={inputClasses + " resize-none"}
          placeholder="Tell me about your project..."
          value={formData.message}
          onChange={(e) =>
            setFormData((d) => ({ ...d, message: e.target.value }))
          }
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full py-3 text-sm tracking-wide uppercase bg-foreground text-background rounded-sm hover:bg-accent transition-colors disabled:opacity-50"
      >
        {status === "sending" ? "Sending..." : "Send message"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-400 text-center">
          Something went wrong. Please try again or email directly.
        </p>
      )}
    </form>
  );
}
