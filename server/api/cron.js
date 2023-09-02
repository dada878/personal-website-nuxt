import util from "util";
import { exec } from "child_process";
import { createResponse } from "@vercel/node";

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
  try {
    const result = await run("npm run build");
    const response = createResponse(req, res);
    
    response.status(200).send(JSON.stringify(result));
  } catch (error) {
    console.error("Error:", error);
    const response = createResponse(req, res);
    
    response.status(500).send(JSON.stringify({ error: "Internal Server Error" }));
  }
};
