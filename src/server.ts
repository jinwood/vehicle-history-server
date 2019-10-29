import 'reflect-metadata';
import postgresDB from './database/postgres-db';
import { ApolloServer } from 'apollo-server';
import { UserResolver } from './resolvers/userResolver';
import { Container } from 'typedi';
import { buildSchema } from 'type-graphql';
import { Context } from './resolvers/types/context';

const bootstrap = async () => {
  try {
    //init db
    await postgresDB();

    const schema = await buildSchema({
      resolvers: [UserResolver]
    });

    const server = new ApolloServer({ schema });
    const { url } = await server.listen(4000);
    console.log(`Server is running, GraphQL Playground available at ${url}`);
  } catch (err) {
    console.error(err);
  }
};

bootstrap();
