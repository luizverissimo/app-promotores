import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import styles from "./styles";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ItemListInput({
  title,
  id,
  setItemForPatern,
  handleItemSelected,
  screenEdit,
  editable,
  subtitle,
  verticalContent,
}) {
  const navigation = useNavigation();

  function handleEdit(id, title, screenEdit) {
    navigation.navigate(screenEdit, { id, title });
  }

  return (
    <TouchableOpacity
      onPress={() => {
        if (subtitle) {
          title = subtitle + " " + title;
        }
        if (setItemForPatern) {
          setItemForPatern(id, title);
        }
        handleItemSelected(id, title, true);
      }}
    >
      <View style={styles.item}>
        <View style={styles.titles}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
        {verticalContent && (
          <View style={styles.verticalContentView}>
            <Text style={styles.verticalContentText}>{verticalContent}</Text>
          </View>
        )}
        {editable && (
          <TouchableOpacity
            onPress={() => handleEdit(id, title, screenEdit)}
            style={styles.editButtonPosicion}
          >
            <Text style={styles.editTextButton}>Editar</Text>
            <Feather name="edit" size={22} color="#696969" />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}
