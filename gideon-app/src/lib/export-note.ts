import type { SpiritualNote } from "@/types";

export function exportNoteAsText(note: SpiritualNote) {
  const body = [
    note.title,
    `Category: ${note.category}`,
    note.tags.length ? `Tags: ${note.tags.join(", ")}` : "",
    "",
    note.content,
  ]
    .filter(Boolean)
    .join("\n");

  const blob = new Blob([body], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${note.title.replace(/[^\w\- ]+/g, "").trim() || "note"}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
