import type { Handler } from '@netlify/functions';
import { renderAppAsString }  from './App';

const handler: Handler = async (event, context) => {
  return {
    statusCode: 200,
    body: renderAppAsString(event.path),
  };
};

export { handler };
