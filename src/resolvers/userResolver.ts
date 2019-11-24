//https://typegraphql.ml/docs/resolvers.html
import {
  Resolver,
  Query,
  Arg,
  Mutation,
  FieldResolver,
  Root,
  ResolverInterface
} from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository, DeleteResult } from 'typeorm';
import { User } from '../entities/user';
import { UserInput } from './types/user-input';
import { ValidationError } from 'apollo-server';
import { Vehicle } from '../entities/vehicle';

@Resolver(of => User)
export class UserResolver implements ResolverInterface<User> {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>
  ) {}

  //get 1
  @Query(() => User)
  user(@Arg('userId') userId: string) {
    return this.userRepository.findOne(userId);
  }

  //get all
  @Query(() => [User])
  users() {
    const users = this.userRepository.find();
    return users;
  }

  //add 1
  @Mutation(returns => User)
  addUser(@Arg('user') userInput: UserInput): Promise<User> {
    const user = this.userRepository.create({
      ...userInput
    });
    return this.userRepository.save(user);
  }

  //delete 1
  @Mutation(returns => String)
  async deleteUser(@Arg('userId') userId: string): Promise<string> {
    const deletee = await this.userRepository.findOne(userId);

    if (deletee) {
      const deleted = this.userRepository.remove(deletee);
      return deletee.id;
    } else {
      return 'no entity found';
    }
  }

  @FieldResolver()
  async vehicles(@Root() user: User) {
    const vehicle = await this.vehicleRepository.findOne({
      where: { userId: user.id }
    });
    console.table(vehicle);
    if (!vehicle) throw new Error();
    return [vehicle];
  }
}
