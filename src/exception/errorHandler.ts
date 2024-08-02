import { Middleware, ExpressErrorMiddlewareInterface, HttpError } from 'routing-controllers';
import { Service } from 'typedi';

@Service()
@Middleware({ type: 'after' })
export class ErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: any, request: any, response: any, next: (err: any) => any) {
    if (error instanceof HttpError) {

      // @ts-ignore
      if (error.errors) {

        // @ts-ignore
        const message = error.errors.map((error: any) => Object.values(error.constraints || {}).join(', '));

        return response.status(400).json({
          message: 'Bad Request',
          errors: message,
        });
      }

      return response.status(error.httpCode).json({
        message: error.message,
        error: error.name
      });
    }

    return next(error);
  }
}
