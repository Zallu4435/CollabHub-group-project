"use client";

type Heading = { id: string; text: string; level: number };

export default function TOC({ headings }: { headings: Heading[] }) {
  return (
    <nav className="text-sm text-black">
      <h3 className="font-semibold mb-2 text-black">On this page</h3>
      <ul className="space-y-1">
        {headings.map((h) => (
          <li key={h.id} className="text-black">
            <a href={`#${h.id}`} className="hover:text-black" style={{ paddingLeft: (h.level - 1) * 12 }}>
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}


