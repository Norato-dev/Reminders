import { useRef, useCallback } from "react";
import { playAlarm } from "../utils/audio";

export function useAlarm() {
  const audioCtxRef = useRef(null);

  const getAudioCtx = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtxRef.current.state === "suspended") audioCtxRef.current.resume();
    return audioCtxRef.current;
  };

  const triggerAlarm = useCallback(() => {
    playAlarm(getAudioCtx());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { triggerAlarm };
}
