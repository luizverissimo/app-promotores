import React, { useEffect } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useAuth } from "../../contexts/auth";
import { LogoutAlert } from "../../utils/SystemMessages";

export default function Logout() {
  const navigation = useNavigation();

  const { signOut } = useAuth();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      LogoutAlert(
        () => signOut(),
        () => navigation.goBack()
      );
    });

    return unsubscribe;
  }, [navigation]);

  return <View />;
}
