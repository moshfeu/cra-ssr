import express from 'express';
import fetch from 'node-fetch';
import path from 'path';

import { flush } from './flush';
import { getData as getHomeData } from '../src/components/Home';
import { getData as getUserData } from '../src/components/User';
import { getStatic } from './get-static';

const app = express();

const createApp = (buildFolderPath: string) => {
  app.use(async (req, res, next) => {
    const pathname = req.path;
    if (pathname.startsWith('/static/') || path.extname(req.path)) {
      res.end(
        await getStatic({pathname, buildFolderPath})
      );
      return;
    }
    next();
  });

  app.get('/s/:id', async (req, res) => {
    const todo = await getUserData(fetch, req.params.id);
    flush(buildFolderPath, res, req, todo);
  });

  app.get('/', async (req, res) => {
    const todos = await getHomeData(fetch);
    flush(buildFolderPath, res, req, todos);
  });

  return app;
};

export { createApp };
