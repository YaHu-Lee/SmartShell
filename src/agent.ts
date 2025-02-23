import { model } from "./baseModel";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { shellExecuteTool } from "./tools";
import { MemorySaver } from "@langchain/langgraph";


export const reactAgent = createReactAgent({
  llm: model,
  tools: [shellExecuteTool],
  checkpointer: new MemorySaver()
});
