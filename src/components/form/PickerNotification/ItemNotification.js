import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import styles from "./styles";

export default function ItemNotification({ days, selected, setDaysSelected }) {
  return (
    <View>
      {days === selected && (
        <View style={styles.itemSelected}>
          <Text style={styles.textSelected}>{days}</Text>
        </View>
      )}
      {days !== selected && (
        <TouchableOpacity
          onPress={() => setDaysSelected(days)}
          style={styles.editButtonPosicion}
        >
          <View style={styles.item}>
            <Text>{days}</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}
