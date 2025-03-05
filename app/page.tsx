"use client"

import CodeEditor from "@/components/CodeEditor";
import BoxAnalyzer from "@/components/BoxAnalyzer";

import { useState } from "react"

export default function Home() {
  const [complexity, setComplexity] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
     <div className="font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-wrap gap-2 w-full h-(--editor-h) p-4">
        <CodeEditor setComplexity={setComplexity} isLoading={isLoading} setIsLoading={setIsLoading}/> 
        <BoxAnalyzer complexity={complexity} isLoading={isLoading}/>
      </main> 
    </div> 
  );
}
