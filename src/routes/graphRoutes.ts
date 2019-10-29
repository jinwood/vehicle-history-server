import Router from 'koa-router';
import graphqlHTTP, { OptionsData } from 'koa-graphql';
import { buildSchemaSync } from 'type-graphql';
import { UserResolver } from '../resolvers/userResolver';

export const graphRouter: Router = new Router();

export const schema = buildSchemaSync({
  resolvers: [UserResolver]
});

const options: OptionsData = {
  graphiql: true,
  schema
};

graphRouter.all('/graphql', graphqlHTTP(options));
