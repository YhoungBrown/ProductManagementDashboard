import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  image: {
    height: 320,
  },

  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },

  dotActive: {
    backgroundColor: '#0A7D3B',
  },
})

export default styles
