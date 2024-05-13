export type OkResponse<T extends any = object> = { ok: true; data: T; [key: string]: any }
export type ErrorResponse = { ok: false; message: string; [key: string]: any }

export type BasePayload<T> = OkResponse<T> | ErrorResponse
