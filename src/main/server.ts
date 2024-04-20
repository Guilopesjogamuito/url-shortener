import app from './config/app';
const port = 7000;

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
