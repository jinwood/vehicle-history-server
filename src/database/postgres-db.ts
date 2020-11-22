import { createConnection } from "typeorm";
import { postgresTables } from "./postgres-tables";

const postgresDB = async () => {
  console.log("connecting...");
  const connection = await createConnection({
    type: "postgres",
    host: "manny.db.elephantsql.com",
    port: 5432,
    username: "bdbszlni",
    password: "tpqGopALS8c1A54nFBMpXmPU551DW3eX",
    database: "bdbszlni",
    ssl: true,
    entities: postgresTables,
    logging: true,
    synchronize: true,
  })
    .then(async (connection) => {
      console.log("connection to db established");
    })
    .catch((error) => console.log(`here's an error ${error}`));
  console.log("connection", connection);
  return connection;
};

export default postgresDB;
