import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import SearchBar from "../../../components/search/SearchBar";
import { useNavigation } from "@react-navigation/native";

import mainStyle from "../../../../mainStyle";

export default function Customers() {
  const navigation = useNavigation();

  function navigateToNewCostumer() {
    navigation.navigate("NewCustomer", { returnScreen: "Customers" });
  }

  return (
    <View style={mainStyle.containerDrawer}>
      <View style={mainStyle.content}>
        <SearchBar
          screen="EditCustomer"
          urlLastFive="/customers/lastFive"
          urlSearch="/customers/search?"
          editable={true}
        />
        <View style={mainStyle.insertView}>
          <Text style={mainStyle.insertText}>Novo Cliente</Text>
          <TouchableOpacity
            style={mainStyle.insertButton}
            onPress={() => navigateToNewCostumer()}
          >
            <Text style={mainStyle.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
