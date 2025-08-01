import { getVideoUrl } from '@/lib/api/video-url';

type IframeProps = React.ComponentProps<'iframe'> & {
  url: string;
  allow?: string;
  title?: string;
  allowFullScreen?: boolean;
  className?: string;
}

export const Iframe = ({ url, title, allow, allowFullScreen, className, ...props }: IframeProps) => {
  const video_url = getVideoUrl(url);

  return (
    <iframe
      src={video_url}
      title={title}
      allow={allow || 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'}
      allowFullScreen={allowFullScreen || true}
      className={className}
      {...props}
    />
  );
};