"use client"

import CodeMirror from "@uiw/react-codemirror";
import { tokyoNight } from "@uiw/codemirror-themes-all";
import { javascript } from "@codemirror/lang-javascript";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/languages";

import Image from "next/image";
import spinnerThird from "@/public/spinner-third.svg";

interface CodeEditorProps {
  setComplexity: (complexity: string) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export default function CodeEditor({ setComplexity, isLoading, setIsLoading }: CodeEditorProps) {
  const [code, setCode] = useState("");
  const [buttonText, setButtonText] = useState("Analyze");

  const { language } = useLanguage();

  useEffect(() => {
    setButtonText(language === "en" ? "Analyze" : "Analisar");
  }, [language]);

  async function analyzeCode(code: string) {
    setIsLoading(true);

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const result = await response.json();
      setComplexity(result.complexity);
    } catch (error) {
      console.error(error);
      setComplexity(`${language === "en" ? "Error analyzing: " : "Erro ao analisar: "}${(error as Error).message}`);
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <div className="code-editor flex flex-1 flex-col w-full h-full min-w-[364px] max-md:h-[50%] rounded-md overflow-hidden">
      <CodeMirror className="h-full overflow-hidden"
        value={code}
        height="100%"
        theme={ tokyoNight }
        extensions={ [javascript()] }
        onChange={ (value) => setCode(value) }
      />
      <div className="w-full p-2 px-5 bg-gray-700">
        <button onClick={() => analyzeCode(code)} className={`flex gap-1 bg-white text-black cursor-pointer hover:bg-gray-200 px-2 py-1 rounded-md 
        ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"}`}> 
          { buttonText }
          
          { isLoading ? 
            <Image className="animate-spin opacity-30" src={spinnerThird} width={15} height={15} alt="Spinner Third"/> 
            : ""
          }
        </button>
      </div> 
    </div>
  );
};
