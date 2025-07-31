export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export interface BaseFilterDto {
  skip?: number;
  take?: number;
  sort?: string;
  sort_direction?: SortDirection;
  start_date?: Date;
  end_date?: Date;
} 