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
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { DateRange } from "react-day-picker";
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
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
    const [activeDatePreset, setActiveDatePreset] = useState<string | null>(null);

    useEffect(() => {
        setPosts(initialPosts);
    }, [initialPosts]);

    const categories = useMemo(() => {
        const allTags = posts.flatMap((post) => post.metadata.tags || []);
        return ["All", ...Array.from(new Set(allTags))];
    }, [posts]);

    // Filter posts based on all criteria
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
                if (!dateRange?.from) return true;
                const postDate = new Date(post.metadata.publishedAt);
                const fromDate = new Date(dateRange.from);
                fromDate.setHours(0, 0, 0, 0); // Start of the day

                if (dateRange.to) {
                    const toDate = new Date(dateRange.to);
                    toDate.setHours(23, 59, 59, 999); // End of the day
                    return postDate >= fromDate && postDate <= toDate;
                }
                // If only a start date is selected, filter from that day onwards
                return postDate >= fromDate;
            });
    }, [posts, searchTerm, selectedCategory, dateRange]);

    // Handler for preset date buttons
    const handleDatePreset = (preset: string) => {
        const now = new Date();
        let fromDate: Date;

        setActiveDatePreset(preset);

        switch (preset) {
            case 'Last 7 days':
                fromDate = new Date();
                fromDate.setDate(now.getDate() - 7);
                break;
            case 'Last 30 days':
                fromDate = new Date();
                fromDate.setMonth(now.getMonth() - 1);
                break;
            case 'Last year':
                fromDate = new Date();
                fromDate.setFullYear(now.getFullYear() - 1);
                break;
            default:
                return;
        }
        setDateRange({ from: fromDate, to: new Date() });
    };

    // Handler to clear date filters
    const clearDateFilter = () => {
        setDateRange(undefined);
        setActiveDatePreset(null);
    }

    // When a custom date range is selected via the picker, clear the active preset button
    useEffect(() => {
        if (dateRange) {
            setActiveDatePreset(null);
        }
    }, [dateRange]);


    return (
        <section>
            <h1 className="font-bold text-3xl mb-4 tracking-tighter">Blog</h1>
            <p className="text-muted-foreground mb-8">
                My thoughts on software development, life, and more.
            </p>

            {/* Search and Filter Controls */}
            <div className="flex flex-col gap-4 mb-12">
                <div className="flex flex-wrap items-center gap-4">
                    <Input
                        type="text"
                        placeholder="Search posts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-sm"
                    />

                    {/* Category Dropdown */}
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

                {/* Date Filters */}
                <div className="flex flex-wrap items-center gap-2">
                    {['Last 7 days', 'Last 30 days', 'Last year'].map(preset => (
                        <Button
                            key={preset}
                            variant={activeDatePreset === preset ? 'default' : 'secondary'}
                            onClick={() => handleDatePreset(preset)}
                            size="sm"
                        >
                            {preset}
                        </Button>
                    ))}
                    <DateRangePicker date={dateRange} setDate={setDateRange} />
                    {dateRange && (
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
