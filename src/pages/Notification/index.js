import React, { useEffect, useState } from "react";

import { View, FlatList } from "react-native";
import api from "../../services/api";

import ItemNotification from "./ItemNotification";
import validationFunctions from "../../validation/ValidationFunctions";

import mainStyle from "../../../mainStyle";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../contexts/auth";

export default function Notification() {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);

  async function getNotifications() {
    api
      .get(`/notification/${user.i_user}/sent`)
      .then(async (response) => {
        const notifications = response.data;
        setNotifications(notifications);
      })
      .catch((error) => {
        validationFunctions.errorsResponseDefault(response);
      });
  }
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getNotifications();
    });

    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }) => (
    <ItemNotification
      title={item.description}
      id={item.id}
      sent_date={item.sent_date}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.notificationView}>
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={(item, index) => `list-item-${index}`}
        />
      </View>
    </View>
  );
}
