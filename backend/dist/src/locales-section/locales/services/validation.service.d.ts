import { PrismaService } from "@lib/prisma";
import { EntitiesValidationResult } from "../types";
export declare class ValidationService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private validateEntity;
    validateAllEntities(): Promise<EntitiesValidationResult>;
}
