# Gideon intro: creative review and refined version

This reviews the original "Watch Introduction" film (30 s over the animated sunrise valley) and the landing screen. It also records the refined version now in the app, `gideon-app/src/components/intro/cinematic-intro.tsx`. The concept, the valley, the Gideon story and the flow are kept; the craft is raised.

**Name and identity:** GIDEON is the wordmark, and **Discipleship Journey** is its title line. The Gideon story (Judges 6:12) is the heart of the film, so it stays.

**Core message:** Following Jesus → Spiritual Growth → Transformation → Disciple Making.

## 1. Review of the original

The original has a strong foundation:

- **One living world.** A hand-drawn sunrise valley with Jesus on the hill, the sun rising behind Him, and people of every age walking up the path toward Him. It is unique, ownable, and light (all SVG, no video).
- **A real story.** It goes from the calling, to Gideon's fear and God's view of him, to the journey, to the reveal. That is a story, not a feature list.
- **Built for phones.** It uses CSS transforms only, with a fixed zoom so there is no redraw "pop", and a letterbox with a progress line.

What held it back was execution, not the idea:

- **Choppy rhythm.** It cut to black every 5 seconds (5 dips in 30 s), so it felt like a slideshow instead of one film.
- **Two text tracks at once.** A big title and a narration caption ran together, often saying the same thing. The eye had nowhere to rest.
- **Equal beats.** Every scene was exactly 5 s, so nothing built and nothing breathed.
- **A marketing scene.** Scene 4 listed four app features ("Learn God's Word…"), which broke the spell.
- **A crowded ending.** The reveal stacked the logo, name, subtitle, a long tagline and a second verse card. The most important moment had the least focus.
- **Flat light.** The color stayed the same from start to finish, so the transformation the story talks about was never seen.

## 2. Keep

- The sunrise valley, Jesus on the hill, and people walking up the path: the visual signature.
- The Gideon thread and Judges 6:12, "The Lord is with you, mighty warrior."
- "Every Journey Begins With A Calling" as the opening line.
- The fixed-zoom camera (no blur pop), the letterbox, the progress line, Skip, and Tap for sound.
- The landing screen as the destination, so the film flows back into the same world.

## 3. Improve

- **One continuous camera move** for the whole film: a single 30 s path that glides from shot to shot instead of cutting through black.
- **Pacing:** scenes of 4.5 / 5 / 5 / 5 / 4.5 / 6 s, so the reveal gets the most time.
- **Text:** one title and one quiet line per scene, with references in small caps.
- **Light tells the story:** a cool dawn-blue grade slowly gives way to warm gold as the story moves from calling to transformation.
- **Symbolism:** God rays when Jesus is in view, and at disciple making, one light becomes three, then many.
- **Reveal:** a bloom of light from the sun behind Jesus, the icon rising, GIDEON settling with a light sweep across the letters, then "Discipleship Journey" and a short tagline.

## 4. Remove

- The black dips between scenes.
- The bottom narration track that duplicated the titles.
- The feature list in scene 4.
- The long tagline and the second verse card at the end.
- The "Welcome to Gideon" line. The name on screen says it.

## 5. Enhanced storyboard

| Time | Beat | Picture | Words |
|---|---|---|---|
| 0–4.5 s | **The calling** | Out of black onto a blue dawn. The camera rises with the sun behind the hill. | *Every Journey Begins With A Calling* / "Come, follow Me." Matthew 4:19 |
| 4.5–9.5 s | **Gideon** | A slow glide down to the people starting up the path: ordinary, small, unsure. | *Gideon Was One Of Them* / "The Lord is with you, mighty warrior." Judges 6:12 |
| 9.5–14.5 s | **Transformation** | Up to Jesus in the light; soft god rays turn behind Him. | *God Sees Who You Can Become* / Where others see fear, He sees faith. |
| 14.5–19.5 s | **Following and growing** | The camera sweeps back down and follows the walkers up the path, closer each step. The grade turns warm. | *Follow. Grow. Be Transformed.* / One step at a time, closer to Him. |
| 19.5–24 s | **Disciple making** | Opens onto the valley. One point of light appears, then three, then many across the land. | *Then Help Others Walk It Too* / Disciples who make disciples. |
| 24–30 s | **Reveal** | Light blooms from the sun and fills the frame. The icon rises, GIDEON settles, a sweep of light crosses the letters. | **GIDEON** · DISCIPLESHIP JOURNEY / Follow Jesus · Grow Deeper · Make Disciples |

## 6. Camera

A single keyframed path (`film-cam` in `globals.css`) at a constant 1.7× zoom, eased with a slow-in/slow-out curve:

- Start low and rise with the sun.
- Drift down onto the path.
- Lift to Jesus.
- A quick sweep down, then a slow climb that follows the walkers.
- Open out over the valley.
- Settle for the reveal.

A small sideways drift (±2.5%) adds parallax without ever showing the stage edges. It opens out of black once (1.6 s), with no cuts after that.

## 7. Lighting

- **Grade over time:** a deep-blue wash (`#0c1a44`, 45% → 0% over the first half) for the cool, uncertain beginning, then a warm gold radial wash fading in from 35% to 100% of the film. The light becomes warmer as the person grows.
- **God rays:** a slow-turning conic ray pattern behind Jesus (scene 3) and at the reveal, at low opacity so it reads as atmosphere, not effect.
- **Bloom:** the reveal light grows out of the sun's position, so the logo is born from the light behind Jesus.
- **Vignette and letterbox:** the vignette eases off at the reveal to open the frame up.

## 8. Sound

The app's background music track plays on Tap for sound; phones never allow sound to start on its own. For a scored version:

- **0–9 s:** wind, a few birds, a low warm pad; a single piano motif enters on "Gideon".
- **9–19 s:** strings rise under "God Sees Who You Can Become"; a soft wordless choir enters on "Follow. Grow."
- **19–24 s:** add a light pulse (pizzicato or felt piano) that multiplies as the lights multiply.
- **24–30 s:** the swell lands on the bloom (full strings and choir, one major chord), then a bell or celesta shimmer on the light sweep across GIDEON, and silence.
- **Mix for phone speakers:** mids forward (300 Hz–4 kHz), about −14 LUFS. It must also work muted.

## 9. Visual effects

All effects use transform and opacity only, so the GPU runs them without per-frame JavaScript:

- God rays: a rotating `repeating-conic-gradient` layer.
- Multiplying lights: 11 glowing dots appear in three waves (1, 3, then 7) with a gentle overshoot.
- Bloom: a radial light disk scaling from 0.15× to 4×.
- Light sweep on the wordmark: a moving gradient clipped to the text (the only repaint, and it is small).
- Grade layers: two full-screen color layers whose opacity changes slowly.

## 10. Logo reveal

1. **Bloom (0.2 s):** light grows from the sun until the screen is warm white-gold.
2. **Icon (1.6 s):** the icon rises with a soft golden glow.
3. **Wordmark (2.0 s):** GIDEON settles from slightly large to rest.
4. **Sweep (3.2 s):** a band of light passes across the letters, like the sun catching them.
5. **Title line (2.8 s):** DISCIPLESHIP JOURNEY in wide-spaced small caps.
6. **Tagline (3.4 s):** "Follow Jesus · Grow Deeper · Make Disciples."
7. **Exit:** the film ends on the landing screen, which shows the same GIDEON · Discipleship Journey lockup, so the reveal and the app feel like one moment.

## 11. Mobile performance

- **Nothing to download:** the valley is SVG and CSS. The film adds no images or video.
- **Fixed zoom:** the camera never changes scale, so the scene is drawn once and only moved. No blur-then-sharpen pop.
- **No per-frame JavaScript:** React re-renders only when the scene changes, about 6 times in 30 s.
- **Overlays:** they animate opacity and transform only. Nothing blurs, masks or blends while moving.
- **Particles:** the lights are 11 small elements, not a canvas loop.
- **Reduced motion:** the existing `intro-anim` rule turns animations off.
- **Recommended next:** test on a low-end Android (2–3 GB RAM). If the god rays drop frames there, show them only on devices with `navigator.hardwareConcurrency >= 6`.
