const exec = util.promisify(require("child_process").exec);
const util = require("util");

async function run(command) {
  const { stdout, stderr } = await exec(command);
  console.log("stdout:", stdout);
  console.log("stderr:", stderr);
}

export default function handler(req, res) {
  res.end("Hello Cron!");
  run("npm run build");
}
