import { createConnection, Repository, getManager, Connection } from 'typeorm';
import { postgresTables } from './postgres-tables';
import { Manufacturers } from '../models/manufacturers';
import manufacturersData from '../../config.json';

const postgresDB = async () => {
  return await createConnection({
    type: 'postgres',
    host: 'manny.db.elephantsql.com',
    port: 5432,
    username: 'bdbszlni',
    password: 'tpqGopALS8c1A54nFBMpXmPU551DW3eX',
    database: 'bdbszlni',
    ssl: true,
    entities: postgresTables,
    logging: ['query', 'error'],
    synchronize: true
  })
    .then(async connection => {
      console.log('connection to db established');
    })
    .catch(error => console.log(`here's an error ${error}`));
};

export default postgresDB;

async function seed(connection: Connection) {
  let manufacturerRepository: Repository<
    Manufacturers
  > = getManager().getRepository(Manufacturers);
  let manufacturersCount = await manufacturerRepository.count();

  if (manufacturersCount < 1) {
    console.log('seeding manufacturers');
    let newManufacturers: Manufacturers[] = [];
    manufacturersData.manufacturers.forEach(m => {
      newManufacturers.push(new Manufacturers(m));
    });

    manufacturerRepository
      .createQueryBuilder()
      .insert()
      .into(Manufacturers)
      .values(newManufacturers)
      .execute();
  } else {
    console.log('manufacturer data already exists');
  }
}
