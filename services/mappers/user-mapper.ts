import { UserApiDto } from '../dto/user-dto'
import { User } from '@/types/user'

export function mapUserApiToDomain(dto: UserApiDto): User {
  return {
    id: String(dto.id),
    fullName: dto.name,
    email: dto.email,
    phone: dto.phone,
    address: {
      street: dto.address.street,
      suite: dto.address.suite,
      city: dto.address.city,
      postalCode: dto.address.zipcode,
    },
  }
}
