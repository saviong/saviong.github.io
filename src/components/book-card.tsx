// src/components/book-card.tsx

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface BookCardProps {
    title: string;
    author: string;
    className?: string;
}

export const BookCard = ({ title, author, className }: BookCardProps) => {
    return (
        <Card className={cn("flex flex-col overflow-hidden", className)}>
            <CardHeader className="flex-1 p-4">
                <h3 className="font-semibold text-sm">{title}</h3>
            </CardHeader>
            <CardContent className="p-4 pt-0">
                <p className="text-xs text-muted-foreground">{author}</p>
            </CardContent>
        </Card>
    );
};