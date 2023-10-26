import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import moment from "moment";
export default function ItemNotification({ title, id, sent_date }) {
  return (
    <View style={styles.item}>
      <View style={styles.titleView}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <View style={styles.dateView}>
        <Text style={styles.dateText}>
          Enviado em {moment(sent_date).format("DD/MM/YYYY")}
        </Text>
      </View>
    </View>
  );
}
