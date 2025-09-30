'use client';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
}

export default function VideoPlayer({ src, poster, className = '' }: VideoPlayerProps) {
  const isYouTube = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//i.test(src);

  return (
    <div className={`relative w-full overflow-hidden rounded-lg ${isYouTube ? 'bg-transparent' : 'bg-black'} ${className}`}>
      {isYouTube ? (
        <div className="relative" style={{ paddingTop: '56.25%' }}>
          <iframe
            src={transformYouTubeUrlToEmbed(src)}
            title="YouTube video player"
            className="absolute inset-0 w-full h-full rounded-lg"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      ) : (
        <video
          src={src}
          poster={poster}
          controls
          className="w-full h-full"
          preload="metadata"
        >
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
}

function transformYouTubeUrlToEmbed(url: string): string {
  try {
    const u = new URL(url, typeof window !== 'undefined' ? window.location.origin : 'https://example.com');
    // youtu.be/<id>
    if (u.hostname.includes('youtu.be')) {
      const id = u.pathname.slice(1);
      return `https://www.youtube.com/embed/${id}`;
    }
    // youtube.com/watch?v=<id>
    const v = u.searchParams.get('v');
    if (u.hostname.includes('youtube.com') && v) {
      return `https://www.youtube.com/embed/${v}`;
    }
    return url;
  } catch {
    return url;
  }
}
