import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { reactAgent } from "./agent";
import { systemPrompt } from "./prompt";

// 将代码包装在异步函数中
async function main() {
  const thread_id = Date.now().toString();
  await reactAgent.invoke({
    messages: [
      new SystemMessage(`${systemPrompt}`),
      new HumanMessage("删除当前文件夹下所有的 txt 文件"),
    ],
  }, {
    configurable: {
      thread_id
    }
  });

}

main();
