"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Church as ChurchIcon, MapPin, Pencil, Search, Users } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/hooks/use-auth";
import { countMembers, listAllChurches, switchAg, updateChurch, useMyChurch } from "@/lib/hooks/use-church";
import { NATIONAL_ADMIN_UID, type Church } from "@/lib/church";
import { useTx } from "@/lib/i18n";

const inputClass = "h-9 w-full rounded-lg border border-border bg-background px-2 text-sm";

type Form = Pick<Church, "name" | "pastorName" | "city" | "province" | "country" | "denomination">;

/**
 * The owner (national admin) sees every AG ever made, opens any of them with
 * full leader access, and edits their details.
 */
export default function AllAgsPage() {
  const tx = useTx();
  const router = useRouter();
  const { uid, loading: authLoading } = useAuth();
  const my = useMyChurch();
  const isAdmin = uid === NATIONAL_ADMIN_UID;
  const [items, setItems] = useState<Church[] | null>(null);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<Form | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      const list = await listAllChurches();
      setItems(list);
      const pairs = await Promise.all(list.map(async (c) => [c.id, await countMembers(c.id).catch(() => 0)] as const));
      setCounts(Object.fromEntries(pairs));
    } catch {
      setItems([]);
      setError(tx("Couldn't load the AGs. Check your connection.", "Hindi ma-load ang mga AG. Tingnan ang connection mo."));
    }
  }, [tx]);

  useEffect(() => {
    if (!isAdmin) return;
    // Loading from Firestore is the external sync here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [isAdmin, load]);

  const title = tx("All AGs (Owner)", "Lahat ng AG (Owner)");
  if (authLoading) return <PageHeader title={title} back />;
  if (!isAdmin) {
    return (
      <div>
        <PageHeader title={title} icon={ChurchIcon} back />
        <EmptyState icon={ChurchIcon} title={tx("Owner only", "Para sa owner lamang")} description="" />
      </div>
    );
  }

  const open = (id: string) => {
    switchAg(id);
    router.push("/church");
  };

  const startEdit = (c: Church) => {
    setEditing(c.id);
    setError("");
    setForm({
      name: c.name ?? "",
      pastorName: c.pastorName ?? "",
      city: c.city ?? "",
      province: c.province ?? "",
      country: c.country ?? "",
      denomination: c.denomination ?? "",
    });
  };

  async function run(action: () => Promise<void>) {
    setBusy(true);
    setError("");
    try {
      await action();
      await load();
    } catch {
      setError(tx("That change failed. Please try again.", "Pumalya ang pagbabago. Subukan ulit."));
    } finally {
      setBusy(false);
    }
  }

  const save = (id: string) =>
    run(async () => {
      if (!form || form.name.trim().length < 2 || !form.city.trim() || form.country.trim().length < 2) {
        throw new Error("invalid");
      }
      const trimmed = Object.fromEntries(Object.entries(form).map(([k, v]) => [k, v.trim()])) as Form;
      await updateChurch(id, trimmed);
      setEditing(null);
    });

  const q = search.trim().toLowerCase();
  const shown = (items ?? []).filter(
    (c) => !q || [c.name, c.city, c.province, c.country, c.pastorName].some((v) => v?.toLowerCase().includes(q))
  );
  const field = (key: keyof Form, label: string) => (
    <label className="space-y-1">
      <span className="text-[0.6875rem] text-muted-foreground">{label}</span>
      <input
        className={inputClass}
        value={form?.[key] ?? ""}
        onChange={(e) => setForm((f) => (f ? { ...f, [key]: e.target.value } : f))}
      />
    </label>
  );

  return (
    <div>
      <PageHeader
        title={title}
        subtitle={items ? `${items.length} AG` : tx("Loading…", "Naglo-load…")}
        icon={ChurchIcon}
        back
      />
      <div className="space-y-3 px-5 pb-8">
        <p className="text-xs text-muted-foreground">
          {tx(
            "As owner you can open any AG with full leader access (members, courses, live studies, meetings) and edit its details.",
            "Bilang owner, mabubuksan mo ang kahit anong AG nang may buong leader access (members, courses, live study, meetings) at ma-edit ang detalye nito."
          )}
        </p>
        <label className="flex items-center gap-2 rounded-lg border border-border bg-background px-2">
          <Search className="size-4 text-muted-foreground" />
          <input
            className="h-10 w-full bg-transparent text-sm outline-none"
            placeholder={tx("Search AG, city, leader", "Hanapin ang AG, lungsod, leader")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        {error && <p className="text-xs text-destructive">{error}</p>}

        {shown.map((c) => {
          const current = c.id === my.churchId;
          const suspended = c.status === "suspended";
          return (
            <div
              key={c.id}
              className={`space-y-3 rounded-2xl border bg-card p-4 ${current ? "border-primary" : "border-border/70"}`}
            >
              <div className="flex items-start gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <ChurchIcon className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-medium">
                    {c.name}
                    {current && <span className="ml-1 text-xs text-primary">· {tx("open now", "bukas ngayon")}</span>}
                    {suspended && <span className="ml-1 text-xs text-destructive">· {tx("suspended", "naka-suspend")}</span>}
                  </p>
                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="size-3" />
                    {[c.city, c.province, c.country].filter(Boolean).join(", ")}
                  </p>
                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Users className="size-3" />
                    {counts[c.id] ?? "…"} {tx("members", "miyembro")}
                    {c.pastorName && ` · ${tx("Leader", "Lider")}: ${c.pastorName}`}
                  </p>
                </div>
                <button
                  aria-label={tx("Edit", "I-edit")}
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => (editing === c.id ? setEditing(null) : startEdit(c))}
                >
                  <Pencil className="size-4" />
                </button>
              </div>

              {editing === c.id && form ? (
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="col-span-2">{field("name", tx("AG name", "Pangalan ng AG"))}</div>
                    {field("pastorName", tx("Leader name", "Pangalan ng lider"))}
                    {field("denomination", tx("Church / group", "Simbahan / grupo"))}
                    {field("city", tx("City", "Lungsod"))}
                    {field("province", tx("Province", "Probinsya"))}
                    <div className="col-span-2">{field("country", tx("Country", "Bansa"))}</div>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1" disabled={busy} onClick={() => save(c.id)}>
                      {tx("Save", "I-save")}
                    </Button>
                    <Button variant="outline" disabled={busy} onClick={() => setEditing(null)}>
                      {tx("Cancel", "Kanselahin")}
                    </Button>
                  </div>
                  <button
                    className={`w-full text-center text-xs underline underline-offset-2 ${suspended ? "text-primary" : "text-destructive"}`}
                    disabled={busy}
                    onClick={() => {
                      const msg = suspended
                        ? tx(`Reactivate ${c.name}?`, `I-activate ulit ang ${c.name}?`)
                        : tx(
                            `Suspend ${c.name}? It disappears from the join list; members keep their data.`,
                            `I-suspend ang ${c.name}? Mawawala ito sa listahan ng sasalihan; mananatili ang data ng mga member.`
                          );
                      if (!confirm(msg)) return;
                      run(() => updateChurch(c.id, { status: suspended ? "active" : "suspended" }));
                    }}
                  >
                    {suspended ? tx("Reactivate AG", "I-activate ulit ang AG") : tx("Suspend AG", "I-suspend ang AG")}
                  </button>
                </div>
              ) : (
                <Button className="w-full" variant={current ? "outline" : "default"} onClick={() => open(c.id)}>
                  {current ? tx("Go to this AG", "Pumunta sa AG na ito") : tx("Open as owner", "Buksan bilang owner")}
                </Button>
              )}
            </div>
          );
        })}
        {items && shown.length === 0 && (
          <p className="py-6 text-center text-sm text-muted-foreground">{tx("No AGs found.", "Walang nahanap na AG.")}</p>
        )}
      </div>
    </div>
  );
}
