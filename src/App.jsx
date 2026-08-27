import { useCallback, useEffect, useState } from 'react';
import PortfolioView from './components/PortfolioView.jsx';
import CrashOverlay from './components/CrashOverlay.jsx';
import useCrashAudio from './hooks/useCrashAudio.js';

/**
 * App — do-phase state machine:
 *   crashed = false → professional "KERNEL_CORE v2.0" repair tool (The Trap)
 *   crashed = true  → fullscreen lockdown + loud audio + crash overlay (The Reveal)
 *
 * Trap: INITIALIZE SYSTEM REPAIR button, nav links, telemetry panels,
 * footer links — sab isi single handler se trigger karte hain.
 */
export default function App() {
  const [crashed, setCrashed] = useState(false);
  const [completed, setCompleted] = useState(false);
  const { play, stop } = useCrashAudio();

  // Completion cleanup: release keyboard lock, exit fullscreen, render message
  const handleSequenceComplete = useCallback(() => {
    // Release keyboard lock
    if (navigator.keyboard?.unlock) {
      try {
        navigator.keyboard.unlock();
      } catch (err) {
        console.warn('[Prank] Keyboard unlock error:', err);
      }
    }

    // Exit fullscreen
    if (document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => {});
    }

    setCrashed(false);
    setCompleted(true);
  }, []);

  // Trigger: fullscreen + keyboard lock + start 2-cycle audio playback
  const handleInitialize = useCallback(() => {
    if (crashed || completed) return;

    // Fullscreen mode
    document.documentElement.requestFullscreen?.().catch(() => {});

    // Chromium Keyboard Lock API
    if (navigator.keyboard?.lock) {
      navigator.keyboard.lock(['Escape', 'F11', 'KeyW']).catch(() => {});
    }

    setCrashed(true);
    setCompleted(false);

    // Start 2-cycle audio tracking
    play(() => {
      handleSequenceComplete();
    });
  }, [crashed, completed, play, handleSequenceComplete]);

  // Input Blocking & Tab Protection while playback is active
  useEffect(() => {
    if (!crashed) return;

    const BLOCKED_KEYS = ['Escape', 'F11', 'Tab', 'Alt'];

    const handleKeyDown = (e) => {
      if (BLOCKED_KEYS.includes(e.key) || e.altKey) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
      return '';
    };

    window.addEventListener('keydown', handleKeyDown, true);
    window.addEventListener('contextmenu', handleContextMenu, true);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
      window.removeEventListener('contextmenu', handleContextMenu, true);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [crashed]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-ink">
      {!crashed && !completed && (
        <PortfolioView onTrap={handleInitialize} />
      )}
      <CrashOverlay crashed={crashed} completed={completed} />
    </div>
  );
}