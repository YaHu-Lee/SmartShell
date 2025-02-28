import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { embeddings } from "./baseModel";
import path from "path";

let vectorStore: FaissStore;
async function initRAG() {
  if (!vectorStore) {
    vectorStore = await FaissStore.load(path.resolve(__dirname, 'rag/vector_store'), embeddings);
  }
  return vectorStore.asRetriever();
}

export default initRAG;

