export declare enum SortDirection {
    ASC = "asc",
    DESC = "desc"
}
export interface BaseFilterOptions {
    take: number;
    skip: number;
    sort?: string;
    sort_direction?: SortDirection;
    start_date?: Date;
    end_date?: Date;
    is_excluded?: boolean;
    [key: string]: any;
}
export declare class BaseFilterDto implements BaseFilterOptions {
    skip: number;
    take: number;
    sort?: string;
    sort_direction?: SortDirection;
    start_date?: Date;
    end_date?: Date;
    is_excluded?: boolean;
}
