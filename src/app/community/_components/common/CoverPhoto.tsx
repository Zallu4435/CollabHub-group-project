import Image from 'next/image';

interface CoverPhotoProps {
  src?: string;
  alt: string;
  height?: string;
  editable?: boolean;
  onEdit?: () => void;
}

export default function CoverPhoto({ 
  src, 
  alt, 
  height = 'h-48', 
  editable = false,
  onEdit 
}: CoverPhotoProps) {
  return (
    <div className={`relative w-full ${height} bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 overflow-hidden`}>
      {src && (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
        />
      )}
      {editable && (
        <button
          onClick={onEdit}
          className="absolute bottom-4 right-4 bg-white/90 hover:bg-white px-4 py-2 rounded-lg shadow-lg transition-all flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Edit Cover
        </button>
      )}
    </div>
  );
}
