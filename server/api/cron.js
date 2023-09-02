import util from "util";
import { exec } from "child_process"; // Import the promisified version of exec

async function run(command) {
  const { stdout, stderr } = await exec(command);
  console.log("stdout:", stdout);
  console.log("stderr:", stderr);
}

export default async function handler(req, res) {
  res.end("Hello Cron!");
  await run("npm run build"); // Make sure to await the run function since it's asynchronous
}
