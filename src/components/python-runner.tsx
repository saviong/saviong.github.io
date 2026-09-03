"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Loader2, Play, Upload, RotateCcw, AlertCircle, Square } from 'lucide-react';

const WORKER_SRC = "/pyodide-worker.js";

export function PythonRunner() {
    const [code, setCode] = useState<string>("# Upload a .py file or type code here...\nprint('Hello from Python!')");
    const [output, setOutput] = useState<string>("");
    const [isPyodideReady, setIsPyodideReady] = useState<boolean>(false);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const workerRef = useRef<Worker | null>(null);

    // Starting a worker is also how we stop a runaway script: terminate the old
    // one and boot a clean interpreter in its place.
    const startWorker = useCallback(() => {
        workerRef.current?.terminate();
        setIsPyodideReady(false);
        setLoadError(null);

        const worker = new Worker(WORKER_SRC);

        worker.onmessage = (event: MessageEvent) => {
            const message = event.data;
            switch (message.type) {
                case "ready":
                    setIsPyodideReady(true);
                    break;
                case "stdout":
                case "stderr":
                    setOutput((prev) => prev + message.text + "\n");
                    break;
                case "done":
                    setIsRunning(false);
                    break;
                case "error":
                    setOutput((prev) => prev + `\nTraceback:\n${message.message}`);
                    setIsRunning(false);
                    break;
                case "loaderror":
                    setLoadError(message.message);
                    setIsRunning(false);
                    break;
            }
        };

        worker.onerror = () => {
            setLoadError("Could not start the Python engine.");
            setIsRunning(false);
        };

        worker.postMessage({ type: "init" });
        workerRef.current = worker;
    }, []);

    useEffect(() => {
        startWorker();
        return () => {
            workerRef.current?.terminate();
            workerRef.current = null;
        };
    }, [startWorker]);

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

    const runCode = () => {
        if (!workerRef.current || !isPyodideReady) return;
        setOutput("");
        setIsRunning(true);
        workerRef.current.postMessage({ type: "run", code });
    };

    const stopCode = () => {
        setOutput((prev) => prev + "\n^ Stopped. Restarting Python engine...");
        setIsRunning(false);
        startWorker();
    };

    return (
        <div className="w-full max-w-4xl mx-auto space-y-4">
            {/* Header / Toolbar */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-4 border rounded-lg bg-background shadow-sm">
                <div className="flex items-center gap-2">
                    <label className="flex items-center gap-2 cursor-pointer bg-secondary text-secondary-foreground hover:bg-secondary/80 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                        <Upload className="w-4 h-4" />
                        Upload .py File
                        <input type="file" accept=".py" onChange={handleFileUpload} className="hidden" />
                    </label>
                    {loadError ? (
                        <span className="flex items-center gap-1 text-xs text-destructive">
                            <AlertCircle className="w-3 h-3" />
                            {loadError}
                        </span>
                    ) : (
                        !isPyodideReady && <span className="text-xs text-muted-foreground animate-pulse">Loading Python Engine...</span>
                    )}
                </div>

                {isRunning ? (
                    <button
                        onClick={stopCode}
                        className="flex items-center gap-2 bg-destructive text-destructive-foreground hover:bg-destructive/90 px-6 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                        <Square className="w-4 h-4" />
                        Stop
                    </button>
                ) : (
                    <button
                        onClick={runCode}
                        disabled={!isPyodideReady}
                        className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
                    >
                        {isPyodideReady ? <Play className="w-4 h-4" /> : <Loader2 className="w-4 h-4 animate-spin" />}
                        Run Code
                    </button>
                )}
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
