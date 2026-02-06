import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartItem } from '@/types/cart'

interface CartState {
  items: CartItem[]
}

const initialState: CartState = { items: [] }

const slice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const item = state.items.find(i => i.id === action.payload.id)

      if (item) {
          item.quantity += action.payload.quantity
      } else {
        state.items.push(action.payload)
      }
    },

    updateQuantity(state, action: PayloadAction<{ id: string; qty: number }>) {
      const item = state.items.find(i => i.id === action.payload.id)
      if (item) item.quantity = action.payload.qty
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(i => i.id !== action.payload)
    },
    clearCart(state) {
      state.items = []
    },
  },
})

export const { addToCart, updateQuantity, removeFromCart, clearCart } =
  slice.actions

export default slice.reducer
