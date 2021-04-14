import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Product} from "./entities/product.entity";
import {CreateProductDto, ProductDto} from "./dto/product.dto";

@Injectable()
export class ProductService {

  constructor(
      @InjectRepository(Product)
      private productRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    const product = new Product(createProductDto);
    return this.productRepository
        .createQueryBuilder()
        .insert()
        .into(Product)
        .values(product)
        .execute();
  }

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: number) {
    return this.productRepository
        .createQueryBuilder('product')
        .where('product.id = :id', { id })
        .getOne();
  }

  async update(criteria: number | ProductDto, user: ProductDto) {
    await this.productRepository.update(criteria, user);
  }
}
