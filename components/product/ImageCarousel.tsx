import { FlatList, Image, View, useWindowDimensions } from 'react-native'
import { useState } from 'react'
import styles from '@/stylesheets/image-carousel-stylesheet'

interface Props {
  images: string[]
}

export default function ImageCarousel({ images }: Props) {
  const { width } = useWindowDimensions()
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <View>
      <FlatList
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => `${item}-${index}`}
        onScroll={e => {
          const index = Math.round(
            e.nativeEvent.contentOffset.x / width
          )
          setActiveIndex(index)
        }}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            style={[styles.image, { width }]}
            resizeMode="cover"
          />
        )}
      />

      <View style={styles.dots}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === activeIndex && styles.dotActive,
            ]}
          />
        ))}
      </View>
    </View>
  )
}
