import { NotFoundError, ServerError } from '../errors';
import { HttpResponse } from '../protocols/http';

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error.message,
});

export const found = (location: string): HttpResponse => ({
  statusCode: 302,
  headers: { Location: location },
  body: {},
});

export const ok = (body: any): HttpResponse => ({
  statusCode: 200,
  body,
});

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(),
});

export const notFound = (): HttpResponse => ({
  statusCode: 404,
  body: new NotFoundError(),
});
