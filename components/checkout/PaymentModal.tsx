import {
  Modal,
  View,
  TextInput,
  StyleSheet,
} from 'react-native'
import AppButton from '@/components/ui/AppButton'
import { Text } from 'react-native'

export default function PaymentModal({
  visible,
  onClose,
  onSuccess,
}: {
  visible: boolean
  onClose: () => void
  onSuccess: () => void
}) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.sheet}>

           <Text style={styles.label} >
            Card Number
           </Text>
          <TextInput
            placeholder="Input Card Number"
             placeholderTextColor={"#afadad"}
            keyboardType="numeric"
            style={styles.input}
          />

          <Text style={styles.label} >
            Expiry Date
           </Text>
           <View style={{flexDirection: "row"}}>
          <TextInput
            placeholder="Day"
             placeholderTextColor={"#afadad"}
            keyboardType="numeric"
            style={styles.input}
          />
          <Text style={{color: "#fff", fontSize: 25}}> / </Text>

          <TextInput
            placeholder="Month"
             placeholderTextColor={"#afadad"}
            keyboardType="numeric"
            style={styles.input}
          />
           </View>

          <View style={styles.row}>
  <View style={styles.half}>
    <Text style={styles.label}>CVV</Text>
    <TextInput
      placeholder="447"
      placeholderTextColor="#afadad"
      secureTextEntry
      keyboardType="numeric"
      style={styles.input}
    />
  </View>

  <View style={styles.half}>
    <Text style={styles.label}>Pin</Text>
    <TextInput
      placeholder="****"
      placeholderTextColor="#afadad"
      secureTextEntry
      keyboardType="numeric"
      style={styles.input}
    />
  </View>
</View>

          <View style= {{marginTop: 5}}/>

          <AppButton
            title="Make Payment"
            backgroundColor="green"
            color="#fff"
            onPress={() => {
              onClose()
              onSuccess()
            }}
          />

          <AppButton
            backgroundColor='red'
            title="Cancel" 
            color='#fff'
            onPress={onClose} 
            />
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#000',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    gap: 12,
  },
  input: {
    backgroundColor: '#111',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    color: '#fff',
    borderColor: "#fff",
  },
  label: {
    color: "#fff",
  },
  row: {
  flexDirection: 'row',
  gap: 12,
},
half: {
  flex: 1,
},

})
