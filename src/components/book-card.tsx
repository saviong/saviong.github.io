// src/components/book-card.tsx

// The component now represents a single item in the timeline
interface BookCardProps {
    number: number;
    title: string;
    author: string;
    isLastItem: boolean;
}

export const BookCard = ({
    number,
    title,
    author,
    isLastItem,
}: BookCardProps) => {
    return (
        <li className="relative flex gap-x-4">
            {/* The vertical connecting line */}
            {!isLastItem && (
                <div className="absolute left-4 top-8 h-full w-px bg-muted-foreground/20" />
            )}

            {/* The numbered circle */}
            <div className="relative flex h-8 w-8 flex-none items-center justify-center rounded-full border border-muted-foreground/20 bg-background">
                <span className="text-sm text-muted-foreground">{number}</span>
            </div>

            {/* The book title and author */}
            <div className="flex-grow pb-8">
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{author}</p>
            </div>
        </li>
    );
};