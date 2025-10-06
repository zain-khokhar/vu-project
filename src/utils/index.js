export const sortBlogs = (blogs) => {
  return blogs
    .slice()
    .sort((a, b) => {
      // Sort by publishedAt date in descending order (newest first)
      if (a.publishedAt && b.publishedAt) {
        return new Date(b.publishedAt) - new Date(a.publishedAt);
      }
      // If no publishedAt, sort by createdAt
      if (a.createdAt && b.createdAt) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return 0;
    });
};