import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchProducts } from '@/services/api'
import { Product } from '@/types/product'


interface State {
  data: Product[]
  loading: boolean
  error?: string
}

const initialState: State = { data: [], loading: false }

export const loadProducts = createAsyncThunk(
  'products/load',
  fetchProducts
)

const slice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadProducts.pending, s => { s.loading = true })
      .addCase(loadProducts.fulfilled, (s, a) => {
        s.loading = false
        s.data = a.payload
      })
      .addCase(loadProducts.rejected, (s, a) => {
        s.loading = false
        s.error = a.error.message
      })
  },
})

export default slice.reducer
