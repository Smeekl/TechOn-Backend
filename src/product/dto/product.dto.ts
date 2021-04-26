export class CreateProductDto {
  title: string;
  short_title: string;
  description: string;
  price: number;
  viewed: number;
  reviews: number;
  purchasesNumber: number;
  quantityOnStock: number;
  image: string;
  images?: string[];
}

export class ProductDto {
  title?: string;
  short_title?: string;
  description?: string;
  price?: number;
  viewed?: number;
  reviews?: number;
  purchasesNumber?: number;
  quantityOnStock?: number;
}
