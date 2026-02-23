'use client';

import Link from 'next/link';
import { ArrowLeft, Server, Shield, Terminal } from 'lucide-react';

export default function DeployPage() {
  return (
    <div className="min-h-screen bg-black text-[#67e8f9] relative">
      <header className="glass-dark border-b border-[rgba(103,232,249,0.25)] px-6 py-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#c084fc] hover:text-[#67e8f9] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to MOONSHOT
          </Link>
          <h1
            className="text-3xl md:text-5xl font-bold neon-cyan"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            DEPLOY MOONSHOT — VPS / CLOUD
          </h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12 space-y-8">
        <section className="glass-card rounded-2xl border border-[rgba(103,232,249,0.35)] p-8 text-sm md:text-base">
          <div className="flex items-center gap-3 mb-4">
            <Server className="w-8 h-8 text-[#67e8f9]" />
            <span className="text-2xl font-bold text-white">Backend container</span>
          </div>
          <p className="text-[#94a3b8] mb-2">
            Build and run the FastAPI backend as a hardened container.
          </p>
          <pre className="bg-black/70 border border-[rgba(15,23,42,0.9)] rounded-xl p-4 mt-4 overflow-auto">
docker build -t moonshot-backend .{"\n"}
docker run -p 8000:8000 --restart always moonshot-backend
          </pre>
        </section>

        <section className="glass-card rounded-2xl border border-[rgba(56,189,248,0.4)] p-8 text-sm md:text-base">
          <div className="flex items-center gap-3 mb-4">
            <Terminal className="w-8 h-8 text-[#22d3ee]" />
            <span className="text-2xl font-bold text-white">VPS bootstrap</span>
          </div>
          <ul className="list-disc pl-5 space-y-2 text-[#94a3b8]">
            <li>Provision Ubuntu VPS (DigitalOcean, AWS, etc)</li>
            <li>Install Docker: <code>sudo apt update && sudo apt install -y docker.io</code></li>
            <li>Clone repo and build backend container on the VPS</li>
            <li>Use <code>docker compose up -d</code> if you add a compose file</li>
          </ul>
        </section>

        <section className="glass-card rounded-2xl border border-[rgba(250,204,21,0.4)] p-8 text-sm md:text-base">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-[#facc15]" />
            <span className="text-2xl font-bold text-white">Production hardening</span>
          </div>
          <ul className="list-disc pl-5 space-y-2 text-[#94a3b8]">
            <li>Put nginx or Caddy in front of the backend</li>
            <li>Terminate TLS (Let&apos;s Encrypt) and forward to <code>localhost:8000</code></li>
            <li>Lock down firewall to only 80/443 + SSH</li>
            <li>Run the frontend (Next.js) as a separate container or Vercel deployment</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
