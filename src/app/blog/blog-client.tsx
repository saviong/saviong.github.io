"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatDate } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

// Define the type for a single blog post
type Post = {
    slug: string;
    metadata: {
        title: string;
        publishedAt: string;
        summary: string;
        tags?: string[];
    };
};

// The component now accepts the posts as a prop
export function BlogClient({ initialPosts }: { initialPosts: Post[] }) {
    const [posts, setPosts] = useState<Post[]>(initialPosts);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    // 1. New state for the date filter
    const [dateFilter, setDateFilter] = useState("All time");

    useEffect(() => {
        setPosts(initialPosts);
    }, [initialPosts]);

    // Calculate unique categories from the posts
    const categories = useMemo(() => {
        const allTags = posts.flatMap((post) => post.metadata.tags || []);
        return ["All", ...Array.from(new Set(allTags))];
    }, [posts]);

    // Filter posts based on search, category, and now date
    const filteredPosts = useMemo(() => {
        const now = new Date();
        const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));
        now.setDate(now.getDate() + 7); // Reset date for the next calculation
        const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));

        return posts
            .filter(
                (post) =>
                    post.metadata.title
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    post.metadata.summary
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
            )
            .filter(
                (post) =>
                    selectedCategory === "All" ||
                    (post.metadata.tags && post.metadata.tags.includes(selectedCategory))
            )
            // 3. New date filtering logic
            .filter((post) => {
                if (dateFilter === "All time") {
                    return true;
                }
                const postDate = new Date(post.metadata.publishedAt);
                if (dateFilter === "Last 7 days") {
                    return postDate >= sevenDaysAgo;
                }
                if (dateFilter === "Last 30 days") {
                    return postDate >= thirtyDaysAgo;
                }
                return true;
            });
    }, [posts, searchTerm, selectedCategory, dateFilter]);

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
            <div className="flex flex-wrap items-center gap-2 mb-4">
                <p className="text-sm font-medium mr-2">Categories:</p>
                {categories.map((category) => (
                    <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "secondary"}
                        onClick={() => setSelectedCategory(category)}
                        size="sm"
                    >
                        {category}
                    </Button>
                ))}
            </div>

            {/* 2. New UI for the Date Filter */}
            <div className="flex flex-wrap items-center gap-2 mb-12">
                <p className="text-sm font-medium mr-2">Date:</p>
                {["All time", "Last 30 days", "Last 7 days"].map((filter) => (
                    <Button
                        key={filter}
                        variant={dateFilter === filter ? "default" : "secondary"}
                        onClick={() => setDateFilter(filter)}
                        size="sm"
                    >
                        {filter}
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
                            <Link
                                href={`/blog/${post.slug}`}
                                className="block group p-4 rounded-lg transition-all hover:bg-secondary"
                            >
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
                                        {post.metadata.tags?.map((tag) => (
                                            <Badge key={tag} variant="outline">
                                                {tag}
                                            </Badge>
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
