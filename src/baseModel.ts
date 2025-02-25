import { ChatOllama } from "@langchain/ollama";
import { OllamaEmbeddings } from "@langchain/ollama";
import { ChatOpenAI } from "@langchain/openai";
import { llmKey, llmBaseURL, llmModel } from "../.llm_key.json"; // 离线模型参数。这个文件中包含 api key 所以会添加到 .gitignore 中

export const offlineModel = new ChatOllama({
  model: "qwen2.5:14b", // Default value.
  verbose: true,
});

export const onlineModel = new ChatOpenAI({
  model: llmModel,
  configuration: {
    baseURL: llmBaseURL,
    apiKey: llmKey,
  },
  temperature: 0,
  verbose: true,
});

export const embeddings = new OllamaEmbeddings({
  model: "nomic-embed-text",
});
