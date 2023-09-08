import blogs from '@/content/blogs.json';

export const useBlogList = () => {
  return blogs.map((item) => ({
    ...item,
    category: item.category ?? '未分類',
  }));
};