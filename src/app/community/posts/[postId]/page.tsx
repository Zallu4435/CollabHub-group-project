import PostCard from '../../_components/content/PostCard';
import CommentSection from '../../_components/content/CommentSection';
import { posts, comments } from '../../_data/posts';
import { notFound } from 'next/navigation';

export default function PostDetailPage({ params }: { params: { postId: string } }) {
  const post = posts.find(p => p.id === params.postId);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <PostCard {...post} />
        
        <div className="mt-6">
          <CommentSection postId={params.postId} />
        </div>
      </div>
    </div>
  );
}
