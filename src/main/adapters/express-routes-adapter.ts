import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols';
import { Request, Response } from 'express';

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body ? req.body : undefined,
      params: req.params ? req.params : undefined,
    };
    const httpResponse: HttpResponse = await controller.handle(httpRequest);
    if (httpResponse.headers) {
      for (const header of Object.entries(httpResponse.headers)) {
        const [name, value] = header;
        res.setHeader(name, value as string);
      }
    }
    return res.status(httpResponse.statusCode).json(httpResponse.body);
  };
};
