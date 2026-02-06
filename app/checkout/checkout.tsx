import { View, StyleSheet, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import AppButton from '@/components/ui/AppButton'
import PaymentModal from '@/components/checkout/PaymentModal'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { placeOrder } from '@/store/slices/order-slice'
import { clearCart } from '@/store/slices/cart-slice'
import Toast from 'react-native-toast-message'
import { router, useNavigation } from 'expo-router'
import { nanoid } from '@reduxjs/toolkit'
import { OrderStatus } from '@/types/order'

export default function Checkout() {
  const inset = useSafeAreaInsets()
  const [showModal, setShowModal] = useState(false)
  const cartItems = useAppSelector(s => s.cart.items)
  const dispatch = useAppDispatch()
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
        headerShown: false
    })
  }, [])


   const { user } = useAppSelector(s => s.profile)


   console.log(user);

  const createOrder = (status: OrderStatus) => {
    if (!user) {
        router.replace('../(tabs)/home')
        return null
    }


    dispatch(
      placeOrder({
        id: nanoid(),
        items: cartItems,
        totalAmount: cartItems.reduce(
          (sum, i) => sum + i.price * i.quantity,
          0
        ),
        status,
        createdAt: new Date().toISOString(),
        shippingAddress: {
            fullName: user?.fullName,
            phone: user?.phone,
            addressLine1: user?.address.street,
            city: user?.address.city,
            state: user?.address.suite,
            postalCode: user?.address.postalCode

        }
      })
    )

    dispatch(clearCart())
    router.replace('../(tabs)/profile')
  }

  const handlePayment = () => {
    createOrder('payment completed')
    Toast.show({ 
        type: 'success', 
        text1: 'Payment Successful'
     })
  }

   const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <View style={[styles.container, { paddingBottom: inset.bottom, paddingTop: inset.top }]}>

        <View style={{justifyContent: "center", alignItems: "center"}}>
            <Text style={{
                fontWeight: "bold", 
                color: "#fff",
                fontSize: 18,
                }}
            >
                Summary
            </Text>
        </View>

        <View style={{justifyContent: "space-between", flexDirection: "row"}}>

            <Text style={{color: "white"}}>
                Total Product:
            </Text>

            <Text style={{color: "white"}}>${total}</Text>
        </View>

        <View style={{justifyContent: "space-between", flexDirection: "row"}}>
            <Text style={{color: "white"}}>
                Shipping fee:
            </Text>

            <Text style={{color: "white"}}>$15.00</Text>
        </View>

        <View style={{justifyContent: "space-between", flexDirection: "row"}}>
            <Text style={{color: "white"}}>
                Total Amount:
            </Text>

            <Text style={{color: "white"}}>${total + 15.00}</Text>
        </View>

        <View style={{marginVertical: 10}}> 
            <Text style={{
                fontWeight: "bold", 
                color: "#fff",
                fontSize: 18,
                marginVertical: 15,
                textAlign: "center"
                }}
            >
                Shipping details
            </Text>

            <Text style={{
                color: "#fff", 
                marginBottom: 10,
                fontWeight: "500",
                fontSize: 15
                }}
            >
                Name
            </Text>

            <View style= {{
                borderWidth: 1, 
                padding: 10, 
                borderColor: "#bbb", 
                marginBottom: 20,
                borderRadius: 8
            }}>
                <Text style={{color: "#fff"}}>
                    {user?.fullName}
                </Text>
            </View>


            <Text style={{
                color: "#fff", 
                marginBottom: 10,
                fontWeight: "500",
                fontSize: 15
                }}
            >
                Address
            </Text>

            <View style= {{
                borderWidth: 1, 
                padding: 10, 
                borderColor: "#bbb", 
               marginBottom: 20,
                borderRadius: 8
            }}>
                <Text style={{color: "#fff"}}>
                    {`${user?.address.suite}, ${user?.address.street}, ${user?.address.city}`}
                </Text>
            </View>


            <Text style={{
                color: "#fff", 
                marginBottom: 10,
                fontWeight: "500",
                fontSize: 15
                }}
            >
                Phone
            </Text>

            <View style= {{
                borderWidth: 1, 
                padding: 10, 
                borderColor: "#bbb", 
                marginBottom: 20,
                borderRadius: 8
            }}>
                <Text style={{color: "#fff"}}>
                    {user?.phone}
                </Text>
            </View>


            <Text style={{
                color: "#fff", 
                marginBottom: 10,
                fontWeight: "500",
                fontSize: 15
                }}
            >
                Email
            </Text>

            <View style= {{
                borderWidth: 1, 
                padding: 10, 
                borderColor: "#bbb",
                marginBottom: 20,
                borderRadius: 8
            }}>
                <Text style={{color: "#fff"}}>
                    {user?.email}
                </Text>
            </View>
        </View>

        <View style={{marginTop: "4%"}}/>

        {!showModal && (
      <View style={{justifyContent: "flex-end", gap: 15}}>
      <AppButton
        title="Make Payment"
        backgroundColor="green"
        color="#fff"
        onPress={() => setShowModal(true)}
      />

      <AppButton
        title="Pay Later"
        backgroundColor="#444"
        color="#fff"
        onPress={() => {
          createOrder('pending')
          Toast.show({ type: 'Error', text1: 'Order Pending. Awaiting Payment' })
        }}
      />
    </View>

        )}


      <PaymentModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={handlePayment}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    gap: 12,
    padding: 16,
  },
})
