/** In-app browsers (WhatsApp, Messenger, Facebook, Instagram...) by user agent. */
export const IN_APP_UA = "WhatsApp|FBAN|FBAV|FB_IAB|FBIOS|Messenger|Instagram|Line\\/|MicroMessenger|TikTok|musical_ly|BytedanceWebview|Snapchat|Twitter|LinkedInApp|; wv\\)";

/** Runs in <head> before the app loads: Android in-app browsers hand the page to Chrome once per tab. */
export const OPEN_IN_BROWSER_BOOT_SCRIPT = `(function(){try{
var ua=navigator.userAgent||"";
if(!/Android/i.test(ua)||!new RegExp(${JSON.stringify(IN_APP_UA)},"i").test(ua))return;
if(sessionStorage.getItem("gideon-open-chrome"))return;
sessionStorage.setItem("gideon-open-chrome","1");
var l=location;
location.href="intent://"+l.host+l.pathname+l.search+l.hash.replace(/#/g,"%23")+"#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url="+encodeURIComponent(l.href)+";end";
}catch(e){}})();`;
