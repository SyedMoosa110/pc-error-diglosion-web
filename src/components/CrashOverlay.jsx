import { Lock, Terminal } from 'lucide-react';

/** Fake crash-dump log lines */
const CRASH_LOGS = [
  '> AUDIO_STREAM: MAX_VOLUME_ACTIVE',
  '> KERNEL PANIC 0x7F · UNRECOVERABLE FAULT',
  '> MEMORY DUMP FAILED · ADDRESS 0xDEADBEEF',
  '> SYSTEM INTEGRITY: COMPROMISED',
  '> EMERGENCY SHUTDOWN: DENIED',
  '> AUDIO_STREAM: LOOPING 100% VOLUME',
];

/**
 * CrashOverlay — fullscreen lockdown overlay: black screen, cursor hidden,
 * glitchy ERROR_404 + terminal logs + disabled FORCE QUIT button. 😈
 * (Escape se prank abort hota hai — App.jsx mein safety net)
 */
export default function CrashOverlay({ crashed, completed }) {
  if (!crashed && !completed) return null;

  if (completed) {
    return (
      <div
        className="fixed inset-0 z-[80] flex items-center justify-center bg-black px-4 text-center select-none"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex flex-col items-center justify-center gap-6">
          <h1 className="font-mono text-7xl font-black uppercase tracking-wider text-red-600 drop-shadow-[0_0_40px_rgba(220,38,38,0.9)] sm:text-8xl md:text-9xl">
            FUCK YOU
          </h1>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-red-500/80 sm:text-sm">
            Sequence Complete · System Restored
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="anim-flicker fixed inset-0 z-[70] flex cursor-none flex-col overflow-hidden bg-black" role="dialog" aria-modal="true">
      {/* CRT effects */}
      <div className="scanlines absolute inset-0" />
      <div className="scanbeam absolute inset-x-0 top-0 h-40" />

      <div className="relative flex flex-1 flex-col items-center justify-center overflow-y-auto px-4 py-10 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.5em] text-red-500/70 sm:text-sm">Fatal System Error</p>

        {/* Glitch heading */}
        <h1 className="glitch font-mono mt-4 text-6xl font-bold tracking-tight text-red-500 sm:text-8xl lg:text-9xl">
          ERROR_404
        </h1>

        <h2 className="font-mono mt-6 text-xl font-bold uppercase tracking-[0.2em] text-red-500 sm:text-3xl">
          System Crashed...
        </h2>
        <p className="font-mono mt-3 text-sm font-semibold uppercase tracking-[0.25em] text-red-400 sm:text-lg">
          Baawlay ho gaye ho kya?
        </p>

        {/* Terminal crash dump */}
        <div className="card-dark mt-8 w-full max-w-xl p-5 text-left font-mono text-[11px] leading-relaxed text-red-400/90 sm:text-xs">
          <div className="mb-3 flex items-center justify-between border-b border-white/5 pb-3">
            <span className="flex items-center gap-2 font-semibold uppercase tracking-widest text-gray-400">
              <Terminal className="h-3.5 w-3.5" />
              crash-dump.log
            </span>
            <span className="anim-blink h-2 w-2 rounded-full bg-red-500" />
          </div>
          {CRASH_LOGS.map((line) => (
            <p key={line} className="whitespace-pre-wrap break-words">
              {line}
            </p>
          ))}
          <p className="anim-blink mt-2 text-red-500">_</p>
        </div>

        {/* Disabled force quit */}
        <button
          disabled
          title="System locked — operator intervention required"
          className="mt-8 inline-flex cursor-not-allowed items-center gap-2.5 rounded-lg border border-red-500/20 bg-red-500/5 px-8 py-4 font-mono text-sm font-bold uppercase tracking-[0.15em] text-red-500/40"
        >
          ⚠️ Force Quit (Unavailable)
        </button>

        <p className="mt-4 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.3em] text-gray-600">
          <Lock className="h-3 w-3" />
          System locked · contact your local prank engineer
        </p>
      </div>

      {/* Bottom status bar */}
      <div className="relative flex items-center justify-between gap-3 border-t border-red-500/20 bg-black/80 px-4 py-3 font-mono text-[10px] uppercase tracking-widest text-red-500/80 sm:px-8">
        <span className="anim-blink flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
          System Status: Crashed
        </span>
        <span className="hidden sm:inline">Kernel Panic 0x7F · irq 13: spurious</span>
        <span>Kernel_Core v2.0</span>
      </div>
    </div>
  );
}