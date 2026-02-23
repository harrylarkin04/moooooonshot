'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { GitBranch, ArrowLeft, Play } from 'lucide-react';

type CausalResult = {
  variable?: string;
  strength?: string | number;
  timestamp?: string;
};

export default function CausalPage() {
  const [results, setResults] = useState<CausalResult[]>([]);
  const [loading, setLoading] = useState(false);

  const runCausal = async () => {
    setLoading(true);
    try {
      const r = await fetch('http://127.0.0.1:8000/causal/pcmci?data=example');
      const data = await r.json();
      setResults(Array.isArray(data) ? data : [data]);
    } catch {
      setResults([{ variable: 'Error', strength: 'Backend unreachable', timestamp: '—' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-[#67e8f9] relative">
      <header className="glass-dark border-b border-[rgba(103,232,249,0.2)] px-6 py-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#c084fc] hover:text-[#67e8f9] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to MOONSHOT
          </Link>
          <h1
            className="text-4xl md:text-5xl font-bold neon-cyan"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            CAUSALFORGE — PCMCI++
          </h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={runCausal}
          disabled={loading}
          className="btn-moonshot w-full max-w-2xl mx-auto py-6 px-8 rounded-2xl text-xl font-bold flex items-center justify-center gap-3 mb-12"
        >
          {loading ? (
            'Running…'
          ) : (
            <>
              <Play className="w-6 h-6" />
              RUN TIGRAP PCMCI++ CAUSAL DISCOVERY
            </>
          )}
        </motion.button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {results.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card rounded-2xl border border-[rgba(168,85,247,0.3)] p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <GitBranch className="w-8 h-8 text-[#a855f7]" />
                <span className="text-2xl font-bold text-white">
                  {s.variable || 'Causal Link'}
                </span>
              </div>
              <p className="text-3xl neon-purple">
                Strength: {s.strength ?? 'N/A'}
              </p>
              <p className="text-sm text-[#94a3b8] mt-2">
                Discovered at {s.timestamp ?? 'now'}
              </p>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}

