'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Wallet } from 'lucide-react';

type PaperStatus = {
  buying_power?: number;
  cash?: number;
  equity?: number;
};

export default function PaperPage() {
  const [status, setStatus] = useState<PaperStatus | null>(null);
  const [loading, setLoading] = useState(false);

  const getPaperStatus = async () => {
    setLoading(true);
    try {
      const r = await fetch('http://127.0.0.1:8000/paper/status');
      const data = await r.json();
      setStatus(data);
    } catch {
      setStatus({ buying_power: 0, cash: 0, equity: 0 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-[#67e8f9] relative">
      <header className="glass-dark border-b border-[rgba(250,204,21,0.25)] px-6 py-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#c084fc] hover:text-[#67e8f9] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to MOONSHOT
          </Link>
          <h1
            className="text-3xl md:text-5xl font-bold text-[#facc15]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            $1M PAPER EXECUTION LAB — LIVE
          </h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={getPaperStatus}
          disabled={loading}
          className="btn-moonshot w-full max-w-2xl mx-auto py-6 px-8 rounded-2xl text-xl font-bold flex items-center justify-center gap-3 mb-12"
        >
          {loading ? 'Loading…' : 'GET LIVE PAPER STATUS'}
        </motion.button>

        {status && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl border border-[rgba(250,204,21,0.4)] p-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <Wallet className="w-9 h-9 text-[#facc15]" />
              <span className="text-2xl font-bold text-white">
                Paper account snapshot
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-[#94a3b8] mb-1">Buying Power</p>
                <p className="text-2xl text-[#facc15]">
                  ${status.buying_power?.toLocaleString() ?? '0'}
                </p>
              </div>
              <div>
                <p className="text-sm text-[#94a3b8] mb-1">Cash</p>
                <p className="text-2xl text-[#67e8f9]">
                  ${status.cash?.toLocaleString() ?? '0'}
                </p>
              </div>
              <div>
                <p className="text-sm text-[#94a3b8] mb-1">Equity</p>
                <p className="text-2xl text-[#a855f7]">
                  ${status.equity?.toLocaleString() ?? '0'}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
