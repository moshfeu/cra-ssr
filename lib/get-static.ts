import { readFileSync } from 'fs';
import fetch from 'node-fetch';

export const getStatic = async ({
  buildFolderPath,
  pathname = ''
}: {
  buildFolderPath?: string,
  pathname?: string;
}): Promise<string> => {
  if (process.env.CI !== 'true') {
    const res = await fetch(`http://localhost:3000/${pathname}`);
    return await res.text();
  }

  return readFileSync(`${buildFolderPath}${pathname}`, 'utf8');
}