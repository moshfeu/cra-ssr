import express from 'express';
import fetch from 'node-fetch';
import path from 'path';

import { flush } from './flush';
import { getData as getHomeData } from '../src/components/Home';
import { getData as getUserData } from '../src/components/User';

const app = express();

const createApp = () => {
  app.use(async (req, res, next) => {
    const pathname = req.path;
    if (pathname.startsWith('/static/')) {
      if (process.env.CI !== 'true') {
        const file = await fetch(`http://localhost:3000/${pathname}`).then(
          (res) => res.text()
        );
        res.send(file);
      } else {
        res.sendFile(path.join(__dirname, '..', 'build', pathname));
      }
      return;
    }
    next();
  });

  app.get('/s/:id', async (req, res) => {
    const todo = await getUserData(fetch, req.params.id);
    flush(res, req, todo);
  });

  app.get('/', async (req, res) => {
    const todos = await getHomeData(fetch);
    flush(res, req, todos);
  });

  return app;
};

export { createApp };
