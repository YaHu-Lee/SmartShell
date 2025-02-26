import { tool } from "@langchain/core/tools";
import { SearchApi } from "@langchain/community/tools/searchapi";
import { z } from "zod";
import { execSync } from "child_process";
import { initRAG } from "./rag";
import { deleteFileToolPrompt, shellExecuteToolPrompt, userInputToolPrompt, writeTextToFileToolPrompt } from "./prompt";
import { readline } from "./utils";
import fs from "fs";

export const shellExecuteTool = tool(
  (input: string) => {
    console.log(`正在执行 shell 命令：${input}`);
    const result = execSync(input, {
      shell: "cmd.exe",
    });
    return result.toString("utf-8");
  },
  {
    name: "shellExecute",
    description: shellExecuteToolPrompt,
    schema: z.string(),
    responseFormat: "content",
  }
);

export const retrieveShellCommandTool = tool(
  async (input: string) => {
    const retriever = await initRAG();
    const result = await retriever.invoke(input);
    return result.map((doc) => doc.pageContent).join("\n");
  },
  {
    name: "retrieveShellCommand",
    description:
      "接收一个字符串，将这个字符串作为检索条件，检索数据库中的相关信息，并返回检索到的信息。当你遇到需要检索信息的问题时，请使用这个工具。",
    schema: z.string(),
    responseFormat: "content",
  }
);

export const webSearchTool = new SearchApi('o2PYhxduMXDzv4c7cfXGiwZv', {
  engine: 'google',
  maxResults: 3,
  verbose: true,
});


export const userInputTool = tool(
  async (question: string) => {
    return new Promise((resolve) => {
      readline.question(`${question}\n`, (answer: string) => {
        resolve(answer);
      });
    });
  },
  {
    name: "userInput",
    description: userInputToolPrompt,
    schema: z.string().describe('你向用户提出的问题'),
    responseFormat: "content",
  }
);

export const writeTextToFileTool = tool(
  ({filePath, text}: {filePath: string, text: string}) => {
    fs.writeFileSync(filePath, text, "utf-8");
    return `文件 ${filePath} 已写入文本 ${text}`;
  },
  {
    name: "writeTextToFile",
    description: writeTextToFileToolPrompt,
    schema: z.object({
      filePath: z.string().describe('你想要写入的文件路径'),
      text: z.string().describe('你想要写入的文本内容')
    }),
    responseFormat: "content",
  }
);

export const deleteFileTool = tool(
  (filePath: string) => {
    fs.unlinkSync(filePath);
    return `文件 ${filePath} 已删除`;
  },
  {
    name: "deleteFile",
    description: deleteFileToolPrompt,
    schema: z.string(),
    responseFormat: "content",
  }
)