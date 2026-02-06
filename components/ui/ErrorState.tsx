import { View, Text } from 'react-native'
import React from 'react'

const ErrorState = ({ message }: { message: string }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: 'red' }}>{message}</Text>
    </View>
  )
}

export default ErrorState