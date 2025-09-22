import React from "react";

function About() {
  return (
    <div className="mt-16 max-w-6xl mx-auto px-4">
      {/* Intro */}
      <div className="rounded-2xl bg-white/90 backdrop-blur p-8 border border-gray-100 shadow-xl">
        <h2 className="text-3xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-purple-700">About SubDub</h2>
        <p className="text-gray-700 mb-4">
          SubDub keeps all your recurring services in one tidy dashboard, reminds you before renewals,
          and helps you decide what to cancel or keep.
        </p>
        <p className="text-gray-700">
          Built with React + Vite on the frontend and a Node.js/Express API with MongoDB,
          secured by JWT auth and rate‑limiting. Styled with TailwindCSS for speed and consistency.
        </p>
      </div>

      {/* Features */}
      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "Unified dashboard", desc: "See all subscriptions, costs, and next renewal dates in one place." },
          { title: "Smart reminders", desc: "Email nudges before renewals so you’re never surprised." },
          { title: "One‑click cancel", desc: "Quickly mark plans as cancelled and update your budget instantly." },
          { title: "Secure by default", desc: "JWT auth and sensible rate limits protect your data and API." },
          { title: "Fast and responsive", desc: "Vite + Tailwind for a snappy UX across devices." },
          { title: "Extensible", desc: "Clean API and components make it easy to add new features." },
        ].map((f) => (
          <div key={f.title} className="rounded-xl border border-gray-100 bg-white/90 p-5 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-gray-900">{f.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Tech */}
      <div className="mt-10 rounded-2xl bg-white/80 border border-gray-100 p-6">
        <h4 className="font-semibold text-gray-900 mb-3">Tech stack</h4>
        <div className="flex flex-wrap gap-2">
          {["React", "Vite", "TailwindCSS", "Node.js", "Express", "MongoDB", "JWT"].map((t) => (
            <span key={t} className="px-2.5 py-1 text-xs rounded-full bg-gray-100 text-gray-700 border border-gray-200">{t}</span>
          ))}
        </div>
      </div>

      {/* Roadmap */}
      <div className="mt-10 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <h4 className="font-semibold text-gray-900">Roadmap</h4>
          <p className="text-sm text-gray-600">What we’re building next.</p>
        </div>
        <ol className="lg:col-span-2 relative border-s border-gray-200 pl-6">
          {[
            { when: "Now", what: "Export CSV and monthly spend insights" },
            { when: "Soon", what: "Push notifications and calendar sync" },
            { when: "Later", what: "Team/workspace support and shared plans" },
          ].map((i) => (
            <li key={i.what} className="mb-6">
              <div className="absolute -left-[7px] mt-1.5 h-3 w-3 rounded-full bg-blue-500" />
              <p className="text-sm font-medium text-gray-900">{i.when}</p>
              <p className="text-sm text-gray-600">{i.what}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default About;
