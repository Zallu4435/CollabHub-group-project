import BlogCard from "../../components/BlogCard";
import { blogData } from "../../data";

export default function AuthorPage({ params }: { params: { username: string } }) {
  const author = blogData.authors.find(a => a.username === params.username);
  if (!author) return <div className="max-w-3xl mx-auto px-4 py-16">Author not found.</div>;
  const posts = blogData.posts.filter(p => p.authorId === author.id);
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 bg-gray-300 rounded-full" />
        <div>
          <h1 className="text-2xl font-serif font-bold text-black">{author.name}</h1>
          <p className="text-black text-sm">{author.bio}</p>
        </div>
      </div>
      <div className="space-y-8">
        {posts.map(p => <BlogCard key={p.id} post={p} />)}
      </div>
      </div>
    </div>
  );
}


