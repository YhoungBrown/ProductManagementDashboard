import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 14,
    overflow: 'hidden',
    margin: 8,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  image: {
    width: '100%',
    aspectRatio: 1,
  },

  content: {
    padding: 12,
  },

  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#111',
  },

  description: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },

  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0A7D3B',
  },
})

export default styles
