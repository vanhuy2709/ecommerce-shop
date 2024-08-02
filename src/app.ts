import 'reflect-metadata';
import 'dotenv/config';
import { Application } from 'express';
import { createExpressServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';
import { authorizationChecker, currentUserChecker } from './configuration/authorize.config';
import { ErrorHandler } from './exception/errorHandler';
import { TransformInterceptor } from './core/transform.interceptor';

(async () => {
  // Use Container in global
  useContainer(Container);

  // Creates express app, registers all controller routes and returns you express app instance
  const app: Application = createExpressServer({
    routePrefix: "/api/v1",
    validation: true,
    authorizationChecker: authorizationChecker,
    currentUserChecker: currentUserChecker,
    middlewares: [ErrorHandler],
    controllers: [], // we specify controllers we want to use
    interceptors: [TransformInterceptor],
    defaultErrorHandler: false
  });

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.listen(process.env.PORT, () => {
    return console.log(`Express is listening at http://localhost:${process.env.PORT}`);
  });
})();
