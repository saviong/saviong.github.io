"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatDate } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useState, useRef } from "react";
import { X, ChevronDown, Check } from "lucide-react";

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

// Custom Dropdown Component
const CategoryDropdown = ({
    categories,
    selectedCategory,
    onSelect
}: {
    categories: string[],
    selectedCategory: string,
    onSelect: (category: string) => void
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (category: string) => {
        onSelect(category);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <Button
                variant="outline"
                onClick={() => setIsOpen(!isOpen)}
                className="min-w-[160px] justify-between"
            >
                Category: {selectedCategory}
                <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                        }`}
                />
            </Button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-0 mt-2 w-[200px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 py-1 max-h-[300px] overflow-y-auto"
                    >
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => handleSelect(category)}
                                className={`w-full text-left px-3 py-2 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-between ${selectedCategory === category
                                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-100"
                                    : ""
                                    }`}
                            >
                                <span>{category}</span>
                                {selectedCategory === category && (
                                    <Check className="h-4 w-4" />
                                )}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export function BlogClient({ initialPosts }: { initialPosts: Post[] }) {
    const [posts, setPosts] = useState<Post[]>(initialPosts);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
        setPosts(initialPosts);
    }, [initialPosts]);

    const categories = useMemo(() => {
        const allTags = posts.flatMap((post) => post.metadata.tags || []);
        return ["All", ...Array.from(new Set(allTags))];
    }, [posts]);

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

    const clearDateFilter = () => {
        setStartDate("");
        setEndDate("");
    };

    return (
        <section>
            <h1 className="font-bold text-3xl mb-4 tracking-tighter">Blog</h1>
            <p className="text-muted-foreground mb-8">
                My thoughts on software development, life, and more.
            </p>

            <div className="mb-12 space-y-4">
                {/* First row of filters */}
                <div className="flex flex-wrap items-center gap-4">
                    <Input
                        type="text"
                        placeholder="Search posts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-sm"
                    />

                    <CategoryDropdown
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onSelect={setSelectedCategory}
                    />
                </div>

                {/* Second row of filters */}
                <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-2">
                        <label htmlFor="start-date" className="text-sm text-muted-foreground">
                            From:
                        </label>
                        <Input
                            id="start-date"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-auto"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <label htmlFor="end-date" className="text-sm text-muted-foreground">
                            To:
                        </label>
                        <Input
                            id="end-date"
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-auto"
                        />
                    </div>
                    {(startDate || endDate) && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={clearDateFilter}
                            aria-label="Clear date filter"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            </div>

            {/* Filtered Post List */}
            <div className="grid grid-cols-1 gap-8">
                <AnimatePresence mode="wait">
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((post) => (
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
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-12"
                        >
                            <p className="text-muted-foreground">
                                No posts found matching your filters.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}