import {
  Body,
  Controller,
  Post,
  Query,
  Get,
  Put,
  Param,
  Delete,
  ParseUUIDPipe,
  Req,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateFormDto, FormsFiltersDto } from "./dto";
import { FormsService } from "./service";
import { AdminOnly } from "@lib/common";
import {
  example_extended_form,
  example_forms_list_result,
} from "./example.data";

@Controller("forms")
@ApiTags("Forms")
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Post(":locale")
  @ApiOperation({ summary: "Create form" })
  @ApiResponse({
    status: 201,
    description: "Form created",
    example: example_extended_form,
  })
  async create(
    @Body() dto: CreateFormDto,
    @Req() req: Request,
    @Param("locale") locale: string,
  ) {
    return this.formsService.create(dto, req, locale);
  }

  @Get()
  @AdminOnly()
  @ApiOperation({ summary: "Get forms" })
  @ApiResponse({
    status: 200,
    description: "Forms found",
    example: example_forms_list_result,
  })
  async findAll(@Query() filters: FormsFiltersDto) {
    return this.formsService.findAll(filters);
  }

  @Get(":id")
  @AdminOnly()
  @ApiOperation({ summary: "Get form" })
  @ApiResponse({
    status: 200,
    description: "Form found",
    example: example_extended_form,
  })
  async findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.formsService.findOne(id);
  }

  @Put(":id")
  @AdminOnly()
  @ApiOperation({ summary: "Answer form" })
  @ApiResponse({
    status: 200,
    description: "Form answered",
    example: example_extended_form,
  })
  async answer(@Param("id", ParseUUIDPipe) id: string) {
    return this.formsService.answer(id);
  }

  @Delete(":id")
  @AdminOnly()
  @ApiOperation({ summary: "Delete form" })
  @ApiResponse({ status: 200, description: "Form deleted" })
  async delete(@Param("id", ParseUUIDPipe) id: string) {
    return this.formsService.delete(id);
  }
}
