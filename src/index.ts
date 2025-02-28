import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { reactAgent } from "./agent";
import { systemPromptTemplate } from "./prompt";
import initRAG from "./rag";

async function main() {  
  let humanMessage =
    "用户还未输入任何内容，请你调用 userInput 工具询问用户有何需求";
  let systemPrompt = await systemPromptTemplate.invoke({
    knowledge: "",
  });
  const commandString = process.argv.slice(2).join(" ").trim();
  if (commandString) {
    humanMessage = commandString;
    const retriever = await initRAG();
    const result = await retriever.invoke(humanMessage);
    systemPrompt = await systemPromptTemplate.invoke({
      knowledge: result.map((doc) => doc.pageContent).join("\n"),
    });
  }
  const thread_id = Date.now().toString();
  const result = await reactAgent.invoke(
    {
      messages: [
        new SystemMessage(systemPrompt.toString()),
        new HumanMessage(humanMessage),
      ],
    },
    {
      configurable: {
        thread_id,
      },
    }
  );
  console.log(result.messages[result.messages.length - 1].content);
}
main().then(() => process.exit(0));
