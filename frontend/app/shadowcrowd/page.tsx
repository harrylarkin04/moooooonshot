'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Users, ArrowLeft, Zap } from 'lucide-react';

export default function ShadowCrowdPage() {
  const [status, setStatus] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-black text-[#67e8f9] relative">
      <header className="glass-dark border-b border-[rgba(236,72,153,0.3)] px-6 py-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#c084fc] hover:text-[#67e8f9] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to MOONSHOT
          </Link>
          <h1
            className="text-3xl md:text-5xl font-bold neon-magenta text-right"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            SHADOWCROWD + TELEPORTER
          </h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl border border-[rgba(236,72,153,0.3)] p-8 md:p-12"
        >
          <div className="flex items-center gap-4 mb-6">
            <Users className="w-10 h-10 text-[#ec4899]" />
            <div>
              <h2 className="text-2xl font-bold text-white">
                Zero-footprint execution
              </h2>
              <p className="text-[#94a3b8]">
                Cascade prediction + teleport to deepest liquidity.
              </p>
            </div>
          </div>

          <p className="text-[#94a3b8] mb-8">
            ShadowCrowd distributes orders across synthetic identities and latency
            layers, while Teleporter routes flow to optimal venues with minimal
            footprint. Trigger from the main MOONSHOT cycle or monitor here.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() =>
                setStatus(
                  'ShadowCrowd endpoints exposed via backend. Use the main MOONSHOT cycle for coordinated execution.',
                )
              }
              className="px-6 py-4 rounded-xl bg-gradient-to-r from-[#ec4899] to-[#a855f7] text-white font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <Zap className="w-5 h-5" />
              Check orchestration status
            </button>

            <Link
              href="/liquidity"
              className="px-6 py-4 rounded-xl glass border border-[rgba(103,232,249,0.3)] text-[#67e8f9] font-semibold hover:border-[#67e8f9] transition-colors"
            >
              Liquidity Teleport →
            </Link>
          </div>

          {status && (
            <div className="mt-6 p-4 rounded-xl bg-black/50 border border-[rgba(236,72,153,0.3)] text-[#f9a8d4] text-sm">
              {status}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}

