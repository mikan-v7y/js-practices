#!/usr/bin/env node
import MemoCreation from "./memoApp/memoCreation.js";
import MemoDeletion from "./memoApp/memoDeletion.js";
import MemoList from "./memoApp/memoList.js";
import MemoDisplay from "./memoApp/memoDisplay.js";
import MemoOption from "./memoOption.js";
import MemoStorage from "./memoStorage.js";

async function main() {
  const option = new MemoOption();
  const storage = new MemoStorage();
  await storage.connect();

  switch (option.action) {
    case "create":
      await new MemoCreation(storage).run();
      break;
    case "list":
      await new MemoList(storage).run();
      break;
    case "read":
      await new MemoDisplay(storage).run();
      break;
    case "delete":
      await new MemoDeletion(storage).run();
      break;
  }
}

main();
