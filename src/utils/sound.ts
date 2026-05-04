let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!audioCtx) audioCtx = new AudioContext();
  return audioCtx;
}

function playTone(freq: number, duration: number, type: OscillatorType = 'sine', gain = 0.3) {
  try {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gainNode.gain.setValueAtTime(gain, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // audio not supported
  }
}

export const SFX = {
  correct() {
    playTone(523, 0.1);
    setTimeout(() => playTone(659, 0.1), 100);
    setTimeout(() => playTone(784, 0.2), 200);
  },
  wrong() {
    playTone(200, 0.3, 'sawtooth', 0.2);
  },
  levelUp() {
    [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => playTone(f, 0.2), i * 120));
  },
  click() {
    playTone(800, 0.05, 'sine', 0.15);
  },
  complete() {
    [784, 988, 1175, 1568].forEach((f, i) => setTimeout(() => playTone(f, 0.15), i * 100));
  },
};
