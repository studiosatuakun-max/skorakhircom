'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface SafeImageProps extends ImageProps {
  fallbackSrc?: string;
}

export default function SafeImage({ src, fallbackSrc = '/images/placeholder.png', alt, ...props }: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  return (
    <Image
      {...props}
      src={imgSrc || fallbackSrc}
      alt={alt || 'Image'}
      unoptimized={true} // BUKAN hasError, paksa unoptimized agar bypass Next.js image optimizer yang sering di-block WP
      onError={() => {
        if (!hasError) {
          setImgSrc(fallbackSrc);
          setHasError(true);
        }
      }}
    />
  );
}
