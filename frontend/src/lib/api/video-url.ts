export const getVideoUrl = (url: string): string => {
  if (url.includes('youtube') || url.includes('youtu.be')) {
    return /^https:\/\/www\.youtube\.com\/embed\//.test(url)
      ? url
      : url.replace(
        /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/,
        'https://www.youtube.com/embed/$1'
      )
  } else if (url.includes('vimeo')) {
    return /^https:\/\/player\.vimeo\.com\/video\//.test(url)
      ? url
      : url.replace(
        /^(?:https?:\/\/)?(?:www\.)?(?:vimeo\.com\/)([\w-]+)/,
        'https://player.vimeo.com/video/$1'
      )
  } else {
    return url;
  }
};