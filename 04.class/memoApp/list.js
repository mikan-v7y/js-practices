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
    memos.forEach((memo) => {
      console.log(memo.content.split("\n")[0]);
    });
  }
}
