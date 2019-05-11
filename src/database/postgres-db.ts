import { createConnection, Repository, getManager } from 'typeorm';
import { postgresTables } from './postgres-tables';
import { Manufacturers } from '../models/manufacturers';
import manufacturersData from '../../config.json';

export const postgresDB = async () => {
    return await createConnection({
        type        : 'postgres',
        host        : 'manny.db.elephantsql.com',
        port        : 5432,
        username    : 'bdbszlni',
        password    : 'tpqGopALS8c1A54nFBMpXmPU551DW3eX',
        database    : 'bdbszlni',
        ssl         : true,
        entities    : postgresTables,
        logging     : ['query', 'error'],
        synchronize : true,
    }).then( async connection => {
        console.log('connection to db established');
        await seed(connection);
    }).catch(error => console.log(`here's an error ${error}`));
};


async function seed(connection) {
    let manufacturerRepository: Repository<Manufacturers> = getManager().getRepository(Manufacturers);
    let manufacturersCount = await manufacturerRepository.count();

    if(manufacturersCount < 1) {
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