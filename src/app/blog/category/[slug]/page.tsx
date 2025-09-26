import BlogCard from "../../components/BlogCard";
import { blogData } from "../../data";

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = blogData.categories.find(c => c.slug === params.slug);
  if (!category) return <div className="max-w-3xl mx-auto px-4 py-16">Category not found.</div>;
  const posts = blogData.posts.filter(p => p.categoryIds.includes(category.id));
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-serif font-bold mb-6 text-black">Category: {category.name}</h1>
      <div className="space-y-8">
        {posts.map(p => <BlogCard key={p.id} post={p} />)}
      </div>
      </div>
    </div>
  );
}


