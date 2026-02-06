export interface User {
  id: string
  fullName: string
  email: string
  phone: string
  address: {
    street: string
    suite: string
    city: string
    postalCode: string
  }
}
