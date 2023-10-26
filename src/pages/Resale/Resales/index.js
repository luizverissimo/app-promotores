import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SearchBar from "../../../components/search/SearchBar";

import mainStyle from "../../../../mainStyle";

export default function Resales() {
  const navigation = useNavigation();

  function navigateToNewResale() {
    navigation.navigate("NewResale", { returnScreen: "Resales" });
  }

  return (
    <View style={mainStyle.containerDrawer}>
      <View style={mainStyle.content}>
        <SearchBar
          screen="EditResale"
          urlLastFive="/resales/lastFive"
          urlSearch="/resales/search?"
          editable={true}
        />
        <View style={mainStyle.insertView}>
          <Text style={mainStyle.insertText}>Nova Revenda</Text>
          <TouchableOpacity
            style={mainStyle.insertButton}
            onPress={() => navigateToNewResale()}
          >
            <Text style={mainStyle.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
