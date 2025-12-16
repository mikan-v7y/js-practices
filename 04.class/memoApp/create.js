import readline from "readline";

export default class MemoCreation {
  constructor(storage) {
    this.storage = storage;
  }

  async run() {
    if (process.stdin.isTTY) {
      console.log("メモを入力してください（Ctrl+Dで終了）。");
    }

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdin.isTTY ? process.stdout : undefined,
    });

    let content = "";
    let interrupted = false;

    rl.on("SIGINT", () => {
      interrupted = true;
      rl.close();
    });

    for await (const line of rl) {
      content += `${line}\n`;
    }

    if (interrupted) {
      console.log("入力が中断されたため、保存されませんでした。");
      return;
    }

    const trimmedContent = content.trim();
    const hasContent = trimmedContent.length > 0;
    if (hasContent) {
      await this.storage.save(trimmedContent);
      console.log("メモを保存しました。");
    } else {
      console.log("空のメモは保存できません。");
    }
  }
}
