'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Ship, ArrowLeft, Play } from 'lucide-react';

export default function NautilusPage() {
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(false);

  const run = async () => {
    setLoading(true);
    try {
      const r = await fetch('http://127.0.0.1:8000/nautilus/run');
      const data = await r.json();
      setResult(data);
    } catch {
      setResult({ error: 'Backend unreachable' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-[#67e8f9] relative">
      <header className="glass-dark border-b border-[rgba(59,130,246,0.2)] px-6 py-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#c084fc] hover:text-[#67e8f9] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to MOONSHOT
          </Link>
          <h1
            className="text-4xl md:text-5xl font-bold neon-electric"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            NAUTILUS — LIVE PARITY ENGINE
          </h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={run}
          disabled={loading}
          className="btn-moonshot w-full max-w-2xl mx-auto py-6 px-8 rounded-2xl text-xl font-bold flex items-center justify-center gap-3 mb-12"
        >
          {loading ? (
            'Running…'
          ) : (
            <>
              <Play className="w-6 h-6" />
              RUN REAL TICK MULTI-STRATEGY BACKTEST
            </>
          )}
        </motion.button>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl border border-[rgba(239,68,68,0.3)] p-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <Ship className="w-8 h-8 text-[#3b82f6]" />
              <span className="text-xl font-bold text-white">Backtest result</span>
            </div>
            <pre className="text-sm md:text-base text-[#67e8f9]/95 font-mono whitespace-pre-wrap break-words bg-black/50 p-6 rounded-xl overflow-auto max-h-[50vh]">
              {JSON.stringify(result, null, 2)}
            </pre>
          </motion.div>
        )}
      </main>
    </div>
  );
}

