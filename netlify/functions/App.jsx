// @ts-check
import { readFileSync } from 'fs';
import fetch from 'node-fetch';
import path from 'path';

import React from 'react';
import ReactDOMServer from 'react-dom/server.js';
import { StaticRouter } from 'react-router-dom';

import { Routes } from '../../src/components/Routes';

export const renderAppAsString = async (/** @type {import('express').Request} */ request, ssrData) => {
  let template;
  if (process.env.NODE_ENV === 'production') {
    template = readFileSync(path.resolve('build/index.html'), 'utf8')
  } else {
    template = await fetch(`http://localhost:3000`).then((res) => res.text());
  }
  try {
    const reactPart = ReactDOMServer.renderToString(
      <StaticRouter location={request.url} context={{}}>
        <Routes ssrData={ssrData} />
      </StaticRouter>
    );

    return template.replace(
      '<div id="root"></div>',
      `
    <script>window.ssrData = ${JSON.stringify(ssrData)}</script>
    <div id="root">${reactPart}</div>`
    );
  } catch (error) {
    console.log(error);
    return `Error :(
      ${error}`;
  }
};
