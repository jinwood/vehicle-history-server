import { Field, InputType } from 'type-graphql';
import { User } from '../../entities/user';

@InputType()
export class UserInput implements Partial<User> {
  @Field()
  givenName: string;

  @Field()
  familyName: string;
}
