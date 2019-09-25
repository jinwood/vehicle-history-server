import { BaseContext } from 'koa';
import { getManager, Repository, Not, Equal, getConnection } from 'typeorm';
import { validate, ValidationError } from 'class-validator';
import { User } from '../models/user';
import { Vehicle } from '../models/vehicle';

export default class UserController {
  public static async getUsers(ctx: BaseContext) {
    const userRepository: Repository<User> = getManager().getRepository(User);

    const users: User[] = await userRepository.find();

    ctx.status = 200;
    ctx.body = users;
  }

  public static async getUser(ctx: BaseContext) {
    const userRepository: Repository<User> = getManager().getRepository(User);

    const user = await userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id: ctx.params.id })
      .getOne();

    if (user) {
      ctx.status = 200;
      ctx.body = user;
    } else {
      ctx.status = 400;
      ctx.body = `couldnt find the user with id ${ctx.params.id}`;
    }
  }

  public static async createUser(ctx: BaseContext) {
    const userRepository: Repository<User> = getManager().getRepository(User);

    const newUser: User = new User();

    newUser.givenName = ctx.request.body.name;
    newUser.familyName = ctx.request.body.familyName;
    newUser.email = ctx.request.body.email;
    newUser.password = ctx.request.body.hashedPassword;

    const validationErrors: ValidationError[] = await validate(newUser, {
      skipMissingProperties: true
    });
    if (validationErrors.length > 0) {
      ctx.status = 400;
      ctx.body = validationErrors;
    } else if (await userRepository.findOne({ email: newUser.email })) {
      ctx.status = 400;
      ctx.body = 'the user with specified email already exists';
    } else {
      const user = await userRepository.save(newUser);
      ctx.status = 201;
      ctx.body = user;
    }
  }

  public static async updateUser(ctx: BaseContext) {
    const userRepository: Repository<User> = getManager().getRepository(User);

    const updatee = await userRepository.findOne(ctx.params.id);

    if (!updatee) {
      ctx.status = 400;
      ctx.body = `the user with id ${ctx.params.id} doesnt exist`;
      return;
    }

    if (ctx.request.body.name) {
      updatee.givenName = ctx.request.body.name;
    }
    if (ctx.request.body.email) {
      updatee.email = ctx.request.body.email;
    }
    if (ctx.request.body.hashedPassword) {
      updatee.password = ctx.request.body.hashedPassword;
    }

    const validationErrors: ValidationError[] = await validate(updatee);
    if (validationErrors.length > 0) {
      ctx.status = 400;
      ctx.body = validationErrors;
    } else if (!(await userRepository.findOne(updatee.id))) {
      ctx.status = 400;
      ctx.body = "The user you are trying to update doesn't exist in the db";
    } else if (
      await userRepository.findOne({
        id: Not(Equal(updatee.id)),
        email: updatee.email
      })
    ) {
      ctx.status = 400;
      ctx.body = 'The specified e-mail address already exists';
    } else {
      const user = await userRepository.save(updatee);
      ctx.status = 201;
      ctx.body = user;
    }
  }

  public static async deleteUser(ctx: BaseContext) {
    const userRepository: Repository<User> = getManager().getRepository(User);

    const deletee = await userRepository.findOne(ctx.params.id);

    if (!deletee) {
      ctx.status = 400;
      ctx.body = `couldn't find user with id ${ctx.params.id}`;
    } else {
      await userRepository.remove(deletee);
      ctx.status = 204;
    }
  }
  public static async getUserVehicles(ctx: BaseContext) {
    console.log('in get user vehicles');
    const userRepository: Repository<User> = getManager().getRepository(User);

    const user = await userRepository.findOne(ctx.params.id);
    let vehicle = await getConnection()
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.id = :id', { id: ctx.params.id })
      .leftJoinAndSelect('user.vehicles', 'vehicle.id')
      .getOne();

    if (user) {
      ctx.status = 200;
      ctx.body = vehicle;
    } else {
      ctx.status = 400;
      ctx.body = `couldnt find the user with id ${ctx.params.id}`;
    }
  }
}
