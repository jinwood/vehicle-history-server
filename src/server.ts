import 'reflect-metadata';
import * as TypeORM from 'typeorm';
import * as TypeGraphQL from 'type-graphql';
import postgresDB from './database/postgres-db';
import { ApolloServer } from 'apollo-server';
import { UserResolver } from './resolvers/userResolver';
import { Container } from 'typedi';
import { VehicleResolver } from './resolvers/vehicleResolver';

TypeORM.useContainer(Container);

const bootstrap = async () => {
  try {
    //init db
    await postgresDB();

    const schema = await TypeGraphQL.buildSchema({
      resolvers: [UserResolver, VehicleResolver],
      container: Container,
    });

    const server = new ApolloServer({ schema });
    const { url } = await server.listen(4000);
    console.log(`Server is running, GraphQL Playground available at ${url}`);
  } catch (err) {
    console.error(err);
  }
};

bootstrap();
