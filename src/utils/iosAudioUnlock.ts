/**
 * iOS Safari requires audio to be triggered within a direct user gesture.
 * This utility unlocks the audio context on first tap so subsequent
 * programmatic plays work correctly.
 */

let unlocked = false;

export function unlockIOSAudio(): void {
  if (unlocked) return;
  unlocked = true;

  // Play a silent buffer through AudioContext to unlock
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContext) {
      const ctx = new AudioContext();
      const buffer = ctx.createBuffer(1, 1, 22050);
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.start(0);
      setTimeout(() => ctx.close(), 500);
    }
  } catch {
    // ignore
  }

  // Also create and immediately pause a silent Audio element
  try {
    const audio = new Audio();
    audio.src = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA';
    audio.volume = 0;
    audio.play().catch(() => {});
  } catch {
    // ignore
  }
}
