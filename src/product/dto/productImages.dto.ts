export class CreateProductImagesDto {
  image: string;
  mediaType: 'img' | 'video';
  productId: number;
}
