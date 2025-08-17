// src/components/career-path.tsx

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FlaskConical, TrendingUp, Cloud, ChevronRight, ChevronDown } from "lucide-react";
import React, { useState } from "react";

// The data for your career stages remains the same
const careerPathData = [
    {
        icon: <FlaskConical className="h-8 w-8 text-blue-400" />,
        title: "Chemist",
        description: "Building a foundation in analytical and systematic problem-solving.",
    },
    {
        icon: <TrendingUp className="h-8 w-8 text-green-400" />,
        title: "Technical Sales & Marketing",
        description: "Translating complex technical features into customer-centric solutions.",
    },
    {
        icon: <Cloud className="h-8 w-8 text-purple-400" />,
        title: "Cloud & DevOps",
        description: "Automating and scaling infrastructure to build efficient systems.",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
        },
    },
};

export const CareerPath = () => {
    // 1. We add a state to track which item is currently being hovered
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <div className="mt-6 w-full">
            {/* This container holds the icons and titles */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-2"
                // When the mouse leaves the entire container, reset the active index
                onMouseLeave={() => setActiveIndex(null)}
            >
                {careerPathData.map((item, index) => (
                    <React.Fragment key={item.title}>
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col items-center text-center p-4 rounded-lg cursor-pointer"
                            // 2. Set the active index when the mouse enters this item
                            onMouseEnter={() => setActiveIndex(index)}
                            // 3. Animate opacity to make non-hovered items dimmer
                            animate={{
                                scale: activeIndex === index ? 1.1 : 1, // Enlarge hovered item
                                opacity: activeIndex === null || activeIndex === index ? 1 : 0.6, // Brighten hovered item
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-3">
                                {item.icon}
                            </div>
                            <h3 className="font-bold">{item.title}</h3>
                            {/* 4. The description is now removed from here */}
                        </motion.div>

                        {index < careerPathData.length - 1 && (
                            <motion.div variants={itemVariants}>
                                <ChevronDown className="h-8 w-8 text-muted-foreground md:hidden" />
                                <ChevronRight className="h-8 w-8 text-muted-foreground hidden md:block" />
                            </motion.div>
                        )}
                    </React.Fragment>
                ))}
            </motion.div>

            {/* 5. This new section displays the description with a fade effect */}
            <div className="relative mt-4 flex h-16 items-center justify-center">
                <AnimatePresence>
                    {activeIndex !== null && (
                        <motion.p
                            key={activeIndex} // The key ensures the component re-animates on change
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="text-center text-sm text-muted-foreground absolute"
                        >
                            {careerPathData[activeIndex].description}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};