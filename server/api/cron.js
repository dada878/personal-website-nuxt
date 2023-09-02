import { exec } from "child_process"; // Import the promisified version of exec

async function run(command) {
  const { stdout, stderr } = await exec(command);
  console.log("stdout:", stdout);
  console.log("stderr:", stderr);
}

async function myHandler(event, context) {
  const response = {
    statusCode: 200,
    body: "Hello Cron!",
  };

  await run("npm run build");

  return response;
}

export const handler = fromNodeMiddleware(myHandler);