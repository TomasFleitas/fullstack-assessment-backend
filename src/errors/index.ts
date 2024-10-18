export enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500,
}

export type TApiError = {
  status?: HttpStatusCode;
  message?: string;
};

export class ApiError extends Error {
  status?: HttpStatusCode;

  constructor({ status, message }: TApiError) {
    super(message);
    this.status = status;
  }

  public get statusCode(): HttpStatusCode | undefined {
    return this.status;
  }
}

export class BadRequest extends ApiError {
  constructor(message?: string) {
    super({
      status: HttpStatusCode.BAD_REQUEST,
      message,
    });
  }
}

export class NotFound extends ApiError {
  constructor(message?: string) {
    super({
      status: HttpStatusCode.NOT_FOUND,
      message,
    });
  }
}
