import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { reactAgent } from "./agent";
import { systemPrompt } from "./prompt";

async function main() {
  let humanMessage =
    "用户还未输入任何内容，请你调用 userInput 工具询问用户有何需求";
  const commandString = process.argv.slice(2).join(" ").trim();
  if (commandString) {
    humanMessage = commandString;
  }
  const thread_id = Date.now().toString();
  const result = await reactAgent.invoke(
    {
      messages: [
        new SystemMessage(systemPrompt),
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
