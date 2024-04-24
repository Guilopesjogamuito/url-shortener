import { QueryResult, Pool, QueryResultRow } from 'pg';
import * as fs from 'fs';
import path from 'path';
export const PostgresHelper = {
  pool: null as unknown as Pool,

  async connect(uri: string) {
    this.pool = new Pool({ connectionString: uri });
    await this.pool.connect();
    await this.runMigrations();
  },
  async disconnect() {
    await this.pool.end();
  },

  async runMigrations() {
    try {
      const migrationSQL = fs.readFileSync(path.join(__dirname, 'migration.sql'), 'utf8');
      await this.pool.query(migrationSQL);
      console.log('Migrations executed successfully.');
    } catch (error) {
      console.error('Error executing migrations:', error);
    }
  },

  async query(queryText: string, params?: any[]): Promise<QueryResult<QueryResultRow>> {
    return this.pool.query(queryText, params);
  },
};
