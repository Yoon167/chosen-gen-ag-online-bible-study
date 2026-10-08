# Gideon: Discipleship Journey opening sequence

A 15-second opening that plays the first time the app opens on a device, then leads into the landing screen. This brief is for a motion designer or 3D artist who wants to make a full cinematic version (Unreal Engine 5, After Effects, or Blender). The version inside the app is a light web animation that follows the same storyboard (`gideon-app/src/components/intro/opening-sequence.tsx`).

**Theme:** following Jesus, spiritual growth, transformation, purpose.
**Feel:** reverent, hopeful, cinematic, premium. Avoid cheap effects and church clichés.
**Palette:** golden sunrise `#FFC878`, warm white `#FFF6E5`, deep sky blue `#1A2A55`, earth tones `#6B4F2A` and `#2F3B2A`, particle gold `#FFD68C`.

## 1. Storyboard (15 s)

| Time | Scene | Picture | Text / voice |
|---|---|---|---|
| 0.0–2.2 | 1. Darkness | Pure black. A single vertical beam of warm golden light cuts down the middle, then widens and fades. | Whispered: *"Come, follow Me."* (Matthew 4:19) |
| 2.2–8.3 | 2–3. The journey | An aerial flight over a snowy range, a river through a valley, the wilderness, green hills, and a forest in morning mist. Each shot holds about 1.5 s. Short glimpses of the disciple's life: a hand on an open Bible, someone kneeling in prayer, open hands in worship, friends at a table, someone serving. These are silhouettes and hands, never faces staring at the camera. | Small captions: *Read the Word · Pray · Worship · Walk together · Serve* |
| 8.3–10.4 | 4. The traveler | A lone traveler walks a narrow path toward a mountain. The sunrise brightens and the music builds. | *Follow* |
| 10.4–12.4 | 5. The summit | The traveler reaches the top. A radiant cross of light appears against the sunrise, and volumetric rays burst through the clouds. Music peaks. | (none) |
| 11.0–13.0 | 6–7. Light | The world dissolves into thousands of golden particles. They float upward, then gather into a cross made of light. | (none) |
| 12.5–15.2 | Logo | The particle cross becomes the Gideon logo. A soft glow, then a fade into the app. | **GIDEON · Discipleship Journey** / *Follow Jesus. Grow Deeper. Make Disciples.* |

## 2. Camera

- **Scene 1:** locked off, with a slow push-in (about 5%) as the beam appears.
- **Scenes 2–3:** drone flythrough at 24 fps. Fly forward and slightly down over each landscape, and cut on the motion (a match cut) between shots. Use a 24–35 mm look, and let the horizon tilt gently on turns.
- **Glimpses:** a slow dolly with shallow depth of field (f/1.8 look). The person sits in the foreground and is soft; the light is the focus.
- **Scene 4:** a crane up and over the traveler, revealing the path and the mountain ahead.
- **Scene 5:** a low-angle push toward the summit, with a lens flare when the sun clears the ridge.
- **Scenes 6–7:** the camera pulls back as the particles rise, then settles, centered, as they form the cross.

## 3. Lighting

- **Key light:** a low golden-hour sun (3200–3600 K) from behind and to the side of the subject, for rim light on mountains and people.
- **Fill:** a cool sky bounce (7000 K) at low intensity, so the shadows stay blue and deep.
- **Atmosphere:** exponential height fog with volumetric scattering. God rays through the clouds and trees. Morning mist in the valley shots.
- **Cross:** an emissive material with bloom, warm white at the center and gold at the edges. A slight flicker of light rays behind it.
- **In UE5:** Lumen GI, a Sky Atmosphere with a low sun, Volumetric Clouds, Exponential Height Fog with volumetric fog on, and bloom and lens flare in post.

## 4. Sound design

- **0–2 s:** silence, then soft wind and a distant bird. A low, warm pad fades in. The whisper "Come, follow Me" is intimate, close-mic'd, with a little reverb.
- **2–8 s:** an emotional piano motif (simple, 3–4 notes) over sustained strings, with nature sounds that change with each landscape (river, wind, birds).
- **8–10 s:** the strings swell, a soft choir enters (oo/ah, no words), and a timpani roll builds.
- **10–12 s:** the peak: full orchestra and choir on a major chord as the cross appears.
- **12–15 s:** a shimmer (celesta or bell) as the particles gather, then a single low "boom" on the logo, decaying into silence.
- **Mix for phones:** keep the important parts in the mid range (300 Hz–4 kHz), and keep it under −14 LUFS. On mobile the opening must also work with sound off, because phones block autoplaying audio until the user taps.

## 5. Visual effects

- **Particles (Niagara or Houdini):** about 20–50k for video. Spawn them from the landscape surfaces, give them curl-noise drift upward, then send them to target points sampled along a cross mesh. Make them additive, with a warm gradient and a slight motion blur.
- **Light beam:** a thin emissive card with animated noise and soft bloom.
- **Transitions:** use light leaks and dissolves through bright frames, never hard wipes.
- **Grade:** warm highlights, teal-blue shadows, gentle contrast. Add a soft vignette.

## 6. Transition into the app

The logo holds for about 1.5 s, then the whole screen fades (0.6 s) to the landing screen. The landing screen's sunrise valley continues the same golden palette, so it feels like one motion. A Skip button is always visible, top right. The opening plays once per device; after that the app opens straight to the landing or home screen.

## 7. Lottie / Rive alternative (for mobile)

A full-screen video (MP4/WebM) at 1080×1920 for 15 s is about 3–6 MB, which is heavy for a first open on mobile data. Lighter options:

- **Rive (recommended):** vector cross, rays, particles (as a state-machine loop) and the logo. Use photographs as image assets with Ken Burns moves. Typical size is 200–600 KB, and it plays at 60 fps on the GPU.
- **Lottie:** works well for the beam, rays, particle cross (pre-baked) and logo. Keep the layer count low and avoid masks and blur. Typical size is 150–500 KB.
- **Hybrid:** a short 5-second video for the aerial flight (about 1.5 MB, H.264 or HEVC), with Lottie or Rive for the cross, particles and logo on top.

The current app version uses CSS animations and 7 compressed photos (about 300 KB) plus a small canvas for the particles, with no video.

## 8. Flutter recommendations

- Play a Rive file with `rive` (`RiveAnimation.asset`), or a Lottie file with `lottie`, full screen on the splash route.
- For video, use `video_player` with a muted MP4 preloaded during the native splash (`flutter_native_splash`), then `Navigator.pushReplacement` with a `FadeTransition` into Home.
- Store "opening seen" in `shared_preferences` so it plays once. Wrap it in `MediaQuery.of(context).disableAnimations` checks for reduced motion. Precache the images with `precacheImage`.

## 9. React Native recommendations

- Use `rive-react-native` or `lottie-react-native` for the animated parts, or `react-native-video` (muted, `resizeMode="cover"`) for a video version.
- Keep the native splash with `react-native-bootsplash` until the first frame is ready, then fade it out into the opening.
- Use `react-native-reanimated` for the fade into Home. Store "seen" in `@react-native-async-storage/async-storage`, and respect `AccessibilityInfo.isReduceMotionEnabled()`.
