import React from "react";
import { ActivityIndicator, View } from "react-native";

interface LoaderProps {
  color?: string;
}
const Loader = ({ color }: LoaderProps) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color={color} />
    </View>
  );
};

export default Loader;
