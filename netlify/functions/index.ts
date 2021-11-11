import { readdirSync } from 'fs';
import { resolve } from 'path';
import serverless from 'serverless-http';
import { createApp } from '../../lib/express-app';

const path = resolve(__filename, '../../../build');
const path1 = resolve(__dirname, '../../../build');
console.log(2222222, path);

const handler = async (event, context) => {
  let pathFiles = [], pathFiles1 = [];
  try {
    pathFiles = readdirSync(path);
    pathFiles1 = readdirSync(path1);
  } catch (err) {
    pathFiles = [err.message];
    pathFiles1 = [err.message];
  }
  const body = {
    dirName: __dirname,
    fileName: __filename,
    path,
    path1,
    pathFiles,
    pathFiles1,
  };

  return {
    statusCode: 200,
    body: JSON.stringify(body),
  };
};

export { handler };


// module.exports.handler = serverless(createApp(path));
