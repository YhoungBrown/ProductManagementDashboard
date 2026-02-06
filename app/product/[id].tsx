import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { router, useLocalSearchParams, useNavigation } from 'expo-router'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import ImageCarousel from '@/components/product/ImageCarousel'
import { useLayoutEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import AppButton from '@/components/ui/AppButton'
import { addToCart } from '@/store/slices/cart-slice'
import Entypo from '@expo/vector-icons/Entypo';
import Toast from 'react-native-toast-message'

export default function ProductDetail() {
  const [quantity, setQuantity] = useState<number>(0);

  const dispatch = useAppDispatch();

    const inset = useSafeAreaInsets();

  const { id } = useLocalSearchParams<{ id: string }>()
  const product = useAppSelector(state =>
    state.products.data.find(p => p.id === id)
  )

  if (!product) return null


  const handleAddToCart = () => {
    if (quantity <= 0 ) {
      Toast.show({
        type: 'error',
        text1: "Quantity Error",
        text2: "You've not chosen the desired quantity you'll like to purchase",
      });
      return
    }
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        description: product.description,
        imageUrl: product.imageUrl,
        images: product.images,
        price: product.price,
        category: product.category,
        rating: product.rating,
        inStock: product.inStock,
        quantity: quantity
      })
    )

    Toast.show({
      type: 'success',
      text1: "Added to cart",
      text2: "product added to cart successfully",
    });

    setTimeout(() => {
      router.back()
    }, 1500)

  }

  const handleDecreaseQuantity = () => {
    setQuantity(quantity - 1)
  }

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const disableQuantityDecreaseControl = quantity <= 0


  const navigation = useNavigation();
  
   useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [navigation])

  return (
    <ScrollView style={{paddingTop: inset.top}}>
      {product.images && product.images.length > 0 && (
        <ImageCarousel images={product.images} />
      )}

      <View style={style.contentContainer}>
        <Text style={style.productName}>
          {product.name}
        </Text>

        <Text style={style.productPrice}>
          ${product.price.toFixed(2)}
        </Text>

        <View 
          style={style.quantitysection}
        >
          <TouchableOpacity 
          disabled={disableQuantityDecreaseControl}
          onPress={handleDecreaseQuantity}
          style={style.quantityDecrease}>
              <Entypo 
                name="minus" 
                size={24} 
                color="white" 
              />
          </TouchableOpacity>

          <View style={style.quantity}>
            <Text style={style.quantityText}>       
                {quantity}
            </Text>
          </View>

          <TouchableOpacity 
          onPress={handleIncreaseQuantity}
          style={style.quantityIncrease}>
             <Entypo 
              name="plus" 
              size={24} 
              color="white" 
            />
          </TouchableOpacity>
        </View>

        <Text style={style.productDescription}>
          {product.description}
        </Text>
      </View>

      <View style={{marginBottom: 75}}/>

      <AppButton 
        title='Add to cart'
        color='#fff'
        backgroundColor='green'
        icon="cart-shopping"
        onPress={handleAddToCart}
      />

    </ScrollView>
  )
}


const style = StyleSheet.create({
    contentContainer: {
        padding: 16 
    },
    productName: {
        color: "#fff",
        fontSize: 22, 
        fontWeight: '700'
    },
    productPrice: {
        color: "#fff",
        marginVertical: 8, 
        fontSize: 16 
    },
    productDescription: {
        color: '#666' 
    },
    quantitysection: {
      justifyContent: "flex-start", 
      flexDirection: "row", 
      marginBottom: 10
    },
    quantityDecrease:{
      borderWidth: 1, 
      borderTopLeftRadius: 8, borderBottomLeftRadius: 8, 
      borderColor: "#bbb"
    },
    quantity: {
      borderWidth: 1,  
      borderColor: "#bbb", 
      padding: 5, 
      marginHorizontal: 3
    },
    quantityText: {
      color: "white"
    },
    quantityIncrease: {
      borderWidth: 1, 
      borderTopRightRadius: 8, borderBottomRightRadius: 8, 
      borderColor: "#bbb"
    },
})
