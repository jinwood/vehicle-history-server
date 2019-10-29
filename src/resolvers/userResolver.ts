//https://typegraphql.ml/docs/resolvers.html
import {
  Resolver,
  Query,
  Arg,
  ResolverInterface,
  FieldResolver
} from 'type-graphql';
import { Repository } from 'typeorm';
import UserGraph from './types/userGraph';
import { User } from '../entities/user';

@Resolver(of => UserGraph)
export class UserResolver {
  constructor(private userRepository: Repository<User>) {}

  // @Query(returns => UserGraph)
  // user(@Arg('userId') userId: string) {
  //   return this.userRepository.findOne(userId);
  // }

  // @Query(returns => [UserGraph])
  // users(): Promise<User[]> {
  //   console.log('ello', this.userRepository);
  //   return this.userRepository.find();
  // }
  @Query()
  users() {
    const users = this.userRepository.find();
    return users;
  }
}
