/* eslint-disable no-console */
const app = require('./app');

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 4000;

app.listen(port, host, () => {
  console.log(`App listening on http://${host}:${port}`);
});
