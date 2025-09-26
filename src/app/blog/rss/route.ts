import { NextResponse } from "next/server";
import { blogData } from "../data";

export async function GET() {
  const items = blogData.posts
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .map((p) => `
      <item>
        <title><![CDATA[${p.title}]]></title>
        <link>https://example.com/blog/${p.slug}</link>
        <guid isPermaLink="false">${p.id}</guid>
        <pubDate>${new Date(p.publishedAt).toUTCString()}</pubDate>
        <description><![CDATA[${p.excerpt}]]></description>
      </item>
    `)
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>My App Blog</title>
      <link>https://example.com/blog</link>
      <description>Latest articles</description>
      ${items}
    </channel>
  </rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=600, stale-while-revalidate",
    },
  });
}


