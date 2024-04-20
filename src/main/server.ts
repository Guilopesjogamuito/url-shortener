import app from './config/app';
import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper';
const port = 7000;

MongoHelper.connect(process.env.MONGO_CONNECTION as string)
  .then(() => {
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((e) => {
    console.error(`[server]: Failed to connect to db ${e}`);
  });
