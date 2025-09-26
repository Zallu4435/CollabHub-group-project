import BlogCard from "../../../components/BlogCard";
import { blogData } from "../../../data";

export default function ArchiveMonthPage({ params }: { params: { year: string; month: string } }) {
  const year = parseInt(params.year, 10);
  const month = parseInt(params.month, 10);
  const posts = blogData.posts.filter(p => {
    const d = new Date(p.publishedAt);
    return d.getUTCFullYear() === year && (d.getUTCMonth() + 1) === month;
  });
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-serif font-bold mb-6 text-black">Archive: {year}/{String(month).padStart(2, '0')}</h1>
        <div className="space-y-8">
          {posts.map(p => <BlogCard key={p.id} post={p} />)}
        </div>
      </div>
    </div>
  );
}


