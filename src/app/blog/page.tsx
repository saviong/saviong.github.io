import { getBlogPosts } from "@/data/blog";
import { BlogClient } from "./blog-client";

export const metadata = {
  title: "Blog",
  description: "My thoughts on software development, life, and more.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return <BlogClient initialPosts={posts} />;
}
