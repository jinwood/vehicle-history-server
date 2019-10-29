import { BaseContext } from 'koa';
import { getConnection } from 'typeorm';
import { User } from '../entities/user';
import { Vehicle } from '../entities/vehicle';
import { HistoryItem } from '../entities/historyItem';

export class TestData {
  public static async createTestData(ctx: BaseContext) {
    try {
      await TestData.PurgeDB();

      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values([
          {
            givenName: 'Julian',
            familyName: 'Inwood',
            email: 'julian@inwood.com',
            password: 'pass123'
          },
          {
            givenName: 'Vanessa',
            familyName: 'Humphreys',
            email: 'chumpers@gmail.com',
            password: 'pass123'
          }
        ])
        .execute();

      const julian = await getConnection()
        .createQueryBuilder()
        .select('user')
        .from(User, 'user')
        .where('user.givenName = :givenName', { givenName: 'Julian' })
        .getOne();

      const vehicle = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Vehicle)
        .values([
          {
            manufacturer: 'Mercedes-Benz',
            model: 'C320',
            engineSize: 3200,
            registration: 'ABC123'
          }
        ])
        .execute();

      const historyItem = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(HistoryItem)
        .values([
          {
            type: 1,
            description: 'Oil service',
            media: [
              'http://s3-media3.fl.yelpcdn.com/bphoto/Gx7GQWqkBfRI1mYMF4n4dg/o.jpg'
            ]
          }
        ])
        .execute();

      await getConnection()
        .createQueryBuilder()
        .relation(User, 'vehicles')
        .of(julian)
        .add(vehicle.identifiers[0].id);

      await getConnection()
        .createQueryBuilder()
        .relation(Vehicle, 'historyItems')
        .of(vehicle.identifiers[0].id)
        .add(historyItem.identifiers[0].id);
    } catch (err) {
      ctx.status = err.statusCode || err.status || 500;
      ctx.body = {
        message: err.message
      };
    }
  }

  public static async PurgeDB() {
    console.log('purging database');
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(HistoryItem)
      .execute();

    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Vehicle)
      .execute();

    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(User)
      .execute();
  }
}
