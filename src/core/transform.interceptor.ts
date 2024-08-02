import { Interceptor, InterceptorInterface, Action } from 'routing-controllers';
import { Service } from 'typedi';

@Interceptor()
@Service()
export class TransformInterceptor implements InterceptorInterface {

  intercept(action: Action, result: any) {
    return {
      data: result
    };
  }
}