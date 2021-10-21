import React from 'react';
import ReactDOMServer from 'react-dom/server.js';

export const renderAppAsString = (id) => {
  return ReactDOMServer.renderToString(<div>foo: {id}</div>);
}