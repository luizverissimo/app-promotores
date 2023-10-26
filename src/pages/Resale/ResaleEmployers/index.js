import React, { useState } from "react";
import Header from "../../../components/headers/Header";
import { View, Text, TouchableOpacity } from "react-native";
import SearchBar from "../../../components/search/SearchBar";

import mainStyle from "../../../../mainStyle";

import { useNavigation } from "@react-navigation/native";

export default function ResaleEmployers({ route }) {
  const navigation = useNavigation();
  const [iParent, setIParent] = useState(route.params.id);

  function navigateToNewResaleEmployer() {
    navigation.navigate("NewResaleEmployer", {
      id: iParent,
      returnScreen: "ResaleEmployers",
    });
  }
  return (
    <View style={mainStyle.container}>
      <Header name="Funcionários da Revenda" type="main" />
      <View style={mainStyle.content}>
        <SearchBar
          screen={"EditResaleEmployer"}
          urlLastFive={`/resale-employers/${iParent}/lastFive`}
          urlSearch={`/resale-employers/${iParent}/search?`}
          editable={true}
        />
        <View style={mainStyle.insertView}>
          <Text style={mainStyle.insertText}>Nova Funcionário</Text>
          <TouchableOpacity
            style={mainStyle.insertButton}
            onPress={() => navigateToNewResaleEmployer()}
          >
            <Text style={mainStyle.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
