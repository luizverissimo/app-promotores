import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";

import styles from "./styles";

export default function Item({
  title,
  id,
  screen,
  screenRead,
  editable,
  readable,
  date,
  subtitle,
  secondTitle,
  verticalContent,
}) {
  const navigation = useNavigation();

  function handleEdit(id, screen) {
    navigation.navigate(screen, { id });
  }

  function handleRead(id, screen) {
    navigation.navigate(screenRead, { id });
  }

  return (
    <View style={styles.item}>
      <View style={styles.titleView}>
        <View style={[styles.title, (secondTitle || date) && { width: 100 }]}>
          <View style={styles.trace} />
          <Text style={styles.titleText}>{title}</Text>
        </View>
        {secondTitle && (
          <View style={styles.secondTitleView}>
            <Text style={styles.titleText}>{secondTitle}</Text>
          </View>
        )}
        {date && (
          <View style={styles.dateView}>
            <Text style={styles.titleText}>
              {moment(date).format("DD-MM-YYYY HH:mm")}
            </Text>
          </View>
        )}
        {editable && (
          <View style={styles.editButton}>
            <TouchableOpacity
              onPress={() => handleEdit(id, screen)}
              style={styles.editButtonPosicion}
            >
              <Text style={styles.editTextButton}>Editar</Text>
              <Feather name="edit" size={22} color="#696969" />
            </TouchableOpacity>
          </View>
        )}
        {readable && (
          <View style={styles.editButton}>
            <TouchableOpacity
              onPress={() => handleRead(id, screenRead)}
              style={styles.editButtonPosicion}
            >
              <Text style={styles.editTextButton}>Ver mais</Text>
              <Feather name="eye" size={22} color="#696969" />
            </TouchableOpacity>
          </View>
        )}
      </View>
      {verticalContent && (
        <View style={styles.subtitleView}>
          <View>
            <Text style={styles.subtitleText}>
              Marca:{" "}
              <Text style={{ fontWeight: "bold" }}>{verticalContent}</Text>
            </Text>
          </View>
          <View>
            <Text style={styles.subtitleText}>
              Equipamento:{" "}
              <Text style={{ fontWeight: "bold" }}>{subtitle}</Text>
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}
