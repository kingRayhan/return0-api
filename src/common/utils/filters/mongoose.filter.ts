import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ValidationError, Length } from 'class-validator';
import { Response, Request } from 'express';

@Catch()
export class QueryErrorFilter implements ExceptionFilter {
  public catch(exception: HttpException, host: ArgumentsHost): any {
    let dtoError: any;
    let otpError;
    let notAcceptError;
    let message
    const isError = exception['response'];
    if (isError) {
      dtoError = exception['response']['errors'];
    }
    if (exception['response'] == 'OTP Exception') {
      otpError = exception['response'];
    }

    if (isError?.statusCode == 406) {
      notAcceptError = isError['message'];
    }
    if (isError?.statusCode == 404) {
      message = isError['message'];
    }


    let errors = this.getErrorMessage(exception);
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    // const request = context.getRequest<Request>();

    let status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (status == HttpStatus.FORBIDDEN || status == HttpStatus.UNAUTHORIZED) {
      errors = { ...this.getFormattedForbiddenMessage(exception) };
    }

    if (exception['errors']) {
      const keys = Object.keys(exception['errors']);
      if (
        keys.length &&
        exception['errors'][keys[0]]['properties']?.type == 'unique'
      ) {
        status = 422;
      }
    }

    response.status(status ? status : 422).json({
      errors: { ...errors, ...dtoError, otpError, notAcceptError, message },
      status: status ? status : 422,
    });
  }

  getErrorMessage(exception) {
    if (exception['errors'] && Object.keys(exception['errors']).length) {
      const keys = Object.keys(exception['errors']);
      const errors = [];
      keys.map((key) => {
        errors[key] = exception['errors'][key]['properties'].message;
      });
      return errors;
    }
  }

  getFormattedForbiddenMessage(exception) {
    const errors = [];
    if (exception.getStatus() == HttpStatus.FORBIDDEN) {
      errors['message'] = exception['response']['message'];
    }

    if (exception.getStatus() == HttpStatus.UNAUTHORIZED) {
      errors['message'] = exception['response']['message'];
    }
    return errors;
  }
}
