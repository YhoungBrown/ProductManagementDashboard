import { ImageBackground, StyleSheet, Text, View, Animated } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import AppButton from '@/components/ui/AppButton'
import { WelcomeImageUrl } from '@/constants/app-constants'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useEffect, useRef } from 'react'
import { Easing } from 'react-native'


export default function Welcome() {
  const inset = useSafeAreaInsets()

  const translateY = useRef(new Animated.Value(-2500)).current
  const opacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 1200,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  return (
    <ImageBackground 
      source={{ uri: WelcomeImageUrl }} 
      style={styles.container}
    >
      <LinearGradient colors={['transparent', '#000']} style={styles.overlay} />

      <View style={[styles.content, { paddingBottom: inset.bottom }]}>
        <Animated.Text
          style={[
            styles.title,
            {
              transform: [{ translateY }],
              opacity,
            },
          ]}
        >
          Shop Smart
        </Animated.Text>

        <AppButton
          title="Get Started"
          icon="arrow-right"
          backgroundColor="green"
          color="#fff"
          onPress={() => router.replace('/(tabs)/home')}
        />
      </View>
    </ImageBackground>
  )
}


const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: { ...StyleSheet.absoluteFillObject },
  content: { marginTop: "auto", alignItems: "center", paddingHorizontal: "10%"},
  title: { color: '#fff', fontSize: 32, fontWeight: '700' , marginBottom: 30, textAlign: "center"},
})
