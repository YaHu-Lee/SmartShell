import { ChatOllama } from "@langchain/ollama";
import { OllamaEmbeddings } from "@langchain/ollama";

export const model = new ChatOllama({
  model: "llama3-groq-tool-use:8b", // Default value.
  temperature: 0,
  verbose: true,
});

export const embeddings = new OllamaEmbeddings({
  model: "nomic-embed-text",
});
