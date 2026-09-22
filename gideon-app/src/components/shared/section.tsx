import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Section({
  title,
  href,
  hrefLabel = "See all",
  className,
  children,
}: {
  title: string;
  href?: string;
  hrefLabel?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={cn("px-5", className)}>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-heading text-lg font-semibold tracking-tight">
          {title}
        </h2>
        {href && (
          <Link
            href={href}
            className="flex items-center gap-0.5 text-xs font-medium text-primary"
          >
            {hrefLabel}
            <ChevronRight className="size-3.5" />
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}
