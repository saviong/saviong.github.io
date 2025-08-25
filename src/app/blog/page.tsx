"use client";

import { getBlogPosts } from "@/data/blog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatDate } from "@/lib/utils";

type Post = Awaited<ReturnType<typeof getBlogPosts>>[0];

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetch posts on component mount
  useEffect(() => {
    async function fetchPosts() {
      const fetchedPosts = await getBlogPosts();
      // Sort posts by date, newest first
      fetchedPosts.sort((a, b) => new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime());
      setPosts(fetchedPosts);
    }
    fetchPosts();
  }, []);

  // Calculate unique categories from the posts
  const categories = useMemo(() => {
    const allTags = posts.flatMap(post => post.metadata.tags || []);
    return ["All", ...Array.from(new Set(allTags))];
  }, [posts]);

  // Filter posts based on search term and selected category
  const filteredPosts = useMemo(() => {
    return posts
      .filter(post =>
      (post.metadata.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.metadata.summary.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      .filter(post =>
        selectedCategory === "All" || (post.metadata.tags && post.metadata.tags.includes(selectedCategory))
      );
  }, [posts, searchTerm, selectedCategory]);

  return (
    <section>
      <h1 className="font-bold text-3xl mb-4 tracking-tighter">Blog</h1>
      <p className="text-muted-foreground mb-8">
        My thoughts on software development, life, and more.
      </p>

      {/* Search Input */}
      <div className="mb-8">
        <Input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-12">
        {categories.map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "secondary"}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Filtered Post List */}
      <div className="grid grid-cols-1 gap-8">
        <AnimatePresence>
          {filteredPosts.map((post) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Link href={`/blog/${post.slug}`} className="block group p-4 rounded-lg transition-all hover:bg-secondary">
                <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                  {post.metadata.title}
                </h2>
                <p className="text-muted-foreground mt-2">
                  {post.metadata.summary}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <time className="text-sm text-muted-foreground">
                    {formatDate(post.metadata.publishedAt)}
                  </time>
                  <div className="flex flex-wrap gap-2">
                    {post.metadata.tags?.map(tag => (
                      <Badge key={tag} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}