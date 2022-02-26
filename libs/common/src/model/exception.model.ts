import { HttpException, Logger } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { ErrorCode } from '../constant/error-code';
import { Output } from './output.model';

/**
 * NestException
 */
export class NestException extends HttpException {
  errorMessage?: string | null;

  constructor(
    public code: ErrorCode,
    public statusCode: number = 7829,
    errorMessage?: string | null,
  ) {
    super(code, statusCode);
    this.errorMessage = errorMessage;
  }

  /**
   * processException
   */
  static processException(error: any): Output {
    Logger.debug(JSON.stringify(error));
    if (error instanceof NestException) {
      return {
        result: <ErrorCode>error.message,
        errorMessage: error.errorMessage,
      } as Output;
    } else if (error instanceof QueryFailedError) {
      return {
        result: ErrorCode.QUERY_ERROR,
        errorMessage: error.message,
      } as Output;
    } else {
      return {
        result: ErrorCode.ERROR,
        errorMessage: error.message,
      } as Output;
    }
  }
}
