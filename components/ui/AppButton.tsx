import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

interface AppButtonProps {
  title: string
  color?: string
  backgroundColor: string
  icon?: string
  onPress: () => void
}

const AppButton = (props: AppButtonProps) => {
  return (
    <TouchableOpacity 
        onPress={props.onPress} 
        style={[styles.button, {backgroundColor: props.backgroundColor}]}
    >

        <View style={styles.textIconContainer}>
            <Text style={{ color: props.color }}>{props.title}</Text>
            {props.icon && (
                <FontAwesome6 
                    name= {props.icon as any}
                    size={24} 
                    color={props.color || "black"} 
                />
            )}
        </View>
    </TouchableOpacity>
  )
}

export default AppButton


const styles = StyleSheet.create({
    button: {
        padding: 12, 
        borderRadius: 8, 
        alignItems: 'center', 
        justifyContent: 'center',
        width: "100%"
    },
    textIconContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center', 
        gap: 8
    },
})