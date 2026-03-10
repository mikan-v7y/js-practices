import inquirer from "inquirer";

export default class MemoDisplay {
  constructor(storage) {
    this.storage = storage;
  }

  async run() {
    const memos = await this.storage.getAll();
    if (memos.length === 0) {
      console.log("メモは1つもありません。");
      return;
    }

    const choices = memos.map((memo) => ({
      name: memo.content.split("\n")[0],
      value: memo.id,
    }));

    let answer;
    try {
      answer = await inquirer.prompt([
        {
          type: "rawlist",
          name: "id",
          message: "Choose a memo you want to see:",
          choices,
        },
      ]);
    } catch (err) {
      if (err?.name === "ExitPromptError") {
        console.log("\n正常にキャンセルしました");
        process.exit(0);
      }
      console.error(err);
      process.exit(1);
    }

    const memo = await this.storage.getById(answer.id);
    console.log();
    console.log(memo.content);
  }
}
