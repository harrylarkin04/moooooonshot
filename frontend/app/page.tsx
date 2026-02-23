'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  GitBranch,
  Dna,
  Users,
  Globe,
  Ship,
  Droplets,
  Rocket,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import MatrixRain from './components/MatrixRain';
import HolographicGlobe from './components/HolographicGlobe';

const ENGINES = [
  {
    name: 'CausalForge',
    tagline: 'PCMCI++ causal DAGs + persistence scores',
    href: '/causal',
    icon: GitBranch,
    border: 'border-[rgba(103,232,249,0.4)]',
    glow: 'shadow-[0_0_30px_rgba(103,232,249,0.15)]',
  },
  {
    name: 'EvoAlpha Zoo',
    tagline: 'Darwinian strategy evolution — survival of the fittest',
    href: '/evo',
    icon: Dna,
    border: 'border-[rgba(168,85,247,0.4)]',
    glow: 'shadow-[0_0_30px_rgba(168,85,247,0.15)]',
  },
  {
    name: 'ShadowCrowd + Teleporter',
    tagline: 'Zero-footprint execution + cascade prediction',
    href: '/shadowcrowd',
    icon: Users,
    border: 'border-[rgba(236,72,153,0.4)]',
    glow: 'shadow-[0_0_30px_rgba(236,72,153,0.15)]',
  },
  {
    name: 'Omniverse',
    tagline: '10,000 never-seen futures — diffusion engine',
    href: '/omniverse',
    icon: Globe,
    border: 'border-[rgba(192,132,252,0.4)]',
    glow: 'shadow-[0_0_30px_rgba(192,132,252,0.15)]',
  },
  {
    name: 'Nautilus',
    tagline: 'Real tick multi-strategy backtest parity',
    href: '/nautilus',
    icon: Ship,
    border: 'border-[rgba(59,130,246,0.4)]',
    glow: 'shadow-[0_0_30px_rgba(59,130,246,0.15)]',
  },
  {
    name: 'Liquidity',
    tagline: 'Market flow scanner + teleport to liquidity',
    href: '/liquidity',
    icon: Droplets,
    border: 'border-[rgba(34,211,238,0.4)]',
    glow: 'shadow-[0_0_30px_rgba(34,211,238,0.15)]',
  },
] as const;

function fireConfetti() {
  const duration = 2500;
  const end = Date.now() + duration;
  const colors = ['#67e8f9', '#c084fc', '#a855f7', '#3b82f6'];

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0.2, y: 0.7 },
      colors,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 0.8, y: 0.7 },
      colors,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
  confetti({ particleCount: 120, spread: 100, origin: { y: 0.6 }, colors });
}

export default function MoonshotDashboard() {
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runFullCycle = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch('http://127.0.0.1:8000/demo/full-cycle', { method: 'POST' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setResult(data);
      fireConfetti();
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Backend unreachable';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-[#67e8f9] overflow-x-hidden relative">
      <MatrixRain />

      {/* Header */}
      <header className="relative z-10 glass-dark border-b border-[rgba(103,232,249,0.2)] px-6 py-6 md:px-10 md:py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h1
            data-text="MOONSHOT"
            className="glitch text-5xl md:text-7xl font-bold tracking-tighter neon-cyan"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            MOONSHOT
          </h1>
          <p className="text-lg md:text-xl text-[#c084fc]/90 tracking-wide" style={{ fontFamily: 'var(--font-display)' }}>
            2026 • CLOSED-LOOP QUANT SINGULARITY
          </p>
        </div>
      </header>

      {/* 3D Globe */}
      <section className="relative z-10 px-4 md:px-8 pt-8 pb-6">
        <div className="max-w-6xl mx-auto">
          <HolographicGlobe />
        </div>
      </section>

      {/* Engine cards */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {ENGINES.map((engine, i) => {
            const Icon = engine.icon;
            return (
              <motion.div
                key={engine.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`float float-delay-${(i % 3) + 1}`}
              >
                <Link href={engine.href}>
                  <div
                    className={`glass-card rounded-2xl p-6 md:p-8 h-full border ${engine.border} ${engine.glow} hover:border-[rgba(103,232,249,0.5)] transition-all duration-300 cursor-pointer`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[#67e8f9]">
                        <Icon className="w-8 h-8" strokeWidth={1.5} />
                      </span>
                      <h2 className="text-xl md:text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                        {engine.name}
                      </h2>
                    </div>
                    <p className="text-sm text-[#94a3b8] leading-relaxed">{engine.tagline}</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* RUN FULL MOONSHOT CYCLE */}
        <div className="mt-12 md:mt-16 text-center">
          <motion.button
            whileHover={loading ? {} : { scale: 1.02 }}
            whileTap={loading ? {} : { scale: 0.98 }}
            onClick={runFullCycle}
            disabled={loading}
            className="btn-moonshot w-full max-w-3xl mx-auto py-6 md:py-8 px-6 text-2xl md:text-4xl font-bold rounded-2xl flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <Loader2 className="w-10 h-10 animate-spin" />
                RUNNING FULL CLOSED LOOP…
              </>
            ) : (
              <>
                <Rocket className="w-10 h-10 md:w-12 md:h-12" />
                RUN FULL MOONSHOT CYCLE — 60 SECONDS DEMO
              </>
            )}
          </motion.button>
          <p className="mt-5 text-[#c084fc]/80 text-base md:text-xl max-w-2xl mx-auto">
            One click = causal hypothesis → evolution → Omniverse stress-test → Nautilus execution
          </p>
        </div>

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 glass rounded-2xl border border-red-500/50 p-6 flex items-center gap-4"
          >
            <AlertCircle className="w-10 h-10 text-red-400 shrink-0" />
            <div>
              <p className="text-red-300 font-semibold">Request failed</p>
              <p className="text-sm text-red-200/80 mt-1">{error}. Ensure backend is running at http://127.0.0.1:8000</p>
            </div>
          </motion.div>
        )}

        {/* Results panel */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 results-panel rounded-2xl p-6 md:p-10"
          >
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle2 className="w-10 h-10 text-[#67e8f9]" />
              <h3 className="text-2xl md:text-4xl font-bold neon-cyan" style={{ fontFamily: 'var(--font-display)' }}>
                FULL CYCLE COMPLETE — MOONSHOT READY
              </h3>
            </div>
            <div className="bg-black/60 rounded-xl p-6 overflow-auto max-h-[60vh]">
              <pre className="text-sm md:text-base text-[#67e8f9]/95 font-mono whitespace-pre-wrap break-words">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          </motion.div>
        )}
      </section>

      <footer className="relative z-10 border-t border-[rgba(103,232,249,0.15)] py-6 mt-12">
        <p className="text-center text-sm text-[#64748b]">
          MOONSHOT — CausalForge • EvoAlpha Zoo • ShadowCrowd • Omniverse • Nautilus • Liquidity
        </p>
      </footer>
    </div>
  );
}
