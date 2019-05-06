import { createConnection } from 'typeorm';
import { postgresTables } from './postgres-tables';

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
    }).then((connection) => {
        console.log('connection to db established');
    }).catch(error => console.log(error));
};