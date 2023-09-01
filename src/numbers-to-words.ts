#!/usr/bin/env node
import yargs from "yargs/yargs";
import { run } from "./main";

const getArgumentsAndRun = async () => {
  const argv = await yargs(process.argv.slice(2)).demandCommand(1).argv;
  const numToConvert = argv._[0] as number;
  try {
    run(numToConvert);
  } catch (error) {
    process.exit(1);
  }
};

getArgumentsAndRun();
