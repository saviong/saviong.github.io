// src/components/world-map.tsx

"use client";

import { useState, useEffect, useMemo } from "react";
import BlurFade from "./magicui/blur-fade";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";

// This is the path to the file you downloaded in Step 2
const geoUrl = "/world-countries.json";

// =================================================================================
// IMPORTANT: UPDATE THIS SECTION WITH THE COUNTRIES YOU HAVE VISITED
// Use 3-letter ISO 3166-1 alpha-3 codes. You can find them online.
// =================================================================================
const visitedCountries = [
    "GBR", // United Kingdom
    "DEU", // Germany
    "HKG", // Hong Kong
    // Add more country codes here
];

const countryData: { [key: string]: { name: string; category: string } } = {
    "GBR": { name: "United Kingdom", category: "Europe" },
    "DEU": { name: "Germany", category: "Europe" },
    "HKG": { name: "Hong Kong", category: "Asia" },
    // Make sure to add corresponding data for each country you list above
};
// =================================================================================


export const WorldMap = () => {
    const [isClient, setIsClient] = useState(false);
    const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const visitedSet = useMemo(() => new Set(visitedCountries), [visitedCountries]);

    if (!isClient) {
        return (
            <div className="flex justify-center">
                <div className="bg-muted/30 border rounded-lg p-6 w-full max-w-4xl">
                    <div className="h-96 flex items-center justify-center text-muted-foreground">
                        Loading World Map...
                    </div>
                </div>
            </div>
        );
    }

    return (
        <section id="map" className="w-full py-12">
            <BlurFade delay={0.04 * 14}>
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                            My Travels
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                            Countries I&apos;ve Visited
                        </h2>
                        <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            An interactive map of my journeys around the globe. Hover over a country to see its name.
                        </p>
                    </div>
                </div>
            </BlurFade>
            <BlurFade delay={0.04 * 16}>
                <div className="flex justify-center mt-8">
                    <div className="bg-card border rounded-lg p-4 sm:p-6 w-full max-w-5xl">
                        <div className="relative w-full">
                            <ComposableMap
                                projection="geoMercator"
                                projectionConfig={{ rotate: [-10, 0, 0], scale: 120 }}
                                style={{ width: "100%", height: "auto" }}
                            >
                                <ZoomableGroup center={[0, 20]} zoom={1}>
                                    <Geographies geography={geoUrl}>
                                        {({ geographies }) =>
                                            geographies.map((geo) => {
                                                const isVisited = visitedSet.has(geo.id);
                                                return (
                                                    <Geography
                                                        key={geo.rsmKey}
                                                        geography={geo}
                                                        onMouseEnter={() => setHoveredCountry(geo.properties.name)}
                                                        onMouseLeave={() => setHoveredCountry(null)}
                                                        style={{
                                                            default: {
                                                                fill: isVisited ? "hsl(var(--primary))" : "hsl(var(--muted))",
                                                                stroke: "hsl(var(--background))",
                                                                strokeWidth: 0.75,
                                                                outline: "none",
                                                                transition: "fill 0.3s",
                                                            },
                                                            hover: {
                                                                fill: isVisited ? "hsl(var(--primary), 0.8)" : "hsl(var(--muted-foreground))",
                                                                outline: "none",
                                                            },
                                                            pressed: {
                                                                fill: "hsl(var(--primary))",
                                                                outline: "none",
                                                            },
                                                        }}
                                                    />
                                                );
                                            })
                                        }
                                    </Geographies>
                                </ZoomableGroup>
                            </ComposableMap>
                            {hoveredCountry && (
                                <div className="absolute left-1/2 top-2 transform -translate-x-1/2 bg-background/80 backdrop-blur-sm text-foreground px-3 py-1 rounded-lg shadow-lg text-sm pointer-events-none z-10">
                                    {hoveredCountry}
                                </div>
                            )}
                        </div>
                        <div className="w-full mt-4">
                            <div className="text-center space-y-3">
                                {(() => {
                                    const categories: { [key: string]: string[] } = {};
                                    visitedCountries.forEach(countryCode => {
                                        const data = countryData[countryCode];
                                        if (data) {
                                            const category = data.category || "Other";
                                            if (!categories[category]) categories[category] = [];
                                            categories[category].push(data.name);
                                        }
                                    });
                                    return Object.entries(categories).map(([category, countries]) => (
                                        <div key={category}>
                                            <p className="text-sm font-semibold text-muted-foreground">{category}</p>
                                            <p className="text-sm text-foreground">{countries.join(", ")}</p>
                                        </div>
                                    ));
                                })()}
                            </div>
                        </div>
                    </div>
                </div>
            </BlurFade>
        </section>
    );
};