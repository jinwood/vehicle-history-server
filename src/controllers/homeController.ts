import { BaseContext } from 'koa';

export default class HomeController {
  public static async home(ctx: BaseContext) {
    ctx.body = 'Vehicle history';
  }
}
