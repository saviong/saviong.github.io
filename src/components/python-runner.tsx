"use client";

import React, { useState, useEffect, useRef } from 'react';
import Script from 'next/script';
import { Loader2, Play, Upload, RotateCcw } from 'lucide-react';

// Define the window interface for Pyodide
declare global {
    interface Window {
        loadPyodide: any;
    }
}

export function PythonRunner() {
    const [code, setCode] = useState<string>("# Upload a .py file or type code here...\nprint('Hello from Python!')");
    const [output, setOutput] = useState<string>("");
    const [isPyodideReady, setIsPyodideReady] = useState<boolean>(false);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const pyodideRef = useRef<any>(null);

    // Initialize Pyodide once the script is loaded
    const initPyodide = async () => {
        if (window.loadPyodide && !pyodideRef.current) {
            try {
                pyodideRef.current = await window.loadPyodide();
                setIsPyodideReady(true);
            } catch (err) {
                console.error("Error loading Pyodide:", err);
            }
        }
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target?.result;
                if (typeof text === 'string') {
                    setCode(text);
                    setOutput(""); // Clear old output on new file load
                }
            };
            reader.readAsText(file);
        }
    };

    const runCode = async () => {
        if (!pyodideRef.current) return;
        setIsRunning(true);
        setOutput(""); // Clear previous output

        try {
            // Redirect Python's stdout to our state
            pyodideRef.current.setStdout({
                batched: (msg: string) => setOutput((prev) => prev + msg + "\n")
            });

            await pyodideRef.current.runPythonAsync(code);
        } catch (error: any) {
            setOutput((prev) => prev + `\nTraceback:\n${error.message}`);
        } finally {
            setIsRunning(false);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto space-y-4">
            {/* Load Pyodide from CDN */}
            <Script
                src="https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js"
                onLoad={initPyodide}
                strategy="afterInteractive"
            />

            {/* Header / Toolbar */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-4 border rounded-lg bg-background shadow-sm">
                <div className="flex items-center gap-2">
                    <label className="flex items-center gap-2 cursor-pointer bg-secondary text-secondary-foreground hover:bg-secondary/80 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                        <Upload className="w-4 h-4" />
                        Upload .py File
                        <input type="file" accept=".py" onChange={handleFileUpload} className="hidden" />
                    </label>
                    {!isPyodideReady && <span className="text-xs text-muted-foreground animate-pulse">Loading Python Engine...</span>}
                </div>

                <button
                    onClick={runCode}
                    disabled={!isPyodideReady || isRunning}
                    className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
                >
                    {isRunning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                    {isRunning ? "Running..." : "Run Code"}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[500px]">
                {/* Code Editor Area */}
                <div className="flex flex-col border rounded-lg overflow-hidden bg-muted/30">
                    <div className="bg-muted px-4 py-2 border-b text-xs font-mono text-muted-foreground">Input: main.py</div>
                    <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="flex-1 w-full p-4 font-mono text-sm bg-transparent resize-none focus:outline-none"
                        spellCheck={false}
                    />
                </div>

                {/* Output Area */}
                <div className="flex flex-col border rounded-lg overflow-hidden bg-black text-green-400">
                    <div className="bg-muted/10 px-4 py-2 border-b border-white/10 text-xs font-mono text-muted-foreground flex justify-between">
                        <span>Output: stdout</span>
                        <button onClick={() => setOutput("")} title="Clear Console">
                            <RotateCcw className="w-3 h-3 hover:text-white transition-colors" />
                        </button>
                    </div>
                    <pre className="flex-1 w-full p-4 font-mono text-sm overflow-auto whitespace-pre-wrap">
                        {output || <span className="text-gray-600 italic"># Ready to execute...</span>}
                    </pre>
                </div>
            </div>
        </div>
    );
}