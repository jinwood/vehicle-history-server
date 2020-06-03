import { Context } from "koa";

export default class HomeController {
  public static async home(ctx: Context) {
    ctx.body = "Vehicle history";
  }
}
