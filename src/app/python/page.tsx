import BlurFade from "@/components/magicui/blur-fade";
import { PythonRunner } from "@/components/python-runner";
import Link from "next/link";

export default function PythonPage() {
    return (
        <main className="flex flex-col min-h-[100dvh] space-y-10 py-12 px-4 md:px-12 max-w-5xl mx-auto">
            <section id="header">
                <BlurFade delay={0.1}>
                    <Link href="/" className="text-sm text-muted-foreground hover:underline mb-4 block">
                        ← Back to Portfolio
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-4">
                        Python Playground
                    </h1>
                    <p className="text-muted-foreground max-w-[600px]">
                        This runs a full Python environment directly in your browser using WebAssembly.
                        Upload your script to see how it works!
                    </p>
                </BlurFade>
            </section>

            <section id="runner">
                <BlurFade delay={0.2}>
                    <PythonRunner />
                </BlurFade>
            </section>
        </main>
    );
}