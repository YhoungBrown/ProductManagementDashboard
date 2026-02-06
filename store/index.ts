import { configureStore, combineReducers } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistReducer, persistStore } from 'redux-persist'

import productsReducer from './slices/products-slice'
import cartReducer from './slices/cart-slice'
import ordersReducer from './slices/order-slice'
import profileReducer from './slices/userProfile-slice'

const cartPersistConfig = {
  key: 'cart',
  storage: AsyncStorage,
}

const ordersPersistConfig = {
  key: 'orders',
  storage: AsyncStorage,
}

const rootReducer = combineReducers({
  products: productsReducer,
  cart: persistReducer(cartPersistConfig, cartReducer),
  orders: persistReducer(ordersPersistConfig, ordersReducer),
  profile: profileReducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
