import { reactAgent } from "./agent";

// 将代码包装在异步函数中
async function main() {
  const result = await reactAgent.invoke({
    messages: [
      {
        role: "user",
        content: "返回当前文件夹下的所有文件名",
      },
    ],
  }, {
    configurable: {
      thread_id: Date.now().toString()
    }
  });
  console.log(result);
}

main();
