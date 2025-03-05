import Markdown from "marked-react";

interface BoxAnalyzerProps {
  complexity: string;
  isLoading: boolean;
}

export default function BoxAnalyzer({complexity, isLoading}: BoxAnalyzerProps) {
  return (
    <div className="box-analyzer flex flex-1 flex-col gap-8 items-center border-1 border-(--border-color) p-15 rounded-md max-w-[730px] min-w-[364px] max-md:h-[50%] w-full h-full bg-(--bg-color) overflow-y-auto"> 
      <div className={`transition-opacity delay-150 duration-300 ease-in-out 
      ${isLoading ? "opacity-0" : ""}`}>
        <Markdown>{complexity}</Markdown>
      </div>
    </div>
  );
};
