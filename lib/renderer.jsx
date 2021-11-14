// @ts-check
import React from 'react';
import ReactDOMServer from 'react-dom/server.js';
import { StaticRouter } from 'react-router-dom';

import { Routes } from '../src/components/Routes';
import { getStatic } from './get-static';

export const renderAppAsString = async (
  /** @type {string} buildFolderPath */ buildFolderPath,
  /** @type {import('express').Request} */ request,
  /** @type {Record<string, any>} ssrData */ ssrData
) => {
  const template = await getStatic({buildFolderPath, pathname: 'index.html'});
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
