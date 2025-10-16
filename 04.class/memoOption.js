import yargs from "yargs";
import { hideBin } from "yargs/helpers";

export default class MemoOption {
  constructor() {
    const argv = yargs(hideBin(process.argv))
      .option("l", { type: "boolean" })
      .option("r", { type: "boolean" })
      .option("d", { type: "boolean" }).argv;

    if (argv.l) this.action = "list";
    else if (argv.r) this.action = "read";
    else if (argv.d) this.action = "delete";
    else this.action = "create";
  }
}
