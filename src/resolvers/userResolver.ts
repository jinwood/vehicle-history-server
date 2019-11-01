//https://typegraphql.ml/docs/resolvers.html
import {
  Resolver,
  Query,
  Arg,
  Mutation} from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository, DeleteResult } from 'typeorm';
import { User } from '../entities/user';
import { UserInput } from './types/user-input';
import { ValidationError } from 'apollo-server';

@Resolver(() => User)
export class UserResolver {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>){}

  //get 1
  @Query(() => User)
  user(@Arg('userId') userId: string) {
    return this.userRepository.findOne(userId);
  }

  //get all
  @Query(() => [User])
  users()  {
    const users = this.userRepository.find();
    return users;
  }

  //add 1
  @Mutation(returns => User)
  addUser(
    @Arg('user') userInput: UserInput
  ): Promise<User> {
    const user = this.userRepository.create({
      ...userInput
    });
    return this.userRepository.save(user);
  }

  //delete 1
  @Mutation(returns => String)
  async deleteUser(@Arg('userId') userId: string): Promise<string> {
    const deletee = await this.userRepository.findOne(userId);

    if(deletee) {
      const deleted = this.userRepository.remove(deletee);
      return deletee.id;
    } else {
      return 'no entity found'
    }
  }
}
