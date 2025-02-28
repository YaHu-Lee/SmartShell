import path from "path";
import fs from 'fs';
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { CharacterTextSplitter, RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { embeddings } from "../baseModel";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { Document } from "langchain/document";
import { UnstructuredLoader } from "@langchain/community/document_loaders/fs/unstructured";
import { JSONLoader } from "langchain/document_loaders/fs/json";
export async function initStore() {
  const vectorStore = new FaissStore(embeddings, {});
  const rawText = fs.readFileSync(path.resolve(__dirname, 'docs/powershell_example.txt'), 'utf-8');
  const splitedText = rawText.split("----------");
  const docs = splitedText.map(text => new Document({ pageContent: text }));
  console.log('文档数量: ', docs.length);
  console.log('文档内容: ', docs[0].pageContent);
  
  await vectorStore.addDocuments(docs);
  await vectorStore.save(path.resolve(__dirname, 'vector_store'));
}

initStore();
