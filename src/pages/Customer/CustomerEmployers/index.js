import React, { useState } from "react";
import Header from "../../../components/headers/Header";
import { View, Text, TouchableOpacity } from "react-native";
import SearchBar from "../../../components/search/SearchBar";

import mainStyle from "../../../../mainStyle";

import { useNavigation } from "@react-navigation/native";

export default function CustomersEmployers({ route }) {
  const navigation = useNavigation();
  const [iParent, setIParent] = useState(route.params.id);

  function navigateToNewCostumer() {
    navigation.navigate("NewCustomerEmployer", {
      id: iParent,
      returnScreen: "CustomerEmployers",
    });
  }

  return (
    <View style={mainStyle.container}>
      <Header name="Contatos" type="main" />
      <View style={mainStyle.content}>
        <SearchBar
          screen={"EditCustomerEmployer"}
          urlLastFive={`/customer-employers/${iParent}/lastFive`}
          urlSearch={`/customer-employers/${iParent}/search?`}
          editable={true}
        />
        <View style={mainStyle.insertView}>
          <Text style={mainStyle.insertText}>Novo Contato</Text>
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
