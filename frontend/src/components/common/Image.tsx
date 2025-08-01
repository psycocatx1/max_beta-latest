import { getImageUrl } from "@/lib/api/image-url";
import { default as NextImage, StaticImageData } from "next/image";

type NextImageType = {
  alt: string;
  width?: number | `${number}`;
  height?: number | `${number}`;
  fill?: boolean;
  quality?: number | `${number}`;
  priority?: boolean;
  loading?: "eager" | "lazy" | undefined;
  blurDataURL?: string;
  unoptimized?: boolean;
  overrideSrc?: string;
  layout?: string;
  objectFit?: string;
  objectPosition?: string;
  lazyBoundary?: string;
  lazyRoot?: string;
}

interface ImageProps extends NextImageType {
  src?: string | StaticImageData;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fallback?: string | StaticImageData;
  fill?: boolean;
  sizes?: string;
  quality?: number;
  style?: React.CSSProperties;
}

export const Image = ({
  src,
  alt,
  width = 150,
  height = 150,
  className,
  priority = false,
  fallback,
  fill = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  quality = 80,
  style,
  ...props
}: ImageProps) => {
  // If src is StaticImageData, use it directly
  if (src && typeof src !== 'string') {
    return (
      <NextImage
        src={src}
        alt={alt}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        fill={fill}
        priority={priority}
        quality={quality}
        sizes={sizes}
        className={className}
        style={style}
        {...props}
      />
    );
  }

  // For regular URLs, process with getImageUrl
  const image_src = src ? getImageUrl(String(src)) : '';

  // If no image source but fallback is StaticImageData
  if (!image_src && fallback && typeof fallback !== 'string') {
    return (
      <NextImage
        src={fallback}
        alt={alt}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        fill={fill}
        priority={priority}
        quality={quality}
        sizes={sizes}
        className={className}
        {...props}
      />
    );
  }

  // For string-based images (with or without fallback)
  const finalSrc = image_src || (fallback && typeof fallback === 'string' ? getImageUrl(fallback) : '/placeholder.png');

  return (
    <NextImage
      src={finalSrc || '/placeholder.png'}
      alt={alt}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      fill={fill}
      priority={priority}
      quality={quality}
      sizes={sizes}
      className={className}
      {...props}
    />
  );
}