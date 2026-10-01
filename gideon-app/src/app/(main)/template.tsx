// A quick fade as each page opens. Opacity only, in CSS (see .page-enter in
// globals.css): the GPU runs it, so it stays smooth while the page loads.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
