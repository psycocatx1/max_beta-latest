export const getPageNumbers = (current_page: number, total_pages: number) => {
  const pages = [];
  const maxVisiblePages = 5;
  const halfVisible = Math.floor(maxVisiblePages / 2);

  let startPage = Math.max(1, current_page - halfVisible);
  const endPage = Math.min(total_pages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  if (startPage > 1) {
    pages.push(1);
    if (startPage > 2) pages.push(-1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (endPage < total_pages) {
    if (endPage < total_pages - 1) pages.push(-1);
    pages.push(total_pages);
  }

  return pages;
};