import express from 'express';
const port = 7000;
const app = express();
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
