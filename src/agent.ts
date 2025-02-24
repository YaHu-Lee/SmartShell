import { model } from "./baseModel";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { shellExecuteTool, webSearchTool, retrieveTool } from "./tools";
import { MemorySaver } from "@langchain/langgraph";


export const reactAgent = createReactAgent({
  llm: model,
  tools: [shellExecuteTool, webSearchTool, retrieveTool],
  checkpointer: new MemorySaver(),
});
