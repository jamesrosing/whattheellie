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

// Cache the API calls using React cache
export const wisp = {
  getPosts: cache(wispClient.getPosts),
  getPost: cache(wispClient.getPost),
  getRelatedPosts: cache(wispClient.getRelatedPosts),
  getTags: cache(wispClient.getTags),
};

export type { GetPostsResult, GetPostResult, GetTagsResult };
