import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { BaseRetriever } from "@langchain/core/retrievers";
import { embeddings } from "./baseModel";
import fs from "fs";

let retriever: BaseRetriever;

const getWebDocuments = async () => {
  console.log("RAG: 正在获取 web 文档...");
  const urls = [
    "https://lilianweng.github.io/posts/2023-06-23-agent/",
    "https://lilianweng.github.io/posts/2023-03-15-prompt-engineering/",
    "https://lilianweng.github.io/posts/2023-10-25-adv-attack-llm/",
  ];

  const docs = await Promise.all(
    urls.map((url) => new CheerioWebBaseLoader(url).load())
  );
  const docsList = docs.flat();

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 50,
  });
  const docSplits = await textSplitter.splitDocuments(docsList);
  console.log("RAG: 获取 web 文档完成");
  return docSplits;
};

const getLocalDocuments = () => {
  const docs = fs.readFileSync("docs.txt", "utf-8");
  const docsList = docs.split("\n");
  return docsList;
};

export const initRAG = async () => {
  if (retriever) {
    return retriever;
  }

  const webDocs = await getWebDocuments();
  const localDocs = getLocalDocuments();

  // Add to vectorDB
  const vectorStore = await MemoryVectorStore.fromDocuments(
    [...webDocs],
    embeddings
  );

  retriever = vectorStore.asRetriever();

  return retriever;
};
