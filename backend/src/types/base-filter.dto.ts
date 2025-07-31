import { Type } from "class-transformer";
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsDate,
  IsString,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

/**
 * Sort direction
 */
export enum SortDirection {
  ASC = "asc",
  DESC = "desc",
}

/**
 * Base interface for all filtering parameters in the application
 * Provides common functionality for pagination and sorting
 */
export interface BaseFilterOptions {
  take?: number;
  skip?: number;
  sort?: string;
  sort_direction?: SortDirection;
  start_date?: Date;
  end_date?: Date;
  [key: string]: any;
}

/**
 * Base class for all DTO filters
 * Contains common pagination and sorting parameters
 */
export class BaseFilterDto implements BaseFilterOptions {
  @ApiProperty({
    description: "Number of items to skip",
    required: false,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  skip: number = 0;

  @ApiProperty({
    description: "Number of items to take",
    required: false,
    default: 10,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  take: number = 10;

  @ApiProperty({ description: "Sort field", required: false })
  @IsOptional()
  @IsString()
  sort?: string;

  @ApiProperty({
    description: "Sort direction",
    required: false,
    enum: SortDirection,
    default: SortDirection.DESC,
  })
  @IsOptional()
  @IsEnum(SortDirection)
  sort_direction?: SortDirection = SortDirection.DESC;

  @ApiProperty({ description: "Start date", required: false })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  start_date?: Date;

  @ApiProperty({ description: "End date", required: false })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  end_date?: Date;
}
