"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { parseReference } from "@/lib/bible/reference-parser";

export function ReferenceSearch() {
  const [value, setValue] = useState("");
  const [notFound, setNotFound] = useState(false);
  const router = useRouter();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = parseReference(value);
    if (!parsed) {
      setNotFound(true);
      return;
    }
    setNotFound(false);
    const hash = parsed.verse ? `#v${parsed.verse}` : "";
    router.push(`/bible/${parsed.book.slug}/${parsed.chapter}${hash}`);
  }

  return (
    <form onSubmit={submit} className="relative">
      <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setNotFound(false);
        }}
        placeholder="Jump to a verse — e.g. John 3:16"
        className="h-11 rounded-full pl-10"
      />
      {notFound && (
        <p className="mt-1.5 px-1 text-xs text-destructive">
          Couldn&apos;t find that reference — try a book name and chapter.
        </p>
      )}
    </form>
  );
}
