import React from "react";

function Home() {
  return (
    <div className="mt-16">
      <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-5xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-purple-700">
            Track subscriptions effortlessly
          </h1>
          <p className="mt-4 text-gray-700 text-lg">
            SubDub keeps all your recurring services in one place, reminds you before renewals, and helps you save money.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="/subscriptions" className="px-5 py-3 rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 font-medium shadow">
              Go to Dashboard
            </a>
            <a href="/about" className="px-5 py-3 rounded-lg bg-white/80 backdrop-blur border border-gray-200 text-gray-800 hover:bg-white font-medium shadow">
              Learn More
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-2xl rounded-3xl" />
          <div className="relative rounded-3xl border border-gray-100 bg-white/90 p-6 shadow-xl">
            <div className="grid grid-cols-2 gap-4">
              {["Netflix", "Spotify", "iCloud", "Prime", "YouTube", "Notion"].map((name) => (
                <div key={name} className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <p className="font-semibold text-gray-800">{name}</p>
                  <p className="text-sm text-gray-500">Monthly</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Feature highlights */}
      <div className="max-w-6xl mx-auto px-4 mt-14 grid md:grid-cols-3 gap-6">
        {[{title:"Never miss renewals",desc:"Smart reminders before due dates."},{title:"Know your spend",desc:"See monthly totals at a glance."},{title:"One place for all",desc:"Track every service effortlessly."}].map(f => (
          <div key={f.title} className="rounded-xl border border-gray-100 bg-white/90 p-5 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-gray-900">{f.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Stats strip */}
      <div className="max-w-6xl mx-auto px-4 mt-10">
        <div className="grid sm:grid-cols-3 gap-4 rounded-2xl bg-white/80 border border-gray-100 p-6 text-center">
          <div>
            <p className="text-3xl font-extrabold text-gray-900">7d</p>
            <p className="text-sm text-gray-600">Reminder window</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-gray-900">$0</p>
            <p className="text-sm text-gray-600">Open source</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-gray-900"><span className="align-top">⚡</span> Fast</p>
            <p className="text-sm text-gray-600">Vite + Tailwind</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;