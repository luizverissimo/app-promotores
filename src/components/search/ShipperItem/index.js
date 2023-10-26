import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { Feather } from "@expo/vector-icons";
import styles from "./styles";

export default function ShipperItem({ id, title, handleItemDelete }) {
  return (
    <TouchableOpacity onPress={() => handleItemDelete(id)}>
      <View style={styles.item}>
        <Text>{title}</Text>

        <View style={styles.iconSearch}>
          <Feather name="x" size={18} color="#000" />
        </View>
      </View>
    </TouchableOpacity>
  );
}
