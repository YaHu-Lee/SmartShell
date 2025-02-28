import fs from "fs";
import path from "path";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { BM25Retriever } from "@langchain/community/retrievers/bm25";
import { embeddings } from "../baseModel";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document } from "@langchain/core/documents";

async function testVectorSimilarity() {
  const vectorStore = await FaissStore.load(path.resolve(__dirname, 'vector_store'), embeddings);
  const result = await vectorStore.similaritySearch("删除所有 txt 文件", 4);
  console.log(result);
}

async function testBM25() {
  const rawText = fs.readFileSync(path.resolve(__dirname, 'docs/powershell_example.txt'), 'utf-8');
  const splitedText = rawText.split("----------");
  const docs = splitedText.map((text: string) => new Document({ pageContent: text }));

  const retriever = BM25Retriever.fromDocuments(docs, { k: 4 });  
  const result = await retriever.invoke("删除当前文件夹下所有 txt 文件");
  console.log(result);
}

// testVectorSimilarity();
testBM25();
