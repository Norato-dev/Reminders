export function playAlarm(ctx) {
  if (!ctx) return;
  const now = ctx.currentTime;
  for (let i = 0; i < 3; i++) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(880, now + i * 0.4);
    osc.frequency.setValueAtTime(660, now + i * 0.4 + 0.2);
    gain.gain.setValueAtTime(0.35, now + i * 0.4);
    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.4 + 0.35);
    osc.start(now + i * 0.4);
    osc.stop(now + i * 0.4 + 0.36);
  }
}
