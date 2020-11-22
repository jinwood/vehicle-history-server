import { Context } from "koa";
import { Repository, getManager } from "typeorm";
import { HistoryItem } from "../models/historyItem";
import { ValidationError, validate } from "class-validator";

export default class HistoryItemController {
  public static async getHistoryItems(ctx: Context) {
    const historyItemRepository: Repository<HistoryItem> = getManager().getRepository(
      HistoryItem
    );

    const historyItems: HistoryItem[] = await historyItemRepository.find();

    ctx.status = 200;
    ctx.body = historyItems;
  }

  public static async createHistoryItem(ctx: Context) {
    const historyItemRepository: Repository<HistoryItem> = getManager().getRepository(
      HistoryItem
    );

    const newHistoryItem: HistoryItem = new HistoryItem();
    const { historyItemType, description } = ctx.request.body.historyItem;

    newHistoryItem.type = historyItemType;
    newHistoryItem.description = description;

    const validationErrors: ValidationError[] = await validate(newHistoryItem, {
      skipMissingProperties: true,
    });

    if (validationErrors.length > 0) {
      ctx.status = 400;
      ctx.response.body = { validationErrors };
    } else {
      try {
        const historyItem = historyItemRepository
          .save(newHistoryItem)
          .then((h) => {
            console.log(`created vehicle with id ${h.id}`);
          });
        ctx.status = 201;
        ctx.response.body = { historyItem };
      } catch (err) {
        ctx.status = 500;
        ctx.response.body = { err };
      }
    }
  }
}
