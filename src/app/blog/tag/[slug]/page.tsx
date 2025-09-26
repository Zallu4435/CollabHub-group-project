import BlogCard from "../../components/BlogCard";
import { blogData } from "../../data";

export default function TagPage({ params }: { params: { slug: string } }) {
  const tag = blogData.tags.find(t => t.slug === params.slug);
  if (!tag) return <div className="max-w-3xl mx-auto px-4 py-16">Tag not found.</div>;
  const posts = blogData.posts.filter(p => p.tagIds.includes(tag.id));
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-serif font-bold mb-6 text-black">Tag: {tag.name}</h1>
      <div className="space-y-8">
        {posts.map(p => <BlogCard key={p.id} post={p} />)}
      </div>
      </div>
    </div>
  );
}


