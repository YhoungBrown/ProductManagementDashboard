import React from 'react'
import { View, Text, StyleSheet, FlatList, Pressable, TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useAppSelector } from '@/store/hooks'
import Toast from 'react-native-toast-message'
import styles from '@/stylesheets/profile-stylesheet'

export default function Profile() {
  const inset = useSafeAreaInsets()
  const orders = useAppSelector(s => s.orders.list)
  const user = useAppSelector(s => s.profile.user)

  const handleOrderPress = (status: string) => {
    if (status === 'payment completed') {
      Toast.show({
        type: 'success',
        text1: 'Payment Recived',
        text2: 'Order is completed',
      })
    } else {
      Toast.show({
        type: 'error',
        text1: 'Order Pending',
        text2: 'You are yet to make payment for this order',
      })
    }
  }

  return (
    <View style={[styles.container, { paddingTop: inset.top }]}>
      
      <View style={styles.header}>
        <Ionicons name="person-circle-outline" size={110} color="#888" />
        <Text style={styles.name}>{user?.fullName ?? 'Guest User'}</Text>
      </View>

      
      <View style={styles.ordersSection}>
        <Text style={styles.sectionTitle}>Orders</Text>

        {orders.length === 0 ? (
          <Text style={styles.emptyText}>No orders yet</Text>
        ) : (
          <FlatList
            data={orders}
            keyExtractor={item => item.id}
            contentContainerStyle={{ gap: 12 }}
            renderItem={({ item }) => {
              const isCompleted = item.status === 'payment completed'

              return (
                <TouchableOpacity
                  onPress={() => handleOrderPress(item.status)}
                  style={[
                    styles.orderItem,
                    {
                      borderColor: isCompleted ? 'green' : '#facc15',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.orderText,
                      { color: isCompleted ? 'green' : '#facc15' },
                    ]}
                  >
                    Order ID: {item.id}
                  </Text>

                  <Text
                    style={[
                      styles.orderText,
                      { color: isCompleted ? 'green' : '#facc15' },
                    ]}
                  >
                    Created: {new Date(item.createdAt).toLocaleDateString()}
                  </Text>
                </TouchableOpacity>
              )
            }}
          />
        )}
      </View>
    </View>
  )
}
