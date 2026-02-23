'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Droplets, ArrowLeft, Play, Zap } from 'lucide-react';

type LiquidityPoint = {
  pool?: string;
  tvl?: string | number;
  volume_24h?: string | number;
};

export default function LiquidityPage() {
  const [results, setResults] = useState<LiquidityPoint[]>([]);
  const [loading, setLoading] = useState(false);

  const scanLiquidity = async () => {
    setLoading(true);
    try {
      const r = await fetch('http://127.0.0.1:8000/liquidity/scan');
      const data = await r.json();
      setResults(Array.isArray(data) ? data : [data]);
    } catch {
      setResults([{ pool: 'Error', tvl: '—', volume_24h: 'Backend unreachable' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-[#67e8f9] relative">
      <header className="glass-dark border-b border-[rgba(34,211,238,0.2)] px-6 py-6">
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
            LIQUIDITY TELEPORT
          </h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex flex-wrap gap-4 mb-12">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={scanLiquidity}
            disabled={loading}
            className="btn-moonshot py-6 px-8 rounded-2xl text-lg font-bold flex items-center justify-center gap-3"
          >
            {loading ? (
              'Scanning…'
            ) : (
              <>
                <Play className="w-5 h-5" />
                SCAN LIQUIDITY FLOWS
              </>
            )}
          </motion.button>

          <Link href="/liquidity/teleport">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="py-6 px-8 rounded-2xl text-lg font-bold flex items-center gap-3 glass border border-[rgba(192,132,252,0.4)] text-[#c084fc] hover:border-[#c084fc] transition-colors"
            >
              <Zap className="w-5 h-5" />
              TELEPORT TO LIQUIDITY ZONE
            </motion.button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {results.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card rounded-2xl border border-[rgba(59,130,246,0.3)] p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <Droplets className="w-8 h-8 text-[#3b82f6]" />
                <span className="text-2xl font-bold text-white">
                  {s.pool ?? 'Pool'}
                </span>
              </div>
              <p className="text-2xl text-[#67e8f9]">
                TVL: ${s.tvl ?? '—'}
              </p>
              <p className="text-sm text-[#94a3b8] mt-2">
                VOLUME 24H {s.volume_24h ?? '—'}
              </p>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}

