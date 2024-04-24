import { newDb } from 'pg-mem';
import { QueryResult, QueryResultRow } from 'pg';
import { PostgresHelper } from '../helpers/postgresql-helper';
import * as fs from 'fs';
import path from 'path';

const formatValue = (value: any) => {
  if (value instanceof Date) {
    return `${value.toISOString()}`;
  }
  return value;
};

const substituteValues = (sqlQuery: string, values: any[]) => {
  let index = 1;
  const substitutedQuery = sqlQuery.replace(/\$\d+/g, (match) => {
    const value = formatValue(values[index - 1]);
    index++;
    const replacedValue = typeof value === 'string' ? `'${value}'` : value;
    return replacedValue;
  });

  return substitutedQuery;
};

const db = newDb();
const { Pool: memPool } = db.adapters.createPg();

const runMigrations = async () => {
  try {
    const migrationSQL = fs.readFileSync(path.join(__dirname, 'migration.sql'), 'utf8');
    await db.public.many(migrationSQL);
  } catch (error) {
    console.error('Error executing migrations:', error);
  }
};

const mockedQuery = async (queryText: string, params?: any[]) => {
  const newQuery = substituteValues(queryText, params as any[]);
  const result = (await db.public.query(newQuery)) as unknown as QueryResult<QueryResultRow>;
  return result;
};

export const setupPgMem = async () => {
  PostgresHelper.pool = memPool;
  PostgresHelper.query = mockedQuery;
  await runMigrations();
};

export const clearPgMem = async () => {
  await db.public.query('DELETE FROM url;');
};
