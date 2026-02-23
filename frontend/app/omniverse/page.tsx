'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Globe, ArrowLeft, Play } from 'lucide-react';

type OmniverseResult = {
  future?: string;
  score?: string | number;
  shock?: string;
};

export default function OmniversePage() {
  const [results, setResults] = useState<OmniverseResult[]>([]);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    try {
      const r = await fetch(
        'http://127.0.0.1:8000/omniverse/generate?shock=AI%20capex%20crash',
      );
      const data = await r.json();
      setResults(Array.isArray(data) ? data : [data]);
    } catch {
      setResults([{ future: 'Error', score: 'N/A', shock: 'Backend unreachable' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-[#67e8f9] relative">
      <header className="glass-dark border-b border-[rgba(192,132,252,0.2)] px-6 py-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#c084fc] hover:text-[#67e8f9] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to MOONSHOT
          </Link>
          <h1
            className="text-4xl md:text-5xl font-bold neon-magenta"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            OMNIVERSE FULL — DIFFUSION ENGINE
          </h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={generate}
          disabled={loading}
          className="btn-moonshot w-full max-w-2xl mx-auto py-6 px-8 rounded-2xl text-xl font-bold flex items-center justify-center gap-3 mb-12"
        >
          {loading ? (
            'Generating…'
          ) : (
            <>
              <Play className="w-6 h-6" />
              GENERATE FUTURES → OMNI DIFFUSION
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
                <Globe className="w-8 h-8 text-[#a855f7]" />
                <span className="text-xl font-bold text-white">
                  {s.future ?? 'Generated Future'}
                </span>
              </div>
              <p className="text-2xl neon-purple">
                Score: {s.score ?? 'N/A'}
              </p>
              <p className="text-sm text-[#94a3b8] mt-2">
                Shock: {s.shock ?? 'AI capex crash'}
              </p>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}

