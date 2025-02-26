import { offlineModel, onlineModel } from "./baseModel";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { shellExecuteTool, webSearchTool, retrieveShellCommandTool, userInputTool, writeTextToFileTool, deleteFileTool } from "./tools";
import { MemorySaver } from "@langchain/langgraph";


export const reactAgent = createReactAgent({
  // llm: offlineModel,
  llm: onlineModel,
  tools: [shellExecuteTool, webSearchTool, userInputTool, writeTextToFileTool, deleteFileTool],
  checkpointer: new MemorySaver(),
});
