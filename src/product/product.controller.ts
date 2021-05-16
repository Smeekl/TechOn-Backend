import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Catch,
  UseFilters,
  Res,
  Response,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, ProductDto } from './dto/product.dto';
import { HttpExceptionFilter } from '../exceptions/http.exception.filter';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(
    @Body() createProductDto: CreateProductDto,
    @Res() response: Response,
  ) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: ProductDto) {
    return this.productService.update(Number(id), updateProductDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productService.delete(Number(id));
  }
}
