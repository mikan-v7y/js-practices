import readline from "readline";

export default class Create {
  constructor(storage) {
    this.storage = storage;
  }

  async run() {
    console.log("メモを入力してください（Ctrl+Dで終了）。");
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    let content = "";
    for await (const line of rl) {
      content += line + "\n";
    }

    if (content.trim()) {
      await this.storage.insert(content.trim());
      console.log("メモを保存しました。");
    } else {
      console.log("空のメモは保存できません。");
    }
  }
}
