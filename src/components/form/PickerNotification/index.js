import React from "react";
import { View, FlatList } from "react-native";
import styles from "./styles";
import ItemNotification from "./ItemNotification";

export default function PickerNotification({
  data,
  selected,
  setDaysSelected,
}) {
  const renderItem = ({ item }) => (
    <ItemNotification
      days={item.days}
      selected={selected}
      setDaysSelected={setDaysSelected}
    />
  );
  return (
    <View style={styles.content}>
      <FlatList
        data={data}
        selected={selected}
        setDaysSelected={setDaysSelected}
        renderItem={renderItem}
        horizontal={true}
        keyExtractor={(item, index) => `list-item-${index}`}
      />
    </View>
  );
}
