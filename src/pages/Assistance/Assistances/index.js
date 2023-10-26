import React from "react";

import { View, Text, TouchableOpacity } from "react-native";

import mainStyle from "../../../../mainStyle";
import styles from "./styles";
import SearchBar from "../../../components/search/SearchBar";
import { useAuth } from "../../../contexts/auth";

import { useNavigation } from "@react-navigation/native";

export default function Assitances() {
  const navigation = useNavigation();
  const { user } = useAuth();

  function navigateToNewAssistance() {
    navigation.navigate("NewAssistance", { returnScreen: "Assistances" });
  }

  return (
    <View style={mainStyle.containerDrawer}>
      <View style={styles.content}>
        <View style={styles.listView}>
          <View style={styles.searchView}>
            <Text style={styles.header}>Lista de assistências solicitadas</Text>
          </View>
          <SearchBar
            screen="EditAssistance"
            urlLastFive={`/assistances/${user.i_user}/lastFive`}
            urlSearch={`/assistances/${user.i_user}/search?`}
            placeholder="Cliente"
            editable={true}
            headers={["Cliente", "Assistências Técnicas"]}
          />
        </View>
        <View style={mainStyle.insertView}>
          <Text style={mainStyle.insertText}>Nova Assistência</Text>
          <TouchableOpacity
            style={mainStyle.insertButton}
            onPress={() => navigateToNewAssistance()}
          >
            <Text style={mainStyle.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
