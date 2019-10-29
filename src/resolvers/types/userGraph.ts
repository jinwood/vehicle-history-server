import { User } from '../../entities/user';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export default class UserGraph extends User {
  @Field()
  id: string;

  @Field()
  firstName: string;

  @Field()
  givenName: string;
}
