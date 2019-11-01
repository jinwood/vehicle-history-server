//https://typegraphql.ml/docs/resolvers.html
//https://gitter.im/type-graphql/Lobby#
import {
  Resolver,
  Query,
  Arg,
  ResolverInterface,
  FieldResolver
} from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';
import { User } from '../entities/user';

@Resolver(of => User)
export class UserResolver {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>){}

  // @Query(returns => UserGraph)
  // user(@Arg('userId') userId: string) {
  //   return this.userRepository.findOne(userId);
  // }

  // @Query(returns => [UserGraph])
  // users(): Promise<User[]> {
  //   console.log('ello', this.userRepository);
  //   return this.userRepository.find();
  // }
  @Query(returns => [User])
  users()  {
    const users = this.userRepository.find();
    return users;
  }
}
