import { NextResponse } from "next/server";
import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";

type ComplexityResponse = {
  complexity: string;
};

type RequestBody = {
  code: string;
  language: "en" | "pt";
};

export async function POST(req: Request): Promise<NextResponse<ComplexityResponse>> {
  const { code, language }: RequestBody = await req.json();

  if (!code && code.trim() === "") {
    const errorMessage = language === "en"
    ? "You didn't provide any code for me to analyze. Please provide the code so I can do the complexity analysis."
    : "Você não forneceu nenhum código para eu analisar. Por favor, forneça o código para que eu possa fazer a análise da complexidade.";
  
    return NextResponse.json({ complexity: errorMessage });
  }

  const genAI: GoogleGenerativeAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY || "YOUR_API_KEY"
  );

  const model: GenerativeModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = language == "pt" ? ` 
  Analise a complexidade assintótica deste código em notação Big-O. Forneça uma breve descrição do que o código faz, seguida pela análise de Complexidade de Tempo (pior caso, melhor caso e caso médio), Complexidade de Espaço e Estruturas de Dados Utilizadas. Escreva usando sintaxe markdown para headers, listas, código, etc. Use este formato exato:

    "Este código [descrição breve e objetiva do que o código faz].

    # Complexidade de Tempo:
    - **Pior Caso**: O(...)
    - **Melhor Caso**: O(...)
    - **Caso Médio**: O(...)

    # Complexidade de Espaço:
    O(...) [explicação breve sobre espaço adicional ou de saída, incluindo variáveis ou estruturas criadas]. 

    Código: ${code}   
  ` : `
    Analyze the asymptotic complexity of this code in Big-O notation. Provide a brief description of what the code does, followed by the Time Complexity analysis (worst case, best case, and average case), Space Complexity, and Data Structures Used. Write in English using markdown syntax for headers, lists, code, etc. Use this exact format:

    "This code [brief and objective description of what the code does].

    # Time Complexity:
    - **Worst Case**: O(...)
    - **Best Case**: O(...)
    - **Average Case**: O(...)

    # Space Complexity:
    O(...) [brief explanation about additional or output space, including variables or structures created].
 
    Code: ${code}
  `;

  try {
    const result = await model.generateContent(prompt);
    const complexity: string = result.response.text().trim();

    return NextResponse.json({ complexity }, { status: 200 });
  } catch (error) {
    console.error("Erro ao analisar o código:", error);
    return NextResponse.json(
      { complexity: `Erro: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
