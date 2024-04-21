import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols';
import { Request, Response } from 'express';

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body ? req.body : undefined,
      params: req.params ? req.params : undefined,
    };
    const httpResponse: HttpResponse = await controller.handle(httpRequest);
    return res.status(httpResponse.statusCode).json(httpResponse.body);
  };
};
