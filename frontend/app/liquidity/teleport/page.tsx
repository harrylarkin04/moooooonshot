'use client';

import Link from 'next/link';
import { ArrowLeft, Zap, Radar } from 'lucide-react';

export default function LiquidityTeleportPage() {
  return (
    <div className="min-h-screen bg-black text-[#67e8f9] relative">
      <header className="glass-dark border-b border-[rgba(56,189,248,0.35)] px-6 py-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Link
            href="/liquidity"
            className="inline-flex items-center gap-2 text-[#c084fc] hover:text-[#67e8f9] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to liquidity scanner
          </Link>
          <h1
            className="text-3xl md:text-5xl font-bold neon-cyan"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            LIQUIDITY TELEPORT ZONE
          </h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="glass-card rounded-2xl border border-[rgba(56,189,248,0.45)] p-8 md:p-12 text-sm md:text-base">
          <div className="flex items-center gap-4 mb-6">
            <Radar className="w-10 h-10 text-[#22d3ee]" />
            <div>
              <p className="text-2xl font-bold text-white">Teleport router</p>
              <p className="text-[#94a3b8]">
                Route flow to deepest pools with minimal slippage.
              </p>
            </div>
          </div>
          <p className="text-[#94a3b8] mb-4">
            In a full deployment, this panel becomes the control surface for
            routing orders to on-chain and off-exchange venues based on
            real-time liquidity maps computed by the backend.
          </p>
          <p className="text-[#94a3b8]">
            For now, it serves as a design anchor and navigation target. The core
            execution logic lives behind the <code>/liquidity</code> and MOONSHOT
            full-cycle APIs.
          </p>
          <button className="mt-6 px-6 py-4 rounded-xl bg-gradient-to-r from-[#22d3ee] to-[#a855f7] text-white font-semibold inline-flex items-center gap-2 opacity-80 cursor-not-allowed">
            <Zap className="w-5 h-5" />
            Teleport (wire backend to enable)
          </button>
        </div>
      </main>
    </div>
  );
}

