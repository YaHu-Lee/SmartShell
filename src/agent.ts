import { offlineModel, onlineModel } from "./baseModel";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { shellExecuteTool, webSearchTool, userInputTool, writeTextToFileTool, deleteFileTool, knowledgeBaseTool } from "./tools";
import { MemorySaver } from "@langchain/langgraph";


export const reactAgent = createReactAgent({
  // llm: offlineModel,
  llm: onlineModel, 
  tools: [shellExecuteTool, webSearchTool, userInputTool, writeTextToFileTool, deleteFileTool, knowledgeBaseTool],
  checkpointer: new MemorySaver(),
});
