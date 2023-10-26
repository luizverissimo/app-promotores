import React, { useState, useEffect } from "react";
import { View, TextInput, Text, LogBox, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";

import api from "../../../services/api";

import styles from "./styles";
import ListInput from "../ListInput";
import { useNavigation } from "@react-navigation/native";
import ShipperList from "../ShipperList";
import { genericAlert } from "../../../utils/SystemMessages";
import validationFunctions from "../../../validation/ValidationFunctions";

export default function SearchBarWithshipper({
  requestUrl,
  entitySelected,
  header,
  editable,
  screenEdit,
  screenCreate,
  buttonLabel,
  paramsCreate,
  value,
  dataPeding,
  messagePending,
}) {
  LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  LogBox.ignoreAllLogs();
  const navigation = useNavigation();

  const [data, setData] = useState({});
  const [searchText, setSearchText] = useState("");
  const [searchList, setSearchList] = useState(<View></View>);
  const [itemSelected, setItemSelected] = useState(false);
  const [shipper, setShipper] = useState(<View></View>);
  const [dataShipper, setDataShipper] = useState([]);

  const handleItemSelected = (id, text) => {
    const elemetSelected = dataShipper.filter((element) => element.id === id);

    if (Object.keys(elemetSelected).length === 0) {
      setDataShipper([...dataShipper, { id, title: text }]);
      setSearchText("");
      entitySelected([...dataShipper, { id, title: text }]);
    }
  };

  const handleItemDelete = (id) => {
    const elements = dataShipper.filter((element) => element.id != id);

    setDataShipper(elements);
    setSearchText("");
    entitySelected(elements);
  };

  useEffect(() => {
    setDataShipper(value);
  }, [value]);

  function handleOnChange(text) {
    setItemSelected(false);
    setSearchText(text);
  }

  function listByName() {
    if (requestUrl != "") {
      api
        .get(`${requestUrl}name=${searchText}`)
        .then(async (response) => {
          setData(response.data);
        })
        .catch((error) => validationFunctions.errorsResponseDefault(error));
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setData([]);
      setSearchText("");
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (searchText === "" || !searchText || itemSelected) {
      setSearchList(<View></View>);
    } else {
      listByName();
    }
  }, [searchText]);

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      setSearchList(
        <ListInput
          header={header}
          data={data}
          handleItemSelected={handleItemSelected}
          editable={editable}
          screenEdit={screenEdit}
          screenCreate={screenCreate}
          paramsCreate={paramsCreate}
          buttonLabel={buttonLabel}
        />
      );
    } else {
      if (searchText != "") {
        setSearchList(
          <ListInput
            header={header}
            data={[]}
            handleItemSelected={handleItemSelected}
            editable={editable}
            screenEdit={screenEdit}
            screenCreate={screenCreate}
            paramsCreate={paramsCreate}
            buttonLabel={buttonLabel}
          />
        );
      } else {
        setSearchList(<View></View>);
      }
    }
  }, [data]);

  useEffect(() => {
    setShipper(
      <ShipperList
        horizontal={true}
        handleItemDelete={handleItemDelete}
        data={dataShipper}
      />
    );
  }, [dataShipper]);
  return (
    <View>
      <View style={styles.searchView}>
        <Text style={styles.searchHeader}> {header}</Text>
        <View style={styles.search}>
          <View style={styles.iconSearch}>
            <Feather name="search" size={20} color="#000" />
          </View>
          <View style={styles.textSearch}>
            <TextInput
              value={searchText}
              onChangeText={(text) => {
                if (dataPeding) {
                  genericAlert("Aviso", messagePending);
                  handleOnChange("");
                } else {
                  handleOnChange(text);
                }
              }}
              style={{ paddingLeft: 35, paddingTop: 4 }}
            />
          </View>
        </View>
      </View>
      {searchList}
      {shipper}
    </View>
  );
}
