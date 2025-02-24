import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { reactAgent } from "./agent";

// 将代码包装在异步函数中
async function main() {
  const thread_id = Date.now().toString();
  await reactAgent.invoke({
    messages: [
      new SystemMessage("1. 分析用户诉求，拆解成若干任务 2. 针对每个子任务，一次只调用一个工具。对于每个工具，都要先分析用户诉求，再决定是否调用工具。3. 总是调用最合适的那个工具"),
      new SystemMessage("你只做任务拆解和工具调用，不要输出任何解释，不要进行无关的思考。复杂问题可能需要经过多轮 tool calling，think step by step"),
      new HumanMessage("1. 使用英文搜索中国最火的 10 个女演员 2. 把他们的英文版信息整理后保存在当前目录下的 actress.txt 文件中"),
    ],
  }, {
    configurable: {
      thread_id
    }
  });

}

main();
