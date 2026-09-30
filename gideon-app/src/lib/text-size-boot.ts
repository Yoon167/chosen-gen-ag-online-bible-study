/** Shared with the root (server) layout, so this file has no client hooks. */
export const TEXT_SIZE_KEY = "gideon-text-size";

/**
 * Runs before the app paints (inlined in the root layout) so a member who
 * chose large text never sees the small size flash first.
 */
export const TEXT_SIZE_BOOT_SCRIPT = `try{var s=localStorage.getItem("${TEXT_SIZE_KEY}");if(s==="lg"||s==="xl")document.documentElement.dataset.textSize=s}catch(e){}`;
