"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Grid3X3, ArrowLeft } from "lucide-react";
import BlurFade from "./magicui/blur-fade";

interface TechItem {
    name: string;
    logo: string;
}

interface TechCategory {
    category: string;
    items: TechItem[];
}

const techCategories: TechCategory[] = [
    {
        category: "Cloud Platforms",
        items: [
            { name: "Azure", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
            { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg" },
        ],
    },
    {
        category: "Infrastructure as Code & Automation",
        items: [
            { name: "Terraform", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg" },
            { name: "Bicep", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bicep/bicep-original.svg" },
            { name: "CloudFormation", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aws/aws-original.svg" },
            { name: "GitHub Actions", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg" },
        ],
    },
    {
        category: "Containerization & Orchestration",
        items: [
            { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
            { name: "Kubernetes", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
        ]
    },
    {
        category: "Languages & Scripting",
        items: [
            { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
            { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
            { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
            { name: "Bash", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg" },
            { name: "PowerShell", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/powershell/powershell-original.svg" },
        ],
    },
];

// Flatten all items for the scrolling marquee
const allTechItems: TechItem[] = techCategories.flatMap(category => category.items || []);

const TechItemDisplay = ({ tech, showName = false }: { tech: TechItem; showName?: boolean }) => {
    return (
        <div className={`flex ${showName ? 'flex-col' : ''} items-center justify-center ${showName ? 'p-4' : 'mx-6'} group`}>
            <div className={`relative ${showName ? 'w-16 h-16' : 'w-12 h-12'} transition-all duration-300 group-hover:scale-110`}>
                <Image
                    src={tech.logo}
                    alt={`${tech.name} logo`}
                    fill
                    className="object-contain filter grayscale transition-all duration-300 group-hover:grayscale-0"
                    unoptimized
                />
            </div>
            {showName && (
                <span className="text-xs font-medium text-muted-foreground text-center mt-2 whitespace-nowrap">
                    {tech.name}
                </span>
            )}
        </div>
    );
};

export const TechStack = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [showAll, setShowAll] = useState(false);

    // Duplicate the tech stack for seamless infinite scroll
    const duplicatedTechStack = [...allTechItems, ...allTechItems];

    return (
        <section id="tech-stack" className="w-full py-12">
            <BlurFade delay={0.04 * 10}>
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                            Tech Stack
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                            Tools and Technologies
                        </h2>
                        <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            The primary tools and technologies I work with to build and automate infrastructure.
                        </p>
                    </div>
                </div>
            </BlurFade>

            <BlurFade delay={0.04 * 12}>
                {!showAll ? (
                    <>
                        <div className="relative w-full overflow-hidden py-8 mt-4">
                            <div className="absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-background to-transparent" />
                            <div className="absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-background to-transparent" />

                            <motion.div
                                className="flex items-center"
                                animate={{ x: [0, -50 + "%"] }}
                                transition={{
                                    x: {
                                        repeat: Infinity,
                                        repeatType: "loop",
                                        duration: 45,
                                        ease: "linear",
                                    },
                                }}
                            >
                                {duplicatedTechStack.map((tech, index) => (
                                    <TechItemDisplay key={`${tech.name}-${index}`} tech={tech} />
                                ))}
                            </motion.div>
                        </div>

                        <div className="flex justify-center">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setShowAll(true)}
                                className="h-10 w-10"
                                title="Show all technologies"
                            >
                                <Grid3X3 className="h-4 w-4" />
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="max-w-4xl mx-auto py-8 space-y-12">
                            {techCategories.map((category) => (
                                <div key={category.category} className="space-y-6">
                                    <h3 className="text-2xl font-bold text-center text-foreground">
                                        {category.category}
                                    </h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center">
                                        {category.items?.map((tech) => (
                                            <TechItemDisplay key={tech.name} tech={tech} showName={true} />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setShowAll(false)}
                                className="h-10 w-10"
                                title="Back to scrolling view"
                            >
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </div>
                    </>
                )}
            </BlurFade>
        </section>
    );
};