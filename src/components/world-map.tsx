// src/components/world-map.tsx

"use client";

import { useState, useEffect } from "react";
import BlurFade from "./magicui/blur-fade";
import { SectionHeading } from "./section-heading";
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";

// This is the path to the file you downloaded in Step 2
const geoUrl = "/world-countries.json";

const countryData: { [key: string]: { name: string; category: string } } = {
    // Asia
    "JPN": { name: "Japan", category: "Asia" },
    "KOR": { name: "South Korea", category: "Asia" },
    "SGP": { name: "Singapore", category: "Asia" },
    "THA": { name: "Thailand", category: "Asia" },
    "MYS": { name: "Malaysia", category: "Asia" },
    "TWN": { name: "Taiwan", category: "Asia" },
    "HKG": { name: "Hong Kong", category: "Asia" },
    "MAC": { name: "Macau", category: "Asia" },
    "CHN": { name: "China", category: "Asia" },

    // Europe
    "ESP": { name: "Spain", category: "Europe" },
    "PRT": { name: "Portugal", category: "Europe" },
    "CZE": { name: "Czech Republic", category: "Europe" },
    "VAT": { name: "Vatican City", category: "Europe" },
    "ITA": { name: "Italy", category: "Europe" },
    "FRA": { name: "France", category: "Europe" },
    "BEL": { name: "Belgium", category: "Europe" },
    "NLD": { name: "Netherlands", category: "Europe" },
    "AUT": { name: "Austria", category: "Europe" },
    "DEU": { name: "Germany", category: "Europe" },
    "CHE": { name: "Switzerland", category: "Europe" },
    "DNK": { name: "Denmark", category: "Europe" },
    "SWE": { name: "Sweden", category: "Europe" },
    "NOR": { name: "Norway", category: "Europe" },
    "GBR": { name: "United Kingdom", category: "Europe" },

    // Middle East
    "ARE": { name: "United Arab Emirates", category: "Middle East" },
};

const visitedSet = new Set(Object.keys(countryData));

// The world GeoJSON has no polygon for these, so highlighting their code alone
// would do nothing. They are city-states and territories that would be a pixel
// wide at world scale anyway, so mark them with a point instead.
const POINT_LOCATIONS: { code: string; coordinates: [number, number] }[] = [
    { code: "HKG", coordinates: [114.17, 22.32] },
    { code: "MAC", coordinates: [113.54, 22.19] },
    { code: "SGP", coordinates: [103.82, 1.35] },
    { code: "VAT", coordinates: [12.45, 41.9] },
];

const countriesByCategory = Object.values(countryData).reduce<Record<string, string[]>>(
    (categories, country) => {
        (categories[country.category] ??= []).push(country.name);
        return categories;
    },
    {},
);

// Alphabetical within each region, and the regions themselves in order too.
const orderedCategories = Object.entries(countriesByCategory)
    .map(([category, countries]) => [category, [...countries].sort((a, b) => a.localeCompare(b))] as const)
    .sort(([a], [b]) => a.localeCompare(b));


export const WorldMap = () => {
    const [isClient, setIsClient] = useState(false);
    const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

    useEffect(() => {
        setIsClient(true);
    }, []);

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
                <SectionHeading
                    eyebrow="My Travels"
                    title="Countries I've Visited"
                    description="An interactive map of my journeys around the globe. Hover over a country to see its name."
                />
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
                                    {POINT_LOCATIONS.map(({ code, coordinates }) => (
                                        <Marker
                                            key={code}
                                            coordinates={coordinates}
                                            onMouseEnter={() => setHoveredCountry(countryData[code].name)}
                                            onMouseLeave={() => setHoveredCountry(null)}
                                        >
                                            <circle
                                                r={2.5}
                                                fill="hsl(var(--primary))"
                                                stroke="hsl(var(--background))"
                                                strokeWidth={0.75}
                                                style={{ outline: "none" }}
                                            />
                                        </Marker>
                                    ))}
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
                                {orderedCategories.map(([category, countries]) => (
                                    <div key={category}>
                                        <p className="text-sm font-semibold text-muted-foreground">{category}</p>
                                        <p className="text-sm text-foreground">{countries.join(", ")}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </BlurFade>
        </section>
    );
};
