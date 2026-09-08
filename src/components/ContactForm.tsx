"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import type { Bike } from "@/lib/types";

const topics = [
  { value: "test-ride", label: "Book a test ride" },
  { value: "question", label: "Ask about a bike" },
  { value: "repair", label: "Book a repair" },
  { value: "wanted", label: "Tell me when a bike comes in" },
  { value: "other", label: "Something else" },
];

export function ContactForm({ bikes }: { bikes: Bike[] }) {
  const params = useSearchParams();
  const [topic, setTopic] = useState(params.get("topic") ?? "question");
  const [bike, setBike] = useState(params.get("bike") ?? "");
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="card p-6" role="status">
        <h2 className="text-xl font-semibold">Got it, thanks.</h2>
        <p className="mt-2 text-ink-2">
          We reply during opening hours, usually within a couple of hours. If it is a test ride, we will confirm the time and have the bike
          charged and ready.
        </p>
        <p className="mt-4 text-xs text-ink-2">Prototype note: nothing was actually sent. A real build would post this to the shop inbox and a CRM.</p>
      </div>
    );
  }

  const showBike = topic === "test-ride" || topic === "question";

  return (
    <form
      className="card grid gap-4 p-6"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <label className="grid gap-1 text-sm font-medium">
        What can we help with?
        <select className="field" value={topic} onChange={(e) => setTopic(e.target.value)}>
          {topics.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </label>

      {showBike && (
        <label className="grid gap-1 text-sm font-medium">
          Which bike?
          <select className="field" value={bike} onChange={(e) => setBike(e.target.value)}>
            <option value="">Not sure yet, help me choose</option>
            {bikes
              .filter((b) => b.status !== "sold")
              .map((b) => (
                <option key={b.slug} value={b.slug}>
                  {b.year} {b.brand} {b.model} (size {b.frameSize})
                </option>
              ))}
          </select>
        </label>
      )}

      {topic === "test-ride" && (
        <label className="grid gap-1 text-sm font-medium">
          When suits you?
          <input className="field" type="text" placeholder="e.g. Saturday morning, or any weekday after 4" required />
        </label>
      )}

      {topic === "repair" && (
        <label className="grid gap-1 text-sm font-medium">
          What bike is it, and what is it doing?
          <textarea className="field" rows={3} placeholder="Brand and model, plus the symptom. Error codes help." required />
        </label>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1 text-sm font-medium">
          Your name
          <input className="field" type="text" name="name" autoComplete="name" required />
        </label>
        <label className="grid gap-1 text-sm font-medium">
          Phone or email
          <input className="field" type="text" name="contact" autoComplete="tel" required />
        </label>
      </div>

      {topic !== "repair" && (
        <label className="grid gap-1 text-sm font-medium">
          Anything else?
          <textarea className="field" rows={3} placeholder="Your height helps us suggest a size. Commute distance helps with range." />
        </label>
      )}

      <button type="submit" className="btn btn-accent justify-self-start">
        Send
      </button>
    </form>
  );
}
