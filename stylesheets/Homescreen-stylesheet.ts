import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  searchInput: {
    margin: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
    fontSize: 16,
  },

  listContent: {
    paddingHorizontal: 4,
  },

  noProductsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  noProductsText: {
    fontSize: 16,
    color: '#777',
  },

  categoryList: {
  paddingHorizontal: 12,
  paddingBottom: 8,
},


categoryChip: {
  paddingHorizontal: 14,
  height: 25,
  borderRadius: 16,
  backgroundColor: '#eee',
  marginRight: 10,
  marginBottom: 10,
  fontSize: 13,
  color: '#333',
  textAlignVertical: 'center', 
  includeFontPadding: false,   
},

categoryChipActive: {
  backgroundColor: '#0A7D3B',
  color: '#fff',
},

priceFilterContainer: {
  flexDirection: 'row',
  paddingHorizontal: 12,
  marginBottom: 8,
},

priceInput: {
  flex: 1,
  marginRight: 8,
  paddingHorizontal: 12,
  paddingVertical: 8,
  borderRadius: 8,
  backgroundColor: '#f2f2f2',
  fontSize: 14,
},

})

export default styles
