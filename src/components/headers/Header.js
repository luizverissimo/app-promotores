import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import mainStyle from "../../../mainStyle";
import { Feather } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";

function Header({ name }) {
  const navigation = useNavigation();

  function navigateBack() {
    navigation.goBack();
  }

  return (
    <View style={mainStyle.header}>
      <View style={mainStyle.headerBack}>
        <TouchableOpacity onPress={navigateBack}>
          <Text style={mainStyle.headerBackText}>
            <Feather name="arrow-left" size={18} color="#696969" /> Voltar
          </Text>
        </TouchableOpacity>
      </View>
      <View style={mainStyle.headerTitle}>
        <Text style={mainStyle.headerTitleText}>{name}</Text>
      </View>
      <View />
    </View>
  );
}

export default Header;
