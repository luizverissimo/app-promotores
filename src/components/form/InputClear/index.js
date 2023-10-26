import React, { useEffect, useState } from "react";

import { View, TouchableOpacity } from "react-native";

import { Feather } from "@expo/vector-icons";

import Input from "../Input";

import styles from "./styles";

function InputClear({ name, data, value, formRef, ...rest }) {
  const [colorClearButton, setColorClearButton] = useState("#B1B3B5");

  useEffect(() => {
    if (value != "") {
      setColorClearButton("#000");
    } else {
      setColorClearButton("#B1B3B5");
    }
  }, []);

  return (
    <View style={styles.inputView}>
      <View style={styles.input}>
        <Input
          name={name}
          onChange={(e) => {
            if (e.nativeEvent.text === "") {
              setColorClearButton("#B1B3B5");
            } else {
              setColorClearButton("#000");
            }
          }}
          {...rest}
        />
      </View>
      <View style={styles.button}>
        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => {
            formRef.current.setFieldValue(name, "");
            setColorClearButton("#B1B3B5");
          }}
        >
          <Feather name="x-circle" size={20} color={colorClearButton} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default InputClear;
