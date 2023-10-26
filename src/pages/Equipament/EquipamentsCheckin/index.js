import React, { useEffect, useRef, useState } from "react";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import mainStyle from "../../../../mainStyle";
import SearchBarWithList from "../../../components/search/SearchBarWithList";

import styles from "./styles";
import Header from "../../../components/headers/Header";

export default function EquipamentsCheckin({ route }) {
  const navigation = useNavigation();

  const [idSelectedBrand, setIdSelectedBrand] = useState(0);
  const [idSelectedEquipament, setIdSelectedEquipament] = useState(0);
  const [titleSelectedBrand, setTitleSelectedBrand] = useState("");
  const [titleSelectedEquipament, setTitleSelectedEquipament] = useState("");
  const [idSelectedModel, setIdSelectedModel] = useState(0);
  const [titleSelectedModel, setTitleSelectedModel] = useState("");

  const [queryParams, setQueryParams] = useState("?");

  const { returnScreen, returnData, lastScreen } = !!route.params
    ? route.params
    : {};

  let { modified } = !!route.params ? route.params : {};

  const handleSetSelectedBrand = (id, title) => {
    setIdSelectedBrand(id);
    setTitleSelectedBrand(title);
  };

  const handleSetSelectedEquipament = (id, title) => {
    setIdSelectedEquipament(id);
    setTitleSelectedEquipament(title);
  };

  const handleSetSelectedModel = (id, title) => {
    setIdSelectedModel(id);
    setTitleSelectedModel(title);
  };

  useEffect(() => {
    if (idSelectedModel > 0) {
      navigation.navigate("Checkin", {
        name: titleSelectedEquipament + " " + titleSelectedModel,
        id: idSelectedModel,
        lastScreen,
      });
    }
  }, [idSelectedModel]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (!!returnData && modified) {
        switch (lastScreen) {
          case "ScreenBrand":
            handleSetSelectedBrand(returnData.id, returnData.title);
            setTitleSelectedBrand(returnData.title);
            break;
          case "ScreenEquipament":
            handleSetSelectedEquipament(returnData.id, returnData.title);
            setTitleSelectedEquipament(returnData.title);
            break;
          case "DeleteBrand":
            handleSetSelectedEquipament(returnData.id, returnData.title);
            setTitleSelectedEquipament(returnData.title);
            break;
        }
        modified = false;
      }
    });
    return unsubscribe;
  }, [navigation, returnData]);

  useEffect(() => {
    if (idSelectedBrand > 0 && idSelectedEquipament > 0) {
      setQueryParams(
        `?i_brand=${idSelectedBrand}&i_equipament=${idSelectedEquipament}&`
      );
    } else if (idSelectedBrand > 0) {
      setQueryParams(`?i_brand=${idSelectedBrand}&`);
    } else if (idSelectedEquipament > 0) {
      setQueryParams(`?i_equipament=${idSelectedEquipament}&`);
    } else {
      setQueryParams("?");
    }
  }, [idSelectedBrand, idSelectedEquipament]);

  return (
    <View style={mainStyle.container}>
      <Header name="Selecionar Equipamento" />
      <ScrollView style={styles.content}>
        <View style={styles.searchs}>
          <SearchBarWithList
            requestUrl="/brands/search?"
            header="Marcas"
            setItemForPatern={handleSetSelectedBrand}
            textItemSelected={titleSelectedBrand}
            editable={false}
            paramsCreate={{
              returnScreen: "EquipamentsCheckin",
              returnData: true,
              idParent: idSelectedBrand,
            }}
            screenEdit="EditBrand"
            screenCreate="NewBrand"
            buttonLabel="Criar Marca"
          />
        </View>

        <View style={styles.searchs}>
          <SearchBarWithList
            requestUrl={`/equipaments/search?`}
            header="Equipamentos"
            setItemForPatern={handleSetSelectedEquipament}
            textItemSelected={titleSelectedEquipament}
            paramsCreate={{
              returnScreen: "EquipamentsCheckin",
              returnData: true,
              idParent: idSelectedEquipament,
            }}
            editable={false}
            screenEdit="EditEquipament"
            screenCreate="NewEquipament"
            buttonLabel="Criar Equipamento"
          />
        </View>

        <View style={styles.searchs}>
          <SearchBarWithList
            requestUrl={`/models/search${queryParams}`}
            header="Modelos"
            setItemForPatern={handleSetSelectedModel}
            textItemSelected={titleSelectedModel}
            editable={false}
            screenCreate="NewModel"
            paramsCreate={{
              idBrand: idSelectedBrand,
              idEquipament: idSelectedEquipament,
              titleBrand: titleSelectedBrand,
              titleEquipament: titleSelectedEquipament,
              returnScreen: !!returnScreen
                ? returnScreen
                : "EquipamentsCheckin",
              returnData,
              lastScreen,
            }}
            buttonLabel="Criar Modelo"
          />
        </View>
      </ScrollView>
    </View>
  );
}
