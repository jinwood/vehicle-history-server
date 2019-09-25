import { BaseContext } from 'koa';
import { Repository, getManager } from 'typeorm';
import { HistoryItem } from '../models/historyItem';

export default class HistoryItemController {
  public static async getHistoryItems(ctx: BaseContext) {
    const historyItemRepository: Repository<
      HistoryItem
    > = getManager().getRepository(HistoryItem);

    const historyItems: HistoryItem[] = await historyItemRepository.find();

    ctx.status = 200;
    ctx.body = historyItems;
  }
}
