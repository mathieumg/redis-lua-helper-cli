import {
  dirname,
  relative as relativePath,
} from "path";
import redisLuaHelper from "redis-lua-helper";
import yargs from "yargs";

const argv = yargs
.usage("Usage: $0 <filename>")
.demand(1)
.argv;

const fileName = argv._[0];
const filePath = relativePath(process.cwd(), fileName);
const fileDirectory = dirname(filePath);

const options = {
  root: fileDirectory,
};

[
  "extension",
  "macro",
  "encoding",
].forEach(arg => {
  if (argv[arg] !== undefined) {
    options[arg] = argv[arg];
  }
})

const luaCommands = redisLuaHelper(options);

luaCommands._parse(
  fileName,
  (err, code) => {
    if (err) {
      return console.error(err);
    }

    console.log(code);
  },
);
