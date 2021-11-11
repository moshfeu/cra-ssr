import { resolve } from 'path';
import serverless from 'serverless-http';
import { createApp } from '../../lib/express-app';

module.exports.handler = serverless(
  createApp(
    resolve(__dirname, '../../build')
  )
);
