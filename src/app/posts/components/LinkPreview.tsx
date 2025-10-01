import React from 'react';
import { LinkPreview as LinkPreviewType } from "../types";

interface LinkPreviewProps {
  preview: LinkPreviewType;
}

export default function LinkPreview({ preview }: LinkPreviewProps) {
  const { url, title, description, imageUrl, siteName } = preview;
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="block border rounded-lg overflow-hidden hover:shadow-sm transition-shadow">
      <div className="flex">
        {imageUrl ? (
          <div className="w-32 h-24 bg-gray-100 flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageUrl} alt={title || siteName || url} className="w-full h-full object-cover" />
          </div>
        ) : null}
        <div className="flex-1 p-3">
          {siteName ? <div className="text-xs text-gray-500">{siteName}</div> : null}
          {title ? <div className="text-sm font-semibold text-gray-900 line-clamp-2">{title}</div> : null}
          {description ? <div className="text-sm text-gray-700 line-clamp-2 mt-1">{description}</div> : null}
          {!title && !description ? <div className="text-sm text-blue-600 truncate">{url}</div> : null}
        </div>
      </div>
    </a>
  );
}


