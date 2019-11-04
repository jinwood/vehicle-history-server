import { Resolver, Query, Arg } from "type-graphql";
import { Vehicle } from "../entities/vehicle";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Repository } from "typeorm";

@Resolver(() => Vehicle)
export class VehicleResolver {
    constructor(@InjectRepository(Vehicle) private readonly vehicleRepository: Repository<Vehicle>){}

    @Query(() => Vehicle)
    vehicle(@Arg('userId') userId: string) {
        return this.vehicleRepository.findOne({ userId });
    }
}