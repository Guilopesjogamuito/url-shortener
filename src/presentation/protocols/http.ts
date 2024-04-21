export interface HttpResponse {
  statusCode: number;
  body: any;
  headers?: any;
}

export interface HttpRequest {
  params?: any;
  body?: any;
}
