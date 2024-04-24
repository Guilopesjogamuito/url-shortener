import { AddURLRepository } from '../../../../data/protocols/add-url-repository';
import { AddURLModel } from '../../../../domain/use-cases/add-url';
import { URLModel } from '../../../../domain/models/url';
import { PostgresHelper } from '../helpers/postgresql-helper';
import { LoadURLBySuffixRepository } from '../../../../data/protocols/load-url-by-suffix-repository';

export class URLPostgresRepository implements AddURLRepository, LoadURLBySuffixRepository {
  async add(urlObject: AddURLModel): Promise<URLModel> {
    const createdAt = new Date();
    const expiresAt = new Date();
    const { originalURL, suffix } = urlObject;
    const queryText = `
      INSERT INTO url (original_url, suffix, created_at, expires_at)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const { rows } = await PostgresHelper.query(queryText, [originalURL, suffix, createdAt, expiresAt]);

    const model = {
      originalURL,
      suffix,
      createdAt,
      expiresAt,
    };
    return model;
  }

  async load(suffix: string): Promise<URLModel | null> {
    const queryText = `
      SELECT *
      FROM url
      WHERE suffix = $1
    `;
    const { rows } = await PostgresHelper.query(queryText, [suffix]);
    if (rows.length === 0) {
      return null;
    }
    const model = {
      originalURL: rows[0].original_url,
      suffix: rows[0].suffix,
      createdAt: rows[0].created_at,
      expiresAt: rows[0].expires_at,
    };
    return model;
  }
}
