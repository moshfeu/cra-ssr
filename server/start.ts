import { spawn } from 'child_process';
import waitOn from 'wait-on';
import nodemon from 'nodemon';

(async () => {
  console.log('starting client in dev mode');
  spawn('yarn', ['start:csr'], {
    stdio: 'inherit',
    cwd: process.cwd(),
    env: {
      ...process.env,
      NODE_ENV: 'development',
      BROWSER: 'none',
    }
  });

  console.log('waiting for localhost:3000');
  try {
    await waitOn({
      resources: ['http://localhost:3000'],
    });
  } catch (error) {
    console.log('waitOn timeout');
  }

  console.log('running nodemon');
  const n = nodemon({
    script: './server',
    ext: 'tsx',
    exec: 'ts-node server/index.tsx',
  });

  n.on('start', function () {
    console.log('App has started');
  })
    .on('quit', function () {
      console.log('App has quit');
      process.exit();
    })
    .on('restart', function (files) {
      console.log('App restarted due to: ', files);
    });
})();
