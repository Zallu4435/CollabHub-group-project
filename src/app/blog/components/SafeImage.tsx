"use client";
import React from "react";

type Props = {
  src?: string | null;
  alt: string;
  className?: string;
  fallbackSrc: string;
};

export default function SafeImage({ src, alt, className, fallbackSrc }: Props) {
  const [currentSrc, setCurrentSrc] = React.useState<string>(src || fallbackSrc);

  React.useEffect(() => {
    setCurrentSrc(src || fallbackSrc);
  }, [src, fallbackSrc]);

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      onError={() => setCurrentSrc(fallbackSrc)}
    />
  );
}


