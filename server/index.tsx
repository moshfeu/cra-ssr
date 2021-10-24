import { createApp } from '../lib/express-app';

const app = createApp();
const port = Number(process.env.PORT) || 8888;
app.listen(port, () => {
  console.log(`Server running on port ${port}!`);
});
