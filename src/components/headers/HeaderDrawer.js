import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import mainStyle from "../../../mainStyle";
import { Feather } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";

function HeaderDrawer({ name }) {
  const navigation = useNavigation();

  function openDrawerMenu() {
    navigation.openDrawer();
  }

  return (
    <View style={mainStyle.header}>
      <View style={mainStyle.headerBack}>
        <TouchableOpacity onPress={openDrawerMenu}>
          <Feather
            name="menu"
            size={30}
            color="#696969"
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>
      </View>
      <View style={mainStyle.headerTitle}>
        <Text style={mainStyle.headerTitleText}>{name}</Text>
      </View>
      <View />
    </View>
  );
}

export default HeaderDrawer;
