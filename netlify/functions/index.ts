import serverless from 'serverless-http';
import { createApp } from '../../lib/express-app';

module.exports.handler = serverless(createApp());
