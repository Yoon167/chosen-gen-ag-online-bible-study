"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronRight, MessageCircle, SendHorizontal, ShieldCheck, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { useMyChurch } from "@/lib/hooks/use-church";
import { CHAT_MAX_LENGTH, deleteChat, markChatRead, sendChat, useChat, useChatReadAt, useLatestChat, type ChatMessage } from "@/lib/hooks/use-chat";
import { useLanguage, useTx } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { PersonAvatar, PersonName } from "@/components/profile/person";

/** The AG's group chat: everyone in this AG, live. Leaders can remove any message. */
export function AgChat() {
  const tx = useTx();
  const { lang } = useLanguage();
  const my = useMyChurch();
  const churchId = my.active || my.ownerView ? my.churchId : null;
  const chat = useChat(churchId);
  const uid = my.membership?.uid ?? null;
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [menu, setMenu] = useState<string | null>(null);
  const bottom = useRef<HTMLDivElement>(null);
  const locale = lang === "tl" ? "fil-PH" : "en-PH";
  const newest = chat.items.at(-1);

  // Stay at the newest message, and count it as read.
  useLayoutEffect(() => {
    bottom.current?.scrollIntoView({ block: "end" });
  }, [chat.items.length]);
  useEffect(() => {
    if (churchId && newest) markChatRead(churchId, newest.createdAt);
  }, [churchId, newest]);

  async function send() {
    const body = text.trim();
    if (!body || !churchId || !uid || sending) return;
    setSending(true);
    setError("");
    try {
      await sendChat(churchId, { uid, name: my.membership?.displayName || "Member", text: body, leader: my.isChurchLeader });
      setText("");
    } catch {
      setError(tx("Couldn't send. Check your connection and try again.", "Hindi naipadala. Tingnan ang internet at subukan ulit."));
    } finally {
      setSending(false);
    }
  }

  async function remove(m: ChatMessage) {
    setMenu(null);
    if (!churchId) return;
    if (!window.confirm(tx("Remove this message for everyone?", "Alisin ang mensaheng ito para sa lahat?"))) return;
    await deleteChat(churchId, m.id).catch(() =>
      setError(tx("Couldn't remove the message.", "Hindi naalis ang mensahe."))
    );
  }

  if (!my.loading && !churchId) {
    return (
      <div>
        <PageHeader title={tx("AG Chat", "AG Chat")} icon={MessageCircle} back />
        <EmptyState
          icon={MessageCircle}
          title={tx("Join an AG to chat", "Sumali sa AG para maka-chat")}
          description={tx("The chat is for the members of your Accountability Group.", "Para sa mga member ng iyong Accountability Group ang chat.")}
        />
      </div>
    );
  }

  const day = (ms: number) => new Date(ms).toLocaleDateString(locale, { weekday: "short", month: "short", day: "numeric" });
  const time = (ms: number) => new Date(ms).toLocaleTimeString(locale, { hour: "numeric", minute: "2-digit" });

  return (
    <div>
      <PageHeader title={tx("AG Chat", "AG Chat")} subtitle={my.church?.name} icon={MessageCircle} back />

      <div className="space-y-1 px-4 pb-40">
        <p className="mx-auto mb-3 flex max-w-sm items-start gap-2 rounded-2xl bg-muted/60 px-3 py-2 text-[0.6875rem] text-muted-foreground">
          <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-emerald-600" />
          {tx(
            "Only your AG sees this chat. Be kind and encouraging; leaders can remove messages.",
            "Ang AG mo lang ang nakakakita ng chat na ito. Maging mabait at nakapagpapalakas-loob; puwedeng mag-alis ng mensahe ang mga leader."
          )}
        </p>

        {chat.loading ? (
          <div className="space-y-2">
            <Skeleton className="h-12 w-2/3 rounded-2xl" />
            <Skeleton className="ml-auto h-12 w-1/2 rounded-2xl" />
            <Skeleton className="h-12 w-3/5 rounded-2xl" />
          </div>
        ) : chat.error ? (
          <p className="text-center text-sm text-destructive">{tx("The chat couldn't load.", "Hindi ma-load ang chat.")}</p>
        ) : chat.items.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted-foreground">
            {tx("No messages yet. Say hello to your AG! 👋", "Wala pang mensahe. Batiin ang iyong AG! 👋")}
          </p>
        ) : (
          chat.items.map((m, i) => {
            const prev = chat.items[i - 1];
            const mine = m.uid === uid;
            const newDay = !prev || day(prev.createdAt) !== day(m.createdAt);
            const sameAuthor = !newDay && prev?.uid === m.uid && m.createdAt - prev.createdAt < 5 * 60 * 1000;
            const canRemove = mine || my.isChurchLeader;
            return (
              <div key={m.id}>
                {newDay && (
                  <p className="py-2 text-center text-[0.6875rem] font-semibold text-muted-foreground">{day(m.createdAt)}</p>
                )}
                <div className={cn("flex items-end gap-2", mine ? "justify-end" : "justify-start", !sameAuthor && "pt-1.5")}>
                  {/* Others' photo beside their last message in a row; tap it for their profile */}
                  {!mine && (
                    <span className="w-8 shrink-0">
                      {chat.items[i + 1]?.uid !== m.uid || chat.items[i + 1].createdAt - m.createdAt >= 5 * 60 * 1000 ? (
                        <PersonAvatar uid={m.uid} name={m.name} />
                      ) : null}
                    </span>
                  )}
                  <div className="relative max-w-[78%]">
                    {!mine && !sameAuthor && (
                      <p className="mb-0.5 flex items-center gap-1 px-1 text-[0.6875rem] font-semibold text-muted-foreground">
                        <PersonName uid={m.uid} name={m.name} />
                        {m.leader && <span className="rounded-full bg-primary/15 px-1.5 text-[0.5625rem] text-primary">{tx("Leader", "Leader")}</span>}
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={() => canRemove && setMenu(menu === m.id ? null : m.id)}
                      className={cn(
                        "block w-full whitespace-pre-wrap break-words rounded-2xl px-3.5 py-2 text-left text-sm",
                        mine ? "rounded-br-md bg-primary text-primary-foreground" : "rounded-bl-md bg-card shadow-sm ring-1 ring-border/60",
                        !canRemove && "cursor-default"
                      )}
                    >
                      {m.text}
                      <span className={cn("ml-2 inline-block text-[0.625rem]", mine ? "text-primary-foreground/70" : "text-muted-foreground")}>
                        {time(m.createdAt)}
                      </span>
                    </button>
                    {menu === m.id && (
                      <button
                        onClick={() => remove(m)}
                        className={cn(
                          "absolute top-full z-10 mt-1 flex items-center gap-1.5 rounded-xl bg-card px-3 py-2 text-xs font-semibold text-destructive shadow-lg ring-1 ring-border",
                          mine ? "right-0" : "left-0"
                        )}
                      >
                        <Trash2 className="size-3.5" />
                        {tx("Remove", "Alisin")}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={bottom} />
      </div>

      {/* Sits just above the bottom bar */}
      <div className="fixed inset-x-0 z-30 border-t border-border/70 bg-background/95 px-3 py-2 backdrop-blur" style={{ bottom: "calc(4rem + env(safe-area-inset-bottom, 0px))" }}>
        {error && <p className="mx-auto mb-1 max-w-xl text-xs text-destructive">{error}</p>}
        <form
          className="mx-auto flex max-w-xl items-end gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
        >
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, CHAT_MAX_LENGTH))}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                e.preventDefault();
                send();
              }
            }}
            rows={1}
            disabled={!churchId}
            placeholder={tx("Message your AG…", "Mensahe sa AG mo…")}
            aria-label={tx("Message", "Mensahe")}
            className="max-h-32 min-h-11 flex-1 resize-none rounded-2xl border border-border bg-card px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
          />
          <button
            type="submit"
            disabled={!text.trim() || sending}
            aria-label={tx("Send", "Ipadala")}
            className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground disabled:opacity-40"
          >
            <SendHorizontal className="size-5" />
          </button>
        </form>
      </div>
    </div>
  );
}

/** On My AG: the chat, its newest message, and a dot when there is something new. */
export function AgChatCard({ churchId }: { churchId: string | null }) {
  const tx = useTx();
  const latest = useLatestChat(churchId);
  const readAt = useChatReadAt(churchId);
  const my = useMyChurch();
  const unread = !!latest && latest.createdAt > readAt && latest.uid !== my.membership?.uid;
  return (
    <Link href="/church/chat" className="flex items-center gap-3 rounded-2xl border border-sky-500/30 bg-gradient-to-r from-sky-500/15 to-card p-4">
      <span className="relative flex size-11 shrink-0 items-center justify-center rounded-full bg-sky-600 text-white">
        <MessageCircle className="size-5" />
        {unread && <span className="absolute -right-0.5 -top-0.5 size-3 rounded-full bg-amber-500 ring-2 ring-card" />}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-heading text-sm font-semibold">{tx("AG Chat", "AG Chat")}</span>
        <span className={cn("block truncate text-xs", unread ? "font-semibold text-foreground" : "text-muted-foreground")}>
          {latest ? `${latest.name}: ${latest.text}` : tx("Talk with everyone in your AG", "Makipag-usap sa lahat ng nasa AG mo")}
        </span>
      </span>
      <ChevronRight className="size-4 text-muted-foreground" />
    </Link>
  );
}
