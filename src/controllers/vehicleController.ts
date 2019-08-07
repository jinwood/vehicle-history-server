import { BaseContext } from "koa";
import { getManager, Repository, getConnection } from "typeorm";
import { validate, ValidationError } from "class-validator";
import { Vehicle } from "models/vehicle";
import { User } from "models/user";

export default class VehicleController {
  public static async getVehicles(ctx: BaseContext) {
    const vehicleRepository: Repository<Vehicle> = getManager().getRepository(
      Vehicle
    );

    const vehicles: Vehicle[] = await vehicleRepository.find();

    ctx.status = 200;
    ctx.body = vehicles;
  }

  public static async getVehicle(ctx: BaseContext) {
    const vehicleRepository: Repository<Vehicle> = getManager().getRepository(
      Vehicle
    );

    const vehicle: Vehicle = await vehicleRepository.findOne(ctx.params.id);

    if (vehicle) {
      ctx.status = 200;
      ctx.body = vehicle;
    } else {
      ctx.status = 400;
      ctx.body = `couldn't find vehicle with id ${ctx.params.id}`;
    }
  }

  public static async getVehicleByUserId(ctx: BaseContext) {
    const vehicleRepository: Repository<Vehicle> = getManager().getRepository(
      Vehicle
    );

    const vehicle: Vehicle = await vehicleRepository
      .createQueryBuilder("vehicle")
      .leftJoin("vehicle.user", "user", "user.id = :id", {
        id: ctx.params.id
      })
      .getOne();

    if (vehicle) {
      ctx.status = 200;
      ctx.body = vehicle;
    } else {
      ctx.status = 400;
      ctx.body = `no vehicles associated with user ${ctx.params.id}`;
    }
  }

  public static async getVehicleByRegistration(ctx: BaseContext) {
    console.log("by reg");

    const vehicleRepository: Repository<Vehicle> = getManager().getRepository(
      Vehicle
    );

    const vehicle: Vehicle = await vehicleRepository.findOne({
      where: {
        registration: ctx.params.registration
      }
    });

    if (vehicle) {
      ctx.status = 200;
      ctx.body = vehicle;
    } else {
      ctx.status = 400;
      ctx.body = `couldn't find vehicle with reg ${ctx.params.registration}`;
    }
  }

  public static async createVehicle(ctx: BaseContext) {
    const vehicleRepository: Repository<Vehicle> = getManager().getRepository(
      Vehicle
    );

    const newVehicle: Vehicle = new Vehicle();

    newVehicle.manufacturer = ctx.request.body.manufacturer;
    newVehicle.model = ctx.request.body.model;
    newVehicle.engineSize = ctx.request.body.engineSize;
    newVehicle.registration = ctx.request.body.registration;
    newVehicle.user = ctx.request.body.user;

    const validationErrors: ValidationError[] = await validate(newVehicle, {
      skipMissingProperties: true
    });
    if (validationErrors.length > 0) {
      ctx.status = 400;
      ctx.body = validationErrors;
    } else if (
      await vehicleRepository.findOne({ registration: newVehicle.registration })
    ) {
      ctx.status = 400;
      ctx.body = `the vehicle with registration ${
        newVehicle.registration
      } already exists`;
    } else {
      const vehicle = vehicleRepository.save(newVehicle);
      ctx.status = 201;
      ctx.body = vehicle;
    }
  }
}
