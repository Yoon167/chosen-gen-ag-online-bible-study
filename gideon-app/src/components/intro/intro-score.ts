// Soft, meditative worship score for the intro, synthesized with the Web
// Audio API so the app ships without an audio file: a slow ambient drone
// underneath a string pad, a piano arpeggio and a low cello line, building
// toward the final resolve on D.

type Chord = { notes: number[]; intensity: number };

const CHORD_LENGTH = 3.75;

// D – Bm – G – A – Bm – G – A – D (resolves on the final scene)
const PROGRESSION: Chord[] = [
  { notes: [50, 57, 62, 66], intensity: 0.25 },
  { notes: [47, 54, 59, 62], intensity: 0.32 },
  { notes: [43, 55, 59, 62], intensity: 0.42 },
  { notes: [45, 52, 57, 61], intensity: 0.52 },
  { notes: [47, 54, 59, 62], intensity: 0.64 },
  { notes: [43, 55, 59, 62], intensity: 0.78 },
  { notes: [45, 52, 57, 61], intensity: 0.92 },
  { notes: [38, 50, 57, 62, 66], intensity: 0.7 },
];

const freq = (midi: number) => 440 * Math.pow(2, (midi - 69) / 12);

function createReverb(ctx: AudioContext) {
  const seconds = 3;
  const length = ctx.sampleRate * seconds;
  const impulse = ctx.createBuffer(2, length, ctx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const data = impulse.getChannelData(ch);
    for (let i = 0; i < length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2.6);
    }
  }
  const convolver = ctx.createConvolver();
  convolver.buffer = impulse;
  return convolver;
}

export type IntroScore = {
  /** Resolves true once audio is actually playing (false if autoplay was blocked). */
  ready: Promise<boolean>;
  /** Fades out and releases the audio context. */
  stop: () => void;
};

/** Starts the score `offset` seconds into the timeline. */
export function startIntroScore(offset: number): IntroScore {
  const AudioCtx =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return { ready: Promise.resolve(false), stop: () => {} };

  const ctx = new AudioCtx();
  // resume() stays pending forever when autoplay is blocked, so cap the wait.
  const ready = Promise.race([
    ctx.resume().then(() => ctx.state === "running"),
    new Promise<boolean>((r) => window.setTimeout(() => r(ctx.state === "running"), 400)),
  ]).catch(() => false);

  const master = ctx.createGain();
  master.gain.setValueAtTime(0, ctx.currentTime);
  master.gain.linearRampToValueAtTime(0.55, ctx.currentTime + 1.2);
  master.connect(ctx.destination);

  const reverb = createReverb(ctx);
  const wet = ctx.createGain();
  wet.gain.value = 0.5;
  reverb.connect(wet).connect(master);

  const bus = ctx.createGain();
  bus.connect(master);
  bus.connect(reverb);

  const at = (t: number) => ctx.currentTime + Math.max(0, t - offset) + 0.05;

  function strings(midi: number, start: number, end: number, intensity: number) {
    if (end <= offset) return;
    const t0 = at(start);
    const t1 = at(end);
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 500 + 1600 * intensity;
    filter.Q.value = 0.6;
    const env = ctx.createGain();
    const peak = 0.028 + 0.03 * intensity;
    env.gain.setValueAtTime(0, t0);
    env.gain.linearRampToValueAtTime(peak, t0 + 1.4);
    env.gain.setValueAtTime(peak, Math.max(t0 + 1.4, t1 - 0.2));
    env.gain.linearRampToValueAtTime(0, t1 + 1.6);
    filter.connect(env).connect(bus);
    for (const detune of [-7, 6]) {
      const osc = ctx.createOscillator();
      osc.type = "sawtooth";
      osc.frequency.value = freq(midi);
      osc.detune.value = detune;
      osc.connect(filter);
      osc.start(t0);
      osc.stop(t1 + 1.8);
    }
  }

  function piano(midi: number, start: number, velocity: number) {
    if (start < offset) return;
    const t0 = at(start);
    const env = ctx.createGain();
    env.gain.setValueAtTime(0, t0);
    env.gain.linearRampToValueAtTime(0.16 * velocity, t0 + 0.012);
    env.gain.exponentialRampToValueAtTime(0.0001, t0 + 3.2);
    env.connect(bus);
    const partials: [OscillatorType, number, number][] = [
      ["sine", 1, 1],
      ["triangle", 2, 0.25],
      ["sine", 3, 0.08],
    ];
    for (const [type, mult, level] of partials) {
      const g = ctx.createGain();
      g.gain.value = level;
      const osc = ctx.createOscillator();
      osc.type = type;
      osc.frequency.value = freq(midi) * mult;
      osc.connect(g).connect(env);
      osc.start(t0);
      osc.stop(t0 + 3.3);
    }
  }

  // Meditative drone on D and A that breathes slowly under the whole intro.
  function drone(midi: number, level: number) {
    const end = PROGRESSION.length * CHORD_LENGTH + 2;
    if (end <= offset) return;
    const t0 = at(Math.max(0, offset));
    const env = ctx.createGain();
    env.gain.setValueAtTime(0, t0);
    env.gain.linearRampToValueAtTime(level, t0 + 3);
    env.gain.setValueAtTime(level, at(end - 1));
    env.gain.linearRampToValueAtTime(0, at(end) + 1.5);
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 900;
    const breath = ctx.createGain();
    breath.gain.value = 1;
    const lfo = ctx.createOscillator();
    const lfoDepth = ctx.createGain();
    lfo.frequency.value = 0.12;
    lfoDepth.gain.value = 0.35;
    lfo.connect(lfoDepth).connect(breath.gain);
    filter.connect(breath).connect(env).connect(bus);
    for (const [type, detune] of [["sine", 0], ["triangle", 4]] as const) {
      const osc = ctx.createOscillator();
      osc.type = type;
      osc.frequency.value = freq(midi);
      osc.detune.value = detune;
      osc.connect(filter);
      osc.start(t0);
      osc.stop(at(end) + 1.8);
    }
    lfo.start(t0);
    lfo.stop(at(end) + 1.8);
  }
  drone(38, 0.07);
  drone(45, 0.045);
  drone(62, 0.02);

  PROGRESSION.forEach((chord, i) => {
    const start = i * CHORD_LENGTH;
    const isLast = i === PROGRESSION.length - 1;
    const end = isLast ? start + 5 : start + CHORD_LENGTH;

    // Strings enter after the first bar so the intro opens on solo piano.
    if (i > 0) chord.notes.forEach((n) => strings(n, start, end, chord.intensity));
    // Cello line joins for the build-up.
    if (i >= 3) strings(chord.notes[0] - 12, start, end, chord.intensity * 0.8);

    const arp = chord.notes.slice(-3).map((n) => n + 12);
    if (isLast) {
      [...chord.notes.slice(1).map((n) => n + 12), 78].forEach((n, k) =>
        piano(n, start + k * 0.35, 0.8)
      );
    } else {
      [arp[0], arp[1], arp[2], arp[1]].forEach((n, k) =>
        piano(n, start + k * (CHORD_LENGTH / 4), 0.55 + 0.35 * chord.intensity)
      );
    }
  });

  let stopped = false;
  const stop = () => {
    if (stopped) return;
    stopped = true;
    const now = ctx.currentTime;
    master.gain.cancelScheduledValues(now);
    master.gain.setValueAtTime(master.gain.value, now);
    master.gain.linearRampToValueAtTime(0, now + 1.2);
    window.setTimeout(() => void ctx.close(), 1400);
  };
  return { ready, stop };
}
