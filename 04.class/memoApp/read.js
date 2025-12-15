import inquirer from "inquirer";

export default class MemoList {
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

    const answer = await inquirer.prompt([
      {
        type: "list",
        name: "id",
        message: "Choose a memo you want to see:",
        choices,
      },
    ]);

    const memo = await this.storage.getById(answer.id);
    console.log("\n" + memo.content);
  }
}
