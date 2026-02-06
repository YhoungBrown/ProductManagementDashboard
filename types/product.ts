export interface Product {
  id: string
  name: string
  description: string
  imageUrl: string
  images?: string[]
  price: number
  category: string
  rating?: number
  inStock: boolean
}
