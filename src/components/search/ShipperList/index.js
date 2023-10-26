import React from "react";
import { View, Text, FlatList, ScrollView } from "react-native";

import styles from "./styles";
import ShipperItem from "../ShipperItem";

export default function ShipperList({ data, handleItemDelete, ...rest }) {
  const renderItem = ({ item }) => (
    <ShipperItem
      title={item.title}
      id={item.id}
      handleItemDelete={handleItemDelete}
    />
  );
  return (
    <ScrollView style={styles.content} showsHorizontalScrollIndicator={false}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => `list-item-${index}`}
        handleItemDelete={handleItemDelete}
        {...rest}
      />
    </ScrollView>
  );
}
