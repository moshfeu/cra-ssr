import { resolve } from 'path';
import serverless from 'serverless-http';
import { createApp } from '../../lib/express-app';

const path = resolve(__filename, '../../../build');

module.exports.handler = serverless(createApp(path));
