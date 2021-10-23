import fetch from 'node-fetch';
import express from 'express';
import path from 'path';
import serverless from 'serverless-http';
import { renderAppAsString } from './App';
import { getData as getHomeData } from '../../src/components/Home';
import { getData as getUserData } from '../../src/components/User';

const app = express();

async function flush(res: express.Response, req: express.Request, model: any) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(await renderAppAsString(req, model));
}

app.use(async (req, res, next) => {
  const pathname = req.path;
  if (pathname.startsWith('/static/')) {
    if (process.env.NODE_ENV !== 'development') {
      const file = await fetch(`http://localhost:3000/${pathname}`).then(res => res.text());
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

module.exports.handler = serverless(app);
