import ProductCard from '@/components/product/ProductCard'
import ErrorState from '@/components/ui/ErrorState'
import Loader from '@/components/ui/loader'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { loadProducts } from '@/store/slices/products-slice'
import { useEffect, useMemo, useState } from 'react'
import {
  FlatList,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native'
import styles from '@/stylesheets/Homescreen-stylesheet'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { router } from 'expo-router'



export default function Home() {
  const inset = useSafeAreaInsets();
  const dispatch = useAppDispatch()
  const { data, loading, error } = useAppSelector(s => s.products)

  const [searchText, setSearchText] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
const [minPrice, setMinPrice] = useState<string>('')
const [maxPrice, setMaxPrice] = useState<string>('')



const categories = useMemo(() => {
  return Array.from(new Set(data.map(p => p.category)))
}, [data])



  const { width } = useWindowDimensions()
  const numColumns = width >= 768 ? 3 : 2

  useEffect(() => {

    dispatch(loadProducts())
  }, [dispatch])


  const filteredData = useMemo(() => {
  return data.filter(product => {
    const matchesSearch =
      !searchText.trim() ||
      product.name.toLowerCase().includes(searchText.toLowerCase()) ||
      product.description.toLowerCase().includes(searchText.toLowerCase())

    const matchesCategory =
      !selectedCategory || product.category === selectedCategory

    const matchesMinPrice =
      !minPrice || product.price >= Number(minPrice)

    const matchesMaxPrice =
      !maxPrice || product.price <= Number(maxPrice)

    return (
      matchesSearch &&
      matchesCategory &&
      matchesMinPrice &&
      matchesMaxPrice
    )
  })
}, [data, searchText, selectedCategory, minPrice, maxPrice])


  if (loading) return <Loader />
  if (error) return <ErrorState message={error} />

  return (
    <View style={[styles.container, {paddingTop: inset.top}]}>
      <TextInput
        placeholder="Search products"
        placeholderTextColor="#999"
        value={searchText}
        onChangeText={setSearchText}
        style={styles.searchInput}
        autoCorrect={false}
        clearButtonMode="while-editing"
      />
    

      <FlatList
        data={['All', ...categories]}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.categoryList}
        renderItem={({ item }) => {
          const isActive =
            item === 'All'
              ? !selectedCategory
              : selectedCategory === item

          return (
            <Text
              style={[
                styles.categoryChip,
                isActive && styles.categoryChipActive,
              ]}
              onPress={() =>
                setSelectedCategory(item === 'All' ? null : item)
             }
            >
              {item}
            </Text>
          )
        }}
      />



      <View style={styles.priceFilterContainer}>
        <TextInput
          placeholder="Min"
          keyboardType="numeric"
          value={minPrice}
          onChangeText={setMinPrice}
          style={styles.priceInput}
        />

        <TextInput
          placeholder="Max"
          keyboardType="numeric"
          value={maxPrice}
          onChangeText={setMaxPrice}
          style={styles.priceInput}
        />
      </View>


      {filteredData.length === 0 ? (
        <View style={styles.noProductsContainer}>
          <Text style={styles.noProductsText}>No products found.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredData}
          renderItem={({ item }) => 
            <ProductCard 
              product={item} 
              onPress={() => router.push({
                pathname: "/product/[id]",
                params: { id: item.id }, 
              })}
            />}
          keyExtractor={item => item.id}
          numColumns={numColumns}
          key={numColumns}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  )
}
