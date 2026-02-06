import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import AppButton from '@/components/ui/AppButton'
import CartItemRow from '@/components/cart/CartItemRow'
import { router } from 'expo-router'
import Toast from 'react-native-toast-message'

export default function CartScreen() {
  const inset = useSafeAreaInsets()
  const cartItems = useAppSelector(state => state.cart.items)

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const handleCheckout = () => {
    if(cartItems.length === 0) 
    {
       Toast.show({
            type: 'error',
            text1: "Cart Empty",
            text2: "Your cart is empty",
        });

        return
    }

    router.push('../checkout/checkout')
  }

  return (
    <View style={[styles.container, { paddingTop: inset.top }]}>
      {cartItems.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Your cart is empty</Text>
        </View>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <CartItemRow item={item} />}
          contentContainerStyle={styles.list}
        />
      )}
    
    {cartItems.length > 0 && (
        <View style={[
            styles.footer, 
            { paddingBottom: inset.bottom }
            ]}
        >
            <View style={styles.innerfooter}>
                 <Text style={styles.total}>Total:</Text>
                <Text style={styles.total}> ${total.toFixed(2)}</Text>
            </View>
  
          <AppButton
            title="Continue"
            backgroundColor="green"
            color="#fff"
            onPress={handleCheckout}
          />
        </View>
    )}

    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: 16 },
  footer: {
    borderTopWidth: 0.5,
    borderColor: '#eee',
    padding: 16,
    backgroundColor: '#111',
  },
  innerfooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10
  },
  total: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: '#777', fontSize: 16 },
})
