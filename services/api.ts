import { mapProductApiToDomain } from './mappers/product-mapper'
import { ProductApiDto } from './dto/product-dto'
import { UserApiDto } from './dto/user-dto'
import { mapUserApiToDomain } from './mappers/user-mapper'

const BASE_URL = 'https://dummyjson.com'

export async function fetchProducts() {
  const res = await fetch(`${BASE_URL}/products`)
  if (!res.ok) throw new Error('Failed to fetch products')

  const json = await res.json()

  return json.products.map((p: ProductApiDto) =>
    mapProductApiToDomain(p)
  )
}


const USER_BASE_URL = 'https://jsonplaceholder.typicode.com'


export async function fetchUser() {
  const res = await fetch(`${USER_BASE_URL}/users`)
  if (!res.ok) throw new Error('Failed to fetch user')

  const json: UserApiDto[] = await res.json()

  if (!json.length) throw new Error('No users found')

  return mapUserApiToDomain(json[0])
}
