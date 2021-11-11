import path from 'path';
import { createApp } from '../lib/express-app';

const app = createApp(path.join(__dirname, '..', 'build'));
const port = Number(process.env.PORT) || 8888;
app.listen(port, () => {
  console.log(`Server running on port ${port}!`);
});
