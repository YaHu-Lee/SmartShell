import { tool } from "@langchain/core/tools";
import { SearchApi } from "@langchain/community/tools/searchapi";
import { z } from "zod";
import { execSync } from "child_process";
import { initRAG } from "./rag";
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
    description:
      "你可以使用这个工具执行 shell 命令, 并通过返回值获取执行结果。只有需要直接操作计算机时，才使用这个工具。如文件增删改查、读取系统信息等。注意: shell 执行环境为 windows cmd 环境。",
    schema: z.string(),
    responseFormat: "content",
  }
);

export const retrieveTool = tool(
  async (input: string) => {
    console.log(`正在执行 retrieve 命令：${input}`);
    const retriever = await initRAG();
    const result = await retriever.invoke(input);
    return result.map((doc) => doc.pageContent).join("\n");
  },
  {
    name: "retrieve",
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
