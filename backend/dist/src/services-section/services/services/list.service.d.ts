import { ServiceFiltersDto } from "../dto";
import { BaseListResult, PrismaService } from "@lib/prisma";
import { ExtendedService } from "../example.data";
export declare class ListService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getServices(filterDto: ServiceFiltersDto): Promise<BaseListResult<ExtendedService>>;
}
