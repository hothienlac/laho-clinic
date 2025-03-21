export class HttpException extends Error {
  statusCode: number;
  message: string;
  error: unknown;

  constructor(statusCode: number, message: string, error?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.error = error;
  }
}

export class BadRequestException extends HttpException {
  constructor(message: string, error?: unknown) {
    super(400, message, error);
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message: string, error?: unknown) {
    super(401, message, error);
  }
}

export class ForbiddenException extends HttpException {
  constructor(message: string, error?: unknown) {
    super(403, message, error);
  }
}

export class NotFoundException extends HttpException {
  constructor(message: string, error?: unknown) {
    super(404, message, error);
  }
}

export class InternalServerErrorException extends HttpException {
  constructor(message: string, error?: unknown) {
    super(500, message, error);
  }
}

export class ConflictException extends HttpException {
  constructor(message: string, error?: unknown) {
    super(409, message, error);
  }
}

export class UnprocessableEntityException extends HttpException {
  constructor(message: string, error?: unknown) {
    super(422, message, error);
  }
}

export class NotImplementedException extends HttpException {
  constructor(message: string, error?: unknown) {
    super(501, message, error);
  }
}

export class ServiceUnavailableException extends HttpException {
  constructor(message: string, error?: unknown) {
    super(503, message, error);
  }
}

export class GatewayTimeoutException extends HttpException {
  constructor(message: string, error?: unknown) {
    super(504, message, error);
  }
}

export class TooManyRequestsException extends HttpException {
  constructor(message: string, error?: unknown) {
    super(429, message, error);
  }
}

export class BadGatewayException extends HttpException {
  constructor(message: string, error?: unknown) {
    super(502, message, error);
  }
}

export class NotAcceptableException extends HttpException {
  constructor(message: string, error?: unknown) {
    super(406, message, error);
  }
}

export class PreconditionFailedException extends HttpException {
  constructor(message: string, error?: unknown) {
    super(412, message, error);
  }
}
