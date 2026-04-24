function playSegments(ctx, segments, oscType, vol) {
  const now = ctx.currentTime;
  segments.forEach(({ f1, f2, t, dur }) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = oscType;
    osc.frequency.setValueAtTime(f1, now + t);
    if (f2 !== undefined) osc.frequency.setValueAtTime(f2, now + t + dur * 0.5);
    gain.gain.setValueAtTime(vol, now + t);
    gain.gain.exponentialRampToValueAtTime(0.001, now + t + dur);
    osc.start(now + t);
    osc.stop(now + t + dur + 0.01);
  });
}

export function playAlarm(ctx, tone = "classic", volume = 0.7) {
  if (!ctx) return;
  const vol = Math.max(0.001, 0.5 * volume);
  switch (tone) {
    case "soft":
      playSegments(ctx, [
        { f1: 550, f2: 440, t: 0,    dur: 0.5 },
        { f1: 550, f2: 440, t: 0.65, dur: 0.5 },
        { f1: 550, f2: 440, t: 1.3,  dur: 0.5 },
      ], "sine", vol);
      break;
    case "sharp":
      playSegments(ctx, [
        { f1: 1200, f2: 900, t: 0,    dur: 0.2 },
        { f1: 1200, f2: 900, t: 0.26, dur: 0.2 },
        { f1: 1200, f2: 900, t: 0.52, dur: 0.2 },
        { f1: 1200, f2: 900, t: 0.78, dur: 0.2 },
      ], "triangle", vol);
      break;
    case "melody":
      playSegments(ctx, [
        { f1: 523,  t: 0,    dur: 0.32 },
        { f1: 659,  t: 0.38, dur: 0.32 },
        { f1: 784,  t: 0.76, dur: 0.32 },
        { f1: 1047, t: 1.14, dur: 0.45 },
      ], "triangle", vol);
      break;
    default: // classic
      playSegments(ctx, [
        { f1: 880, f2: 660, t: 0,   dur: 0.35 },
        { f1: 880, f2: 660, t: 0.4, dur: 0.35 },
        { f1: 880, f2: 660, t: 0.8, dur: 0.35 },
      ], "sine", vol);
  }
}

export const TONE_PRESETS = [
  { id: "classic", label: "Clásico", emoji: "🔔" },
  { id: "soft",    label: "Suave",   emoji: "🎵" },
  { id: "sharp",   label: "Agudo",   emoji: "⚡" },
  { id: "melody",  label: "Melodía", emoji: "🎶" },
];
