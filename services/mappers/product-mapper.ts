import { Product } from '@/types/product'
import { ProductApiDto } from '../dto/product-dto'

export function mapProductApiToDomain(apiProduct: ProductApiDto): Product {
  return {
    id: String(apiProduct.id),
    name: apiProduct.title,
    description: apiProduct.description,
    imageUrl: apiProduct.thumbnail || apiProduct.images[0],
    images: apiProduct.images,
    price: apiProduct.price,
    category: apiProduct.category,
    rating: apiProduct.rating,
    inStock: apiProduct.stock > 0,
  }
}
