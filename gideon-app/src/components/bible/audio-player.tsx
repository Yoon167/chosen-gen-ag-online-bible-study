"use client";

import { Loader2, Pause, Play, SkipBack, SkipForward, Square } from "lucide-react";
import { SPEECH_RATES, type useBibleSpeech } from "@/lib/hooks/use-bible-speech";
import { useTx } from "@/lib/i18n";

/** Compact player controls, shown under the chapter header (or a devotion) while listening. */
export function AudioPlayer({
  speech,
  verseNumber,
  isTagalog,
  onClose,
  part,
}: {
  speech: ReturnType<typeof useBibleSpeech>;
  verseNumber: number | undefined;
  isTagalog: boolean;
  onClose: () => void;
  /** For a devotion: what is being read now, instead of "Verse n". */
  part?: string;
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
  const isChapter = part === undefined;

  return (
    <div className="space-y-2 pt-3">
      <div className="flex items-center justify-center gap-2">
        <button
          className={iconButton}
          aria-label={isChapter ? tx("Previous verse", "Nakaraang talata") : tx("Previous part", "Nakaraang bahagi")}
          onClick={() => speech.jumpTo(speech.index - 1)}
        >
          <SkipBack className="size-4" />
        </button>
        <button
          className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground"
          aria-label={speech.state === "playing" ? tx("Pause", "I-pause") : tx("Play", "I-play")}
          onClick={() => (speech.state === "playing" ? speech.pause() : speech.play())}
        >
          {speech.state === "playing" && speech.loadingClip ? (
            <Loader2 className="size-5 animate-spin" />
          ) : speech.state === "playing" ? (
            <Pause className="size-5" />
          ) : (
            <Play className="size-5" />
          )}
        </button>
        <button
          className={iconButton}
          aria-label={isChapter ? tx("Next verse", "Susunod na talata") : tx("Next part", "Susunod na bahagi")}
          onClick={() => speech.jumpTo(speech.index + 1)}
        >
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
        {speech.state !== "idle" &&
          (part !== undefined ? (
            <span className="max-w-32 truncate">{part}</span>
          ) : (
            verseNumber !== undefined && (
              <span>
                {tx("Verse", "Talata")} {verseNumber}
              </span>
            )
          ))}
        <select
          value={speech.voice?.voiceURI ?? ""}
          onChange={(e) => speech.chooseVoice(e.target.value)}
          aria-label={tx("Voice", "Boses")}
          className="max-w-52 truncate rounded-md border border-border bg-background px-1.5 py-1"
        >
          {speech.voices.map((v) => (
            <option key={v.voiceURI} value={v.voiceURI}>
              {v.name}
            </option>
          ))}
        </select>
      </div>

      {speech.problem && (
        <p className="text-center text-[0.6875rem] text-muted-foreground">
          {speech.problem === "offline"
            ? tx(
                "You're offline, so the phone's voice is reading. Parts you've heard before still play in the narrator's voice.",
                "Offline ka, kaya boses ng phone ang nagbabasa. Ang mga bahaging napakinggan mo na ay boses pa rin ng narrator."
              )
            : speech.problem === "limit"
              ? tx(
                  "The narrator's free reading time is used up for now, so the phone's voice is reading. It comes back next month (or tomorrow).",
                  "Ubos na muna ang libreng oras ng narrator, kaya boses ng phone ang nagbabasa. Babalik ito sa susunod na buwan (o bukas)."
                )
              : tx(
                  "The narrator couldn't be reached, so the phone's voice is reading. Press play again to retry.",
                  "Hindi maabot ang narrator, kaya boses ng phone ang nagbabasa. Pindutin ulit ang play para subukan."
                )}
        </p>
      )}

      {isTagalog && !speech.voice?.narrator && !speech.hasLanguageVoice && (
        <p className="text-center text-[0.6875rem] text-muted-foreground">
          {tx(
            "This phone has no Filipino voice yet, so the closest voice (Indonesian or Spanish) is reading. Pick ✨ Anointed Narrator above for a natural Tagalog voice.",
            "Wala pang Filipino na boses sa phone na ito, kaya ang pinakamalapit na boses (Indonesian o Spanish) ang nagbabasa. Piliin ang ✨ Anointed Narrator sa itaas para sa natural na boses sa Tagalog."
          )}
        </p>
      )}
    </div>
  );
}
