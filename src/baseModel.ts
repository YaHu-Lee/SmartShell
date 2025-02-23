import { ChatOllama } from "@langchain/ollama";
import { OllamaEmbeddings } from "@langchain/ollama";

export const model = new ChatOllama({
    model: "mistral", // Default value.
  });
  
  export const embeddings = new OllamaEmbeddings({
    model: "nomic-embed-text",
  });
  