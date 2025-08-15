import { config } from "@/config";
import {
  buildWispClient,
  GetPostsResult,
  GetPostResult,
  GetTagsResult,
} from "@wisp-cms/client";
import { cache } from "react";

// Create a singleton instance of the Wisp client
const wispClient = buildWispClient({
  blogId: config.wisp.blogId,
});

// Cache the read-only API calls using React cache
// Keep write operations uncached
export const wisp = {
  // Cached read operations
  getPosts: cache(wispClient.getPosts),
  getPost: cache(wispClient.getPost),
  getRelatedPosts: cache(wispClient.getRelatedPosts),
  getTags: cache(wispClient.getTags),
  getComments: cache(wispClient.getComments),
  // Uncached write operations
  createComment: wispClient.createComment,
};

export type { GetPostsResult, GetPostResult, GetTagsResult };
