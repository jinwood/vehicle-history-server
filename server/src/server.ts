import { postgresDB } from 'database/postgres-db';
import { testRouter } from 'routes/test-routes';
import { crudRouter } from 'routes/crud-routes';
import * as bodyParser from 'koa-bodyparser';
import * as cors from 'koa2-cors';

var app = require('./app');
const options = {
    origin: true,
    credentials: true
}

const bootstrap = async () => {

    //init db
    await postgresDB();

    app.use(cors({origin: 'http://localhost:3000'}));
    
    app.use(bodyParser());

    app.use(testRouter.routes(), testRouter.allowedMethods());

    app.use(crudRouter.routes(), crudRouter.allowedMethods());

    app.listen(4000);
};

bootstrap();