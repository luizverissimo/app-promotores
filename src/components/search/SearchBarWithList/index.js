import React, { useState, useEffect } from "react";
import { View, TextInput, Text, LogBox } from "react-native";
import { Feather } from "@expo/vector-icons";
import api from "../../../services/api";

import styles from "./style";
import ListInput from "../ListInput";
import { useNavigation } from "@react-navigation/native";
import mainStyle from "../../../../mainStyle";
import validationFunctions from "../../../validation/ValidationFunctions";

export default function SearchBarWithList({
  requestUrl,
  header,
  setItemForPatern,
  editable,
  screenEdit,
  screenCreate,
  buttonLabel,
  paramsCreate,
  textItemSelected,
  moreQueryParams,
  error,
}) {
  LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  LogBox.ignoreAllLogs();
  const navigation = useNavigation();

  const [data, setData] = useState({});
  const [searchText, setSearchText] = useState("");

  const [itemSelected, setItemSelected] = useState(false);
  const [listClose, setListClose] = useState(true);

  const handleItemSelected = (id, text, selected) => {
    if (text === searchText) setListClose(true);
    setItemSelected(selected);
    setSearchText(text);
  };

  useEffect(() => {
    if (textItemSelected && textItemSelected != "") {
      setSearchText(textItemSelected);
      setItemSelected(true);
    } else if (textItemSelected === "") {
      setSearchText(textItemSelected);
    }
  }, [textItemSelected]);

  const resetPatern = (text) => setItemForPatern(0, text);

  function handleOnChange(text) {
    setItemSelected(false);
    setSearchText(text);
    resetPatern(text);
  }

  function listByName() {
    api
      .get(`${requestUrl}name=${searchText}`)
      .then(async (response) => {
        setData(response.data);
      })
      .catch((error) => validationFunctions.errorsResponseDefault(error));
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (searchText !== "" && searchText && !itemSelected) {
        listByName();
      }
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (searchText !== "" || searchText || !itemSelected) {
      listByName();
    }

    setListClose(searchText === "" || !searchText || itemSelected);
  }, [searchText, error]);

  return (
    <View>
      <View style={header && styles.searchView}>
        {header && <Text style={styles.searchHeader}> {header}</Text>}
        <View style={styles.search}>
          <View style={styles.iconSearch}>
            <Feather name="search" size={20} color="#000" />
          </View>
          <View style={styles.textSearch}>
            <TextInput
              onChangeText={(text) => handleOnChange(text)}
              style={{ paddingLeft: 35, paddingTop: 4 }}
              value={searchText}
            />
          </View>
        </View>
      </View>
      {error && listClose && <Text style={styles.inputErrorText}>{error}</Text>}
      {listClose && <View></View>}
      {!listClose && (
        <ListInput
          header={header}
          data={data}
          setItemForPatern={setItemForPatern}
          handleItemSelected={handleItemSelected}
          editable={editable}
          screenEdit={screenEdit}
          screenCreate={screenCreate}
          paramsCreate={paramsCreate}
          buttonLabel={buttonLabel}
          textItemSelected={textItemSelected}
        />
      )}
    </View>
  );
}
