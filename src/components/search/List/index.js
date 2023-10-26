import React, { useState, useEffect } from "react";
import { SafeAreaView, FlatList, View, Text } from "react-native";

import styles from "./styles";
import Item from "../Item";

export default function List({
  data,
  screen,
  screenRead,
  editable,
  headers,
  readable,
}) {
  const renderItem = ({ item }) => (
    <Item
      title={item.title}
      name={item.name}
      id={item.id}
      date={item.date}
      secondTitle={item.secondTitle}
      subtitle={item.subtitle}
      verticalContent={item.verticalContent}
      screen={screen}
      screenRead={screenRead}
      editable={editable}
      readable={readable}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => `list-item-${index}`}
        editable={editable}
        readable={readable}
        ListHeaderComponent={
          headers && (
            <View style={styles.header}>
              {headers.map((header, i) => (
                <Text key={i} style={styles.textHeader}>
                  {header}
                </Text>
              ))}
            </View>
          )
        }
      />
    </SafeAreaView>
  );
}
