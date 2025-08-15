export const POSTS_PER_PAGE = 6;
export const RELATED_POSTS_LIMIT = 3;

export const ERROR_MESSAGES = {
  POSTS_LOAD_ERROR: 'Unable to load posts',
  POST_NOT_FOUND: 'Blog post not found',
  POST_NOT_FOUND_DESC: 'The requested blog post could not be found.',
  GENERIC_ERROR: 'Please try again later.',
} as const;

export const CACHE_REVALIDATE_SECONDS = {
  POSTS_LIST: 60, // 1 minute
  POST_DETAIL: 300, // 5 minutes
  TAGS: 3600, // 1 hour
} as const;