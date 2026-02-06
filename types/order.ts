import { CartItem } from './cart'

export interface ShippingAddress {
  fullName: string
  phone: string
  addressLine1: string
  city: string
  state: string
  postalCode: string
}

export type OrderStatus = 'pending' | 'payment completed' | 'delivered'

export interface Order {
  id: string
  items: CartItem[]
  totalAmount: number
  status: OrderStatus
  shippingAddress: ShippingAddress
  createdAt: string
}
