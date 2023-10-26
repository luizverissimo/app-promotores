import React, { useState, useEffect } from "react";
import { ActivityIndicator, TextInput, View } from "react-native";
import { Feather } from "@expo/vector-icons";

import List from "../List";
import styles from "./styles";
import api from "../../../services/api";

import { useNavigation } from "@react-navigation/native";
import validationFunctions from "../../../validation/ValidationFunctions";

export default function SearchBar({
  urlLastFive,
  urlSearch,
  screen,
  editable,
  headers,
  placeholder,
}) {
  const [data, setData] = useState([]);

  const navigation = useNavigation();
  const [initLoading, setInitLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  function getLastFive() {
    api
      .get(urlLastFive)
      .then(async (response) => {
        setInitLoading(false);
        setData(response.data);
      })
      .catch((error) => {
        setInitLoading(false);
        validationFunctions.errorsResponseDefault(error);
      });
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      setInitLoading(true);
      if (searchText === "") {
        await getLastFive();
      } else if (searchText !== "") {
        await api
          .get(`${urlSearch}name=${searchText}`)
          .then(async (response) => {
            setInitLoading(false);
            setData(response.data);
          })
          .catch((error) => {
            setInitLoading(false);
            validationFunctions.errorsResponseDefault(error);
          });
      }
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if ((searchText && searchText != "") || urlSearch.includes("&")) {
      api.get(`${urlSearch}name=${searchText}`).then(async (response) => {
        setData(response.data);
      });
    } else if (searchText === "") {
      getLastFive();
    }
  }, [searchText, urlSearch]);

  if (initLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#666" />
      </View>
    );
  }

  return (
    <View>
      <View style={styles.search}>
        <View style={styles.iconSearch}>
          <Feather name="search" size={20} color="#000" />
        </View>
        <View style={styles.textSearch}>
          <TextInput
            placeholder={placeholder}
            onChangeText={(text) => setSearchText(text)}
            style={{ paddingLeft: 35, paddingTop: 4 }}
          />
        </View>
      </View>
      <View style={styles.list}>
        <List
          data={data}
          screen={screen}
          editable={editable}
          headers={headers}
        />
      </View>
    </View>
  );
}
