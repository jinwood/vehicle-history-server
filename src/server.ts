import bodyParser from "koa-bodyparser";
import * as cors from "koa2-cors";
import { testRouter } from "./routes/test-routes";
import { crudRouter } from "./routes/crud-routes";
import postgresDB from "./database/postgres-db";

var app = require("./app");
const options = {
  origin: true,
  credentials: true,
};

const bootstrap = async () => {
  //init db
  await postgresDB();

  app.use(cors.default({ origin: "http://localhost:3000" }));

  app.use(bodyParser());

  app.use(testRouter.routes(), testRouter.allowedMethods());

  app.use(crudRouter.routes(), crudRouter.allowedMethods());

  const port = process.env.PORT || 4000;
  app.listen(port);
};

bootstrap();
