import { mapProductApiToDomain } from './mappers/product-mapper'
import { ProductApiDto } from './dto/product-dto'

const BASE_URL = 'https://dummyjson.com'

export async function fetchProducts() {
  const res = await fetch(`${BASE_URL}/products`)
  if (!res.ok) throw new Error('Failed to fetch products')

  const json = await res.json()

  return json.products.map((p: ProductApiDto) =>
    mapProductApiToDomain(p)
  )
}
