import app from './config/app';
import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper';
import { PostgresHelper } from '../infra/db/postgresql/helpers/postgresql-helper';
const port = 7000;

const database = process.env.DATABASE;
const databaseHelper = database === 'mongodb' ? MongoHelper : PostgresHelper;
const connection = database === 'mongodb' ? process.env.MONGO_CONNECTION : process.env.POSTGRES_CONNECTION;
console.log(`[server]: Using database ${database}`);

databaseHelper
  .connect(connection as string)
  .then(() => {
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((e) => {
    console.error(`[server]: Failed to connect to db ${e}`);
  });
