/**
 * A short burst of confetti and emoji for moments worth celebrating (a lesson
 * or level done, a perfect game, an answered prayer). Plain DOM and CSS, so
 * it costs nothing until it runs and cleans itself up.
 */
const PIECES = ["🎉", "✨", "🙌", "⭐", "💛", "🕊️"];
const COLORS = ["#e9c46a", "#7c6cf2", "#34d399", "#f472b6", "#60a5fa"];

export function celebrate(emoji?: string) {
  if (typeof document === "undefined") return;
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
  const layer = document.createElement("div");
  layer.setAttribute("aria-hidden", "true");
  layer.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:200;overflow:hidden";
  for (let i = 0; i < 36; i++) {
    const p = document.createElement("span");
    const isEmoji = i % 4 === 0;
    p.textContent = isEmoji ? (emoji ?? PIECES[i % PIECES.length]) : "";
    const x = (Math.random() - 0.5) * 320;
    const y = -(160 + Math.random() * 260);
    const rot = (Math.random() - 0.5) * 720;
    p.style.cssText = `position:absolute;left:50%;top:60%;font-size:${isEmoji ? 26 : 0}px;width:${isEmoji ? "auto" : "8px"};height:${isEmoji ? "auto" : "12px"};border-radius:2px;background:${isEmoji ? "transparent" : COLORS[i % COLORS.length]};transform:translate(-50%,0);transition:transform 1.4s cubic-bezier(.15,.7,.3,1),opacity 1.4s ease-in;opacity:1`;
    layer.appendChild(p);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        p.style.transform = `translate(calc(-50% + ${x}px), ${y}px) rotate(${rot}deg)`;
        p.style.opacity = "0";
      })
    );
  }
  document.body.appendChild(layer);
  setTimeout(() => layer.remove(), 1700);
  navigator.vibrate?.(30);
}
