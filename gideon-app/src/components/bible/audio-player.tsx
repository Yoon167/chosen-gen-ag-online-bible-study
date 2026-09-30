"use client";

import { Pause, Play, SkipBack, SkipForward, Square } from "lucide-react";
import { SPEECH_RATES, type useBibleSpeech } from "@/lib/hooks/use-bible-speech";
import { useTx } from "@/lib/i18n";

/** Compact player controls, shown under the chapter header while listening. */
export function AudioPlayer({
  speech,
  verseNumber,
  isTagalog,
  onClose,
}: {
  speech: ReturnType<typeof useBibleSpeech>;
  verseNumber: number | undefined;
  isTagalog: boolean;
  onClose: () => void;
}) {
  const tx = useTx();

  if (!speech.supported) {
    return (
      <p className="px-1 pt-3 text-center text-xs text-muted-foreground">
        {tx("This browser can't read aloud. Try Chrome or Safari.", "Hindi kayang magbasa nang malakas ng browser na ito. Subukan ang Chrome o Safari.")}
      </p>
    );
  }

  const nextRate = SPEECH_RATES[(SPEECH_RATES.indexOf(speech.rate as (typeof SPEECH_RATES)[number]) + 1) % SPEECH_RATES.length];
  const iconButton = "flex size-10 items-center justify-center rounded-full border border-border bg-card";

  return (
    <div className="space-y-2 pt-3">
      <div className="flex items-center justify-center gap-2">
        <button className={iconButton} aria-label={tx("Previous verse", "Nakaraang talata")} onClick={() => speech.jumpTo(speech.index - 1)}>
          <SkipBack className="size-4" />
        </button>
        <button
          className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground"
          aria-label={speech.state === "playing" ? tx("Pause", "I-pause") : tx("Play", "I-play")}
          onClick={() => (speech.state === "playing" ? speech.pause() : speech.play())}
        >
          {speech.state === "playing" ? <Pause className="size-5" /> : <Play className="size-5" />}
        </button>
        <button className={iconButton} aria-label={tx("Next verse", "Susunod na talata")} onClick={() => speech.jumpTo(speech.index + 1)}>
          <SkipForward className="size-4" />
        </button>
        <button
          className="h-10 min-w-12 rounded-full border border-border bg-card px-2 text-xs font-semibold"
          aria-label={tx("Reading speed", "Bilis ng pagbasa")}
          onClick={() => speech.setRate(nextRate)}
        >
          {speech.rate}×
        </button>
        <button
          className={iconButton}
          aria-label={tx("Stop and close player", "Itigil at isara")}
          onClick={() => {
            speech.stop();
            onClose();
          }}
        >
          <Square className="size-3.5" />
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 text-[0.6875rem] text-muted-foreground">
        {verseNumber !== undefined && speech.state !== "idle" && (
          <span>
            {tx("Verse", "Talata")} {verseNumber}
          </span>
        )}
        {speech.voices.length > 0 && (
          <select
            value={speech.voice?.voiceURI ?? ""}
            onChange={(e) => speech.chooseVoice(e.target.value)}
            aria-label={tx("Voice", "Boses")}
            className="max-w-48 truncate rounded-md border border-border bg-background px-1.5 py-1"
          >
            {speech.voices.map((v) => (
              <option key={v.voiceURI} value={v.voiceURI}>
                {v.name}
              </option>
            ))}
          </select>
        )}
      </div>

      {isTagalog && !speech.hasLanguageVoice && (
        <p className="text-center text-[0.6875rem] text-muted-foreground">
          {tx(
            "This phone has no Tagalog (Filipino) voice installed, so another voice is reading. You can add one in your phone's text-to-speech settings.",
            "Walang Tagalog (Filipino) na boses sa phone na ito, kaya ibang boses ang nagbabasa. Puwede kang magdagdag nito sa text-to-speech settings ng phone mo."
          )}
        </p>
      )}
    </div>
  );
}
