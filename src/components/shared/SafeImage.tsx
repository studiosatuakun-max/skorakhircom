'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface SafeImageProps extends ImageProps {
  fallbackSrc?: string;
}

export default function SafeImage({ src, fallbackSrc = 'https://via.placeholder.com/800x600/1e293b/facc15?text=SkorAkhir', alt, ...props }: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  return (
    <Image
      {...props}
      src={imgSrc || fallbackSrc}
      alt={alt || 'Image'}
      unoptimized={hasError} // Hindari server crash kalau URL rusak
      onError={() => {
        if (!hasError) {
          setImgSrc(fallbackSrc);
          setHasError(true);
        }
      }}
    />
  );
}
