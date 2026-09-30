"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Copy, Share2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useTx } from "@/lib/i18n";

/** The link that opens My AG with this group ready to join. */
export function agInviteUrl(churchId: string) {
  const origin = typeof window === "undefined" ? "https://gideon-app.web.app" : window.location.origin;
  return `${origin}/church?join=${encodeURIComponent(churchId)}`;
}

/**
 * Invite someone to an AG: a QR code to scan in person, plus a link to copy or
 * share on Messenger. Joining still needs an AG leader's approval.
 */
export function InviteSheet({
  open,
  onOpenChange,
  churchId,
  churchName,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  churchId: string;
  churchName: string;
}) {
  const tx = useTx();
  const url = agInviteUrl(churchId);
  const [qr, setQr] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;
    // Generated on the phone; no outside service sees the link.
    QRCode.toDataURL(url, { margin: 1, width: 480, errorCorrectionLevel: "M" })
      .then(setQr)
      .catch(() => setQr(null));
  }, [open, url]);

  const message = tx(
    `Join our Accountability Group "${churchName}" on Gideon: ${url}`,
    `Sumali sa aming Accountability Group na "${churchName}" sa Gideon: ${url}`
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-2xl">
        <SheetHeader>
          <SheetTitle className="font-heading">{tx(`Invite to ${churchName}`, `Mag-imbita sa ${churchName}`)}</SheetTitle>
        </SheetHeader>
        <div className="space-y-4 px-4 pb-6">
          <div className="mx-auto w-56 rounded-2xl bg-white p-3">
            {qr ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={qr} alt={tx(`QR code to join ${churchName}`, `QR code para sumali sa ${churchName}`)} className="w-full" />
            ) : (
              <div className="aspect-square w-full animate-pulse rounded-lg bg-muted" />
            )}
          </div>
          <p className="text-center text-xs text-muted-foreground">
            {tx(
              "Scan with a phone camera, or send the link. An AG leader approves each new member.",
              "I-scan gamit ang camera ng phone, o ipadala ang link. Aaprubahan ng AG leader ang bawat bagong miyembro."
            )}
          </p>
          <p className="select-all break-all rounded-xl bg-muted px-3 py-2 text-center font-mono text-xs">{url}</p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(message);
                  setCopied(true);
                } catch {}
              }}
            >
              <Copy className="size-4" />
              {copied ? tx("Copied", "Nakopya na") : tx("Copy invite", "Kopyahin")}
            </Button>
            {typeof navigator !== "undefined" && "share" in navigator && (
              <Button
                className="flex-1"
                onClick={() => navigator.share({ title: churchName, text: message }).catch(() => {})}
              >
                <Share2 className="size-4" />
                {tx("Share", "Ibahagi")}
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
