import inquirer from "inquirer";

export default class MemoDeletion {
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
        type: "rawlist",
        name: "id",
        message: "Choose a memo you want to delete:",
        choices,
      },
    ]);

    await this.storage.deleteById(answer.id);
    console.log("メモを削除しました。");
  }
}
