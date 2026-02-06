import styles from '@/stylesheets/ProductCard-stylesheet'
import { Product } from '@/types/product'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'


interface Props {
  product: Product
  onPress?: () => void
}

const ProductCard = ({ product, onPress }: Props) => {
  
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={{ uri: product.imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {product.name}
        </Text>

        <Text style={styles.description} numberOfLines={2}>
          {product.description}
        </Text>

        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default ProductCard


