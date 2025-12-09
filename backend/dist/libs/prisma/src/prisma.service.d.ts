import { OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { BaseFilterOptions } from "./types/base-filter.dto";
import { PrismaClient } from "@prisma/client";
export declare class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor();
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    buildQuery<T extends Record<string, any>>(options: BaseFilterOptions, default_sort?: keyof T & string, date_field?: keyof T & string, custom_filters?: (options: BaseFilterOptions) => Partial<T>): {
        skip: number;
        take: number;
        where: Partial<T>;
        orderBy: Record<string, string>;
    };
    findWithPagination<T = any>(model: {
        findMany: (options: any) => Promise<T[]>;
        count: (options: any) => Promise<number>;
    }, query_options: {
        skip: number;
        take: number;
        where: unknown;
        orderBy: unknown;
    }, include?: Record<string, unknown>): Promise<{
        items: T[];
        count: number;
    }>;
}
