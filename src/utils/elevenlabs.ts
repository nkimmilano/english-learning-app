// ElevenLabs TTS utility
// Voice: Rachel (21m00Tcm4TlvDq8ikWAM) — clear, natural American English
// Falls back to Web Speech API if key is not configured

const VOICE_ID = '21m00Tcm4TlvDq8ikWAM';
const API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY as string | undefined;

export const hasElevenLabs = !!API_KEY;

/**
 * Fetch audio from ElevenLabs and return a blob URL.
 * Returns null if the key is missing or the request fails.
 */
export async function fetchElevenLabsAudio(text: string): Promise<string | null> {
  if (!API_KEY) return null;
  try {
    const res = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      {
        method: 'POST',
        headers: {
          'xi-api-key': API_KEY,
          'Content-Type': 'application/json',
          Accept: 'audio/mpeg',
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_turbo_v2_5',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
            style: 0.0,
            use_speaker_boost: true,
          },
        }),
      }
    );
    if (!res.ok) return null;
    const blob = await res.blob();
    return URL.createObjectURL(blob);
  } catch {
    return null;
  }
}

/** Speak text using the browser Web Speech API (fallback). */
export function speakFallback(text: string): void {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = 0.82;
  utterance.pitch = 1.0;
  const voices = window.speechSynthesis.getVoices();
  const enVoice =
    voices.find(v => v.lang === 'en-US' && v.localService) ??
    voices.find(v => v.lang.startsWith('en'));
  if (enVoice) utterance.voice = enVoice;
  window.speechSynthesis.speak(utterance);
}
