import { Handler } from "@netlify/functions";
import fs from 'fs';
import path from 'path';

const handler: Handler = async (event, context) => {
  const p = event.queryStringParameters.p || '';
  let relativePath = '',
  relativePathFiles = [];

  try {
    relativePath = path.resolve(__dirname, p);
    relativePathFiles = fs.readdirSync(path.resolve(__dirname, p))
  } catch (error) {
    relativePath = error;
  }
  const body = {
    p: event.queryStringParameters.p,
    dirName: __dirname,
    files: fs.readdirSync(__dirname),
    relativePath,
    relativePathFiles,
  };

  return {
    statusCode: 200,
    body: JSON.stringify(body),
  };
};

export { handler };

