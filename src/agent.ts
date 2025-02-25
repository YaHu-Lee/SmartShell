import { offlineModel, onlineModel } from "./baseModel";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { shellExecuteTool, webSearchTool, retrieveTool } from "./tools";
import { MemorySaver } from "@langchain/langgraph";


export const reactAgent = createReactAgent({
  llm: offlineModel,
  tools: [shellExecuteTool, webSearchTool],
  checkpointer: new MemorySaver(),
});
