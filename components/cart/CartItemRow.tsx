import { useAppDispatch } from "@/store/hooks";
import { removeFromCart, updateQuantity } from "@/store/slices/cart-slice";
import { CartItem } from "@/types/cart";
import Entypo from "@expo/vector-icons/Entypo";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CartItemRow({ item }: { item: CartItem }) {
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.innercontainer}>
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.image}
          resizeMode="contain"
        />

        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={2}>
            {item.name}
          </Text>

          <Text style={styles.price}>${item.price.toFixed(2)}</Text>

          <Text style={styles.price}>qty: {item.quantity}</Text>
        </View>

        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.plus}
            onPress={() =>
              dispatch(updateQuantity({ id: item.id, qty: item.quantity + 1 }))
            }
          >
            <Entypo name="plus" size={20} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.minus}
            onPress={() =>
              item.quantity === 1
                ? dispatch(removeFromCart(item.id))
                : dispatch(
                    updateQuantity({ id: item.id, qty: item.quantity - 1 }),
                  )
            }
          >
            <Entypo name="minus" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#111",
    borderColor: "#bbb",
    borderWidth: 1,
    marginBottom: 12,
    alignItems: "center",
  },
  innercontainer: { 
    flex: 1, 
    flexDirection: "row", 
    flexShrink: 1, 
    gap: 5 
},
  name: {
    color: "#fff",
    fontWeight: "600",
    flexShrink: 1,
  },
  price: {
    color: "#aaa",
    marginTop: 4,
  },
  controls: {
    marginLeft: "auto",
    gap: 16,
  },
  image: {
    width: 75,
    height: 75,
  },
  info: {
    flex: 1,
    flexShrink: 1,
  },
  plus: {
    padding: 5,
    backgroundColor: "green",
    borderRadius: 6,
  },
  minus: {
    padding: 5,
    backgroundColor: "red",
    borderRadius: 6,
  },
});
