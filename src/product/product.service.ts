import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createQueryBuilder, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto, ProductDto } from './dto/product.dto';
import { ProductImages } from './entities/productImages.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductImages)
    private imagesRepository: Repository<ProductImages>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = new Product(createProductDto);
    const productExecute = this.productRepository
      .createQueryBuilder()
      .insert()
      .into(Product)
      .values(product)
      .execute();

    if (!createProductDto.images) {
      return productExecute;
    }

    createProductDto.images.map(async (image, index) => {
      const productImage = new ProductImages({
        image,
        mediaType: 'img',
        productId: (await productExecute).identifiers[0].id,
      });
      await this.imagesRepository
        .createQueryBuilder()
        .insert()
        .into(ProductImages)
        .values(productImage)
        .execute();
    });

    return productExecute;
  }

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: number) {
    return this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndMapMany(
        'product.images',
        'product.images',
        'image',
        'image.productId = :productId',
        {
          productId: id,
        },
      )
      .where('product.id = :id', { id })
      .getOne();
  }

  async update(criteria: number | ProductDto, user: ProductDto) {
    await this.productRepository.update(criteria, user);
  }

  async delete(id: number) {
    await createQueryBuilder('product_images')
      .where('product_images.productId = :id', { id })
      .delete()
      .execute();

    return await this.productRepository.delete(id);
  }
}
