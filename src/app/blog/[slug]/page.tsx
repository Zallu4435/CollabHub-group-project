import Link from "next/link";
import { blogData, getPostBySlug, getRelatedPosts } from "../data";
import TOC from "../components/TOC";

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return <div className="max-w-3xl mx-auto px-4 py-16">Post not found.</div>;
  }
  const author = blogData.authors.find(a => a.id === post.authorId);
  const related = getRelatedPosts(post.id, 3);

  // Basic TOC from markdown headings (very naive for demo)
  const headings = (post.content.match(/^#+\s.+$/gm) || []).map((line) => {
    const level = ((line.match(/^#+/) || ["#"])[0]).length;
    const text = line.replace(/^#+\s/, "").trim();
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    return { id, text, level };
  });

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
      <article className="lg:col-span-3">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">{post.title}</h1>
        <div className="flex items-center space-x-3 text-sm text-black mb-8">
          <div className="w-8 h-8 bg-gray-300 rounded-full" />
          <span>{author?.name}</span>
          <span>•</span>
          <span>{post.readingMinutes} min read</span>
        </div>
        <div className="prose max-w-none text-black">
          {/* Render markdown very simply */}
          {post.content.split("\n\n").map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>

        {/* Linked projects */}
        {post.linkedProjectIds?.length ? (
          <div className="mt-10">
            <h3 className="font-semibold mb-2">From this project</h3>
            <div className="flex flex-wrap gap-2">
              {post.linkedProjectIds.map(id => (
                <span key={id} className="px-2 py-1 text-xs rounded bg-gray-100">Project {id}</span>
              ))}
            </div>
          </div>
        ) : null}

        {/* Related posts */}
        <div className="mt-12">
          <h3 className="font-semibold mb-4">Related posts</h3>
          <div className="space-y-3">
            {related.map(r => (
              <Link key={r.id} href={`/blog/${r.slug}`} className="block text-black hover:underline">
                {r.title}
              </Link>
            ))}
          </div>
        </div>
      </article>

      <aside>
        <TOC headings={headings} />
      </aside>
      </div>
    </div>
  );
}


