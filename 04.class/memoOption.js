import yargs from "yargs";
import { hideBin } from "yargs/helpers";

export default class MemoOption {
  #action;

  constructor(argv = process.argv) {
    const parsed = yargs(hideBin(argv))
      .option("l", { type: "boolean" })
      .option("r", { type: "boolean" })
      .option("d", { type: "boolean" }).argv;

    if (parsed.l) this.#action = "list";
    else if (parsed.r) this.#action = "read";
    else if (parsed.d) this.#action = "delete";
    else this.#action = "create";
  }

  get action() {
    return this.#action;
  }
}
