import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { execSync } from "child_process";

export const shellExecuteTool = tool(
  (input: string) => {
    console.log(`正在执行 shell 命令：${input}`);
    const result = execSync(input, {
      shell: "powershell.exe",
    });
    return result.toString("utf-8");
  },
  {
    name: "shellExecute",
    description:
      "接收一个字符串，将这个字符串作为 shell 命令执行。执行动作由 nodejs child_process 的 execSync 完成，你可以使用这个工具执行任何 shell 命令,并通过返回值获取执行结果。注意: shell 执行环境为 windows powershell 环境，请使用 powershell 命令。",
    schema: z.string(),
    responseFormat: "content",
  }
);
