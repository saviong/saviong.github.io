"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatDate } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { X } from "lucide-react";

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

export function BlogClient({ initialPosts }: { initialPosts: Post[] }) {
    const [posts, setPosts] = useState<Post[]>(initialPosts);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    // State is now two simple strings for the date inputs
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
        setPosts(initialPosts);
    }, [initialPosts]);

    const categories = useMemo(() => {
        const allTags = posts.flatMap((post) => post.metadata.tags || []);
        return ["All", ...Array.from(new Set(allTags))];
    }, [posts]);

    // Updated filtering logic for the new date inputs
    const filteredPosts = useMemo(() => {
        return posts
            .filter(
                (post) =>
                    post.metadata.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    post.metadata.summary.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .filter(
                (post) =>
                    selectedCategory === "All" ||
                    (post.metadata.tags && post.metadata.tags.includes(selectedCategory))
            )
            .filter((post) => {
                const postDate = new Date(post.metadata.publishedAt);
                if (startDate) {
                    const fromDate = new Date(startDate);
                    if (postDate < fromDate) return false;
                }
                if (endDate) {
                    const toDate = new Date(endDate);
                    if (postDate > toDate) return false;
                }
                return true;
            });
    }, [posts, searchTerm, selectedCategory, startDate, endDate]);

    // Handler to clear date filters
    const clearDateFilter = () => {
        setStartDate("");
        setEndDate("");
    }

    return (
        <section>
            <h1 className="font-bold text-3xl mb-4 tracking-tighter">Blog</h1>
            <p className="text-muted-foreground mb-8">
                My thoughts on software development, life, and more.
            </p>

            <div className="space-y-4 mb-12">
                <div className="flex flex-wrap items-center gap-4">
                    <Input
                        type="text"
                        placeholder="Search posts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-sm"
                    />

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                Category: {selectedCategory}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuRadioGroup
                                value={selectedCategory}
                                onValueChange={setSelectedCategory}
                            >
                                {categories.map((category) => (
                                    <DropdownMenuRadioItem key={category} value={category}>
                                        {category}
                                    </DropdownMenuRadioItem>
                                ))}
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-2">
                        <label htmlFor="start-date" className="text-sm text-muted-foreground">From:</label>
                        <Input
                            id="start-date"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-auto"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <label htmlFor="end-date" className="text-sm text-muted-foreground">To:</label>
                        <Input
                            id="end-date"
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-auto"
                        />
                    </div>
                    {(startDate || endDate) && (
                        <Button variant="ghost" size="icon" onClick={clearDateFilter} aria-label="Clear date filter">
                            <X className="h-4 w-4" />
                        </Button>
                    )}
                </div>
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
