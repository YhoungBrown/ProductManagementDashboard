import { StyleSheet } from "react-native";

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

export default style
