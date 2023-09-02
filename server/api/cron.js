import util from "util";
import { exec } from "child_process";

const execPromise = util.promisify(exec);

async function run(command) {
  try {
    const { stdout, stderr } = await execPromise(command);
    console.log("stdout:", stdout);
    console.log("stderr:", stderr);
    return { stdout, stderr };
  } catch (error) {
    console.error("Error:", error);
    return { error: error.message };
  }
}

export default async (req, res) => {
  await run("python3 ./generator.py false");
};
