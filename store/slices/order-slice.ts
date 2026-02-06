import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Order, OrderStatus } from '@/types/order'

interface OrdersState {
  list: Order[]
}

const initialState: OrdersState = {
  list: [],
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    placeOrder(state, action: PayloadAction<Order>) {
      state.list.unshift(action.payload)
    },

    clearOrders(state) {
      state.list = []
    },

    updateOrderStatus(
      state,
      action: PayloadAction<{ orderId: string; status: OrderStatus }>
    ) {
      const order = state.list.find(o => o.id === action.payload.orderId)
      if (order) {
        order.status = action.payload.status
      }
    },
  },
})

export const {
  placeOrder,
  clearOrders,
  updateOrderStatus,
} = ordersSlice.actions

export default ordersSlice.reducer
