import { renderAppAsString } from './renderer';
import { Flush } from './types';

export const flush: Flush = async (buildFolderPath, res, req, model) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(await renderAppAsString(buildFolderPath, req, model));
};
