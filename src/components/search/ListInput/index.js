import React from "react";
import { View, FlatList, TouchableOpacity, Text } from "react-native";

import styles from "./styles";
import ItemListInput from "../ItemListInput";
import { useNavigation } from "@react-navigation/native";

export default function ListInput({
  data,
  setItemForPatern,
  handleItemSelected,
  editable,
  screenEdit,
  screenCreate,
  paramsCreate,
  buttonLabel,
}) {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <ItemListInput
      title={item.title}
      id={item.id}
      subtitle={item.subtitle}
      verticalContent={item.verticalContent}
      setItemForPatern={setItemForPatern}
      handleItemSelected={handleItemSelected}
      editable={editable}
      screenEdit={screenEdit}
    />
  );

  const FooterComponent = (screenCreate, paramsCreate) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(screenCreate, paramsCreate);
      }}
    >
      <View style={styles.item}>
        <View style={styles.actionSearch}>
          <Text>{buttonLabel}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.content}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => `list-item-${index}`}
        ListFooterComponent={
          screenCreate && FooterComponent(screenCreate, paramsCreate)
        }
      />
    </View>
  );
}
