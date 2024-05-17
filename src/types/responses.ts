export interface OkResponse<T> {
  ok: true;
  data: T;
  [key: string]: any;
}
export interface ErrorResponse {
  ok: false;
  message: string;
  [key: string]: any;
}

export type BasePayload<T> = OkResponse<T> | ErrorResponse;
