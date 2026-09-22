"use client";

import Link from "next/link";
import { CalendarCheck2, Bookmark, Highlighter, History } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { ReferenceSearch } from "@/components/bible/reference-search";
import { BookGrid } from "@/components/bible/book-grid";
import { OLD_TESTAMENT, NEW_TESTAMENT } from "@/lib/bible/books";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpenText } from "lucide-react";

const LINKS = [
  { label: "Reading Plans", href: "/bible/plans", icon: CalendarCheck2 },
  { label: "Bookmarks", href: "/bible/bookmarks", icon: Bookmark },
  { label: "Highlights", href: "/bible/highlights", icon: Highlighter },
  { label: "History", href: "/bible/history", icon: History },
];

export default function BiblePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Bible"
        subtitle="Old & New Testament"
        icon={BookOpenText}
      />

      <div className="px-5">
        <ReferenceSearch />
      </div>

      <div className="grid grid-cols-4 gap-2 px-5">
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="flex flex-col items-center gap-1.5 rounded-xl border border-border/70 bg-card py-3 text-center"
          >
            <l.icon className="size-4 text-primary" />
            <span className="text-[10px] font-medium leading-tight">
              {l.label}
            </span>
          </Link>
        ))}
      </div>

      <div className="px-5">
        <Tabs defaultValue="ot">
          <TabsList className="w-full">
            <TabsTrigger value="ot" className="flex-1">
              Old Testament
            </TabsTrigger>
            <TabsTrigger value="nt" className="flex-1">
              New Testament
            </TabsTrigger>
          </TabsList>
          <TabsContent value="ot" className="mt-4">
            <BookGrid books={OLD_TESTAMENT} />
          </TabsContent>
          <TabsContent value="nt" className="mt-4">
            <BookGrid books={NEW_TESTAMENT} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
