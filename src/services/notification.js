import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import api from "./api";
import validationFunctions from "../validation/ValidationFunctions";

async function registerForPushNotificationsAsync() {
  let token;

  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    alert("Failed to get push token for push notification!");
    return;
  }
  token = (await Notifications.getExpoPushTokenAsync()).data;

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

const getPushNotificationPermissions = async (user) => {
  if (Constants.isDevice) {
    await registerForPushNotificationsAsync().then(async (token) => {
      await AsyncStorage.setItem("@InmesPromotorAuth:expo_push_token", token);
      await api
        .post(`/register-device`, {
          i_user: user.i_user,
          expo_push_token: token,
        })
        .then((response) => {})
        .catch((error) => {
          validationFunctions.errorsResponseDefault(error);
        });
    });
  } else {
    alert("Must use physical device for Push Notifications");
  }
};

export default getPushNotificationPermissions;
