#!/usr/bin/env node
import MemoCreation from "./memoApp/create.js";
import Delete from "./memoApp/delete.js";
import List from "./memoApp/list.js";
import Read from "./memoApp/read.js";
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
      await new List(storage).run();
      break;
    case "read":
      await new Read(storage).run();
      break;
    case "delete":
      await new Delete(storage).run();
      break;
  }
}

main();
