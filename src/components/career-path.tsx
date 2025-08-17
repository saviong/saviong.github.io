// src/components/career-path.tsx

"use client";

import { motion } from "framer-motion";
import { FlaskConical, TrendingUp, Cloud, ChevronRight, ChevronDown } from "lucide-react";
import React from "react";

// 1. Define the data for your career stages
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

// 2. Define the animation variants for Framer Motion
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3, // Each child will animate 0.3s after the previous one
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
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            // This handles the layout: vertical on mobile, horizontal on larger screens
            className="mt-6 flex flex-col items-center gap-4 md:flex-row md:gap-2"
        >
            {careerPathData.map((item, index) => (
                <React.Fragment key={item.title}>
                    {/* The career stage item */}
                    {/* CHANGE IS HERE: Added w-64 to give the text more width */}
                    <motion.div variants={itemVariants} className="flex w-64 flex-col items-center text-center p-4 rounded-lg">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-3">
                            {item.icon}
                        </div>
                        <h3 className="font-bold">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                    </motion.div>

                    {/* The connecting arrow (don't show after the last item) */}
                    {index < careerPathData.length - 1 && (
                        <motion.div variants={itemVariants}>
                            {/* Show a down arrow on mobile */}
                            <ChevronDown className="h-8 w-8 text-muted-foreground md:hidden" />
                            {/* Show a right arrow on desktop */}
                            <ChevronRight className="h-8 w-8 text-muted-foreground hidden md:block" />
                        </motion.div>
                    )}
                </React.Fragment>
            ))}
        </motion.div>
    );
};