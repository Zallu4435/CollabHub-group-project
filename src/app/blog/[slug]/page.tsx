import Link from "next/link";
import { blogData, getPostBySlug, getRelatedPosts, getTeamById } from "../data";
import TOC from "../components/TOC";
import RichPostRenderer from "../components/RichPostRenderer";
import ReadingControls from "../components/ReadingControls";
import PresentationMode from "../components/PresentationMode";
import ReadingProgress from "../components/ReadingProgress";
import SafeImage from "../components/SafeImage";
import CommentsPanel from "../components/CommentsPanel";
import FollowAuthor from "../components/FollowAuthor";

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Post Not Found</h1>
          <p className="text-gray-600 mb-6">The post you're looking for doesn't exist.</p>
          <Link 
            href="/blog" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }
  
  const author = blogData.authors.find(a => a.id === post.authorId);
  const team = post.teamId ? getTeamById(post.teamId) : null;
  const related = getRelatedPosts(post.id, 3);
  const tagChips = blogData.tags.filter(t => post.tagIds.includes(t.id));
  const publishedDate = new Date(post.publishedAt).toLocaleDateString(undefined, {
    year: "numeric", month: "long", day: "numeric"
  });
  const defaultCover = "https://placehold.co/1200x630/ffffff/000000?text=Cover+Image";
  const defaultAvatar = "https://placehold.co/80x80/ffffff/000000?text=A";
  const tagById = Object.fromEntries(blogData.tags.map(t => [t.id, t]));
  const categoryById = Object.fromEntries(blogData.categories.map(c => [c.id, c]));

  // Basic TOC from markdown headings (very naive for demo)
  const headings = (post.content.match(/^#+\s.+$/gm) || []).map((line) => {
    const level = ((line.match(/^#+/) || ["#"])[0]).length;
    const text = line.replace(/^#+\s/, "").trim();
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    return { id, text, level };
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <ReadingProgress />
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              href="/blog" 
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
            <div className="text-sm text-gray-500">
              {post.readingMinutes} min read
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main article */}
          <article className="lg:col-span-8 xl:col-span-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Article Header */}
              <div className="px-6 sm:px-8 pt-8 pb-6 border-b border-gray-100">
                <header>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-gray-900 mb-4 leading-tight">
                    {post.title}
                  </h1>
                  
                  {/* Author & Meta Info */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3">
                        {team ? (
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                            <span className="text-sm">👥</span>
                          </div>
                        ) : (
                          <SafeImage 
                            src={author?.avatarUrl}
                            fallbackSrc={defaultAvatar}
                            alt={author?.name || 'Author avatar'} 
                            className="w-10 h-10 rounded-full object-cover border-2 border-gray-100" 
                          />
                        )}
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900">
                              {team ? team.name : author?.name}
                            </span>
                            {team && (
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                                Team
                              </span>
                            )}
                            {post.status === 'pending_review' && (
                              <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full font-medium">
                                Pending Review
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-500">
                            {publishedDate}
                            {post.location && (
                              <span className="ml-2 text-gray-600">
                                • Posted in {post.location.displayText}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Tags */}
                    {tagChips.length > 0 && (
                      <div className="hidden md:flex flex-wrap gap-2">
                        {tagChips.map(tag => (
                          <span 
                            key={tag.id} 
                            className="inline-flex items-center px-2.5 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full border border-blue-200"
                          >
                            #{tag.slug}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Cover Image */}
                  {(post.coverImageUrl || defaultCover) && (
                    <div className="mb-6 overflow-hidden rounded-lg">
                      <SafeImage 
                        src={post.coverImageUrl}
                        fallbackSrc={defaultCover}
                        alt="Cover image" 
                        className="w-full h-auto object-cover" 
                      />
                    </div>
                  )}

                  {/* Reading Controls */}
                  <div className="flex flex-wrap items-center gap-3">
                    <ReadingControls contentForTTS={post.content} />
                    <PresentationMode content={post.content} />
                  </div>
                </header>
              </div>

              {/* Article Content */}
              <div className="px-6 sm:px-8 py-8">
                <div className="prose prose-lg max-w-none text-gray-900 prose-headings:text-gray-900 prose-headings:font-serif prose-headings:tracking-tight prose-headings:scroll-mt-24 prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-900 prose-li:text-gray-900 prose-strong:text-gray-900 prose-code:text-gray-900 prose-a:text-blue-700 prose-p:leading-8">
                  <RichPostRenderer content={post.content} />
                </div>
              </div>

              {/* Footer Content */}
              <div className="px-6 sm:px-8 pb-8">
                {/* Linked Projects */}
                {(post.linkedProjectIds ?? []).length > 0 && (
                  <section className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      Related Projects
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {(post.linkedProjectIds ?? []).map(id => (
                        <span 
                          key={id} 
                          className="inline-flex items-center px-3 py-1.5 text-sm font-medium bg-white text-gray-700 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                          Project {id}
                        </span>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </div>
          </article>

          {/* Sidebar TOC */}
          <aside className="hidden lg:block lg:col-span-4 xl:col-span-4">
            <div className="sticky top-28 space-y-4">
              <TOC headings={headings} />
              {author && <FollowAuthor author={author} />}
            </div>
          </aside>
        </div>
        
        {/* Under-article interactive sections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
          <div className="lg:col-span-8 xl:col-span-8 space-y-4">
            <CommentsPanel storageKey={`post-comments-${post.id}`} />
          </div>
        </div>

        {/* Related Posts - outside the article card */}
        {related.length > 0 && (
          <section className="mt-6">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Related by topic
            </h3>
            <p className="text-sm text-gray-600 mb-4">We surface articles with overlapping tags, categories, or projects so it's clear why they're shown.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map(r => (
                <Link 
                  key={r.id} 
                  href={`/blog/${r.slug}`} 
                  className="group block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-gray-300 transition-all duration-200"
                >
                  <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">
                    {r.title}
                  </div>
                  <div className="text-sm text-gray-600 line-clamp-2 mb-3">
                    {r.excerpt}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {r.tagIds.filter(id => post.tagIds.includes(id)).slice(0, 3).map(id => (
                      <span key={`t-${id}`} className="text-[11px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">#{tagById[id]?.slug || 'tag'}</span>
                    ))}
                    {r.categoryIds.filter(id => post.categoryIds.includes(id)).slice(0, 2).map(id => (
                      <span key={`c-${id}`} className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 border border-gray-200">{categoryById[id]?.name || 'Category'}</span>
                    ))}
                    {(r.linkedProjectIds ?? []).filter(id => (post.linkedProjectIds ?? []).includes(id)).slice(0, 2).map(id => (
                      <span key={`p-${id}`} className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">Project {id}</span>
                    ))}
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>{r.readingMinutes} min read</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
