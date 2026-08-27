import { useCallback, useRef } from 'react';

/**
 * useCrashAudio — room-filling prank audio engine.
 *
 * KERNEL_CORE v2.0 crash trigger: public/audio.stem.m4a ko
 * loop = true, volume = 1.0 par full blast bajaata hai.
 * Yeh hamesha user-click ke andar call hota hai, isliye
 * browser ki autoplay policy koi problem nahi banati.
 */
export default function useCrashAudio() {
  const audioRef = useRef(null);
  const cycleCountRef = useRef(0);
  const onCompleteRef = useRef(null);
  const endedHandlerRef = useRef(null);

  /** Main entry: play exactly 2 cycles with onComplete callback */
  const play = useCallback((onComplete) => {
    onCompleteRef.current = onComplete;
    cycleCountRef.current = 0;

    if (!audioRef.current) {
      const el = new Audio();
      el.src = import.meta.env.BASE_URL + 'audio.stem.m4a';
      el.preload = 'auto';
      audioRef.current = el;
    }
    const el = audioRef.current;

    // Clean up any lingering listener
    if (endedHandlerRef.current) {
      el.removeEventListener('ended', endedHandlerRef.current);
    }

    const handleEnded = () => {
      cycleCountRef.current += 1;
      if (cycleCountRef.current < 2) {
        el.currentTime = 0;
        el.play().catch(() => {});
      } else {
        el.removeEventListener('ended', handleEnded);
        endedHandlerRef.current = null;
        if (onCompleteRef.current) {
          onCompleteRef.current();
        }
      }
    };

    endedHandlerRef.current = handleEnded;
    el.addEventListener('ended', handleEnded);

    el.volume = 1.0;
    el.loop = false;
    el.currentTime = 0;
    el.play().catch(() => {});
  }, []);

  /** Stop & cleanup */
  const stop = useCallback(() => {
    const el = audioRef.current;
    if (el) {
      if (endedHandlerRef.current) {
        el.removeEventListener('ended', endedHandlerRef.current);
        endedHandlerRef.current = null;
      }
      el.pause();
      el.currentTime = 0;
    }
    cycleCountRef.current = 0;
  }, []);

  return { play, stop };
}