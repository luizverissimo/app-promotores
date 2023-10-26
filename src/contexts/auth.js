import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import auth from "../services/auth";
import api from "../services/api";
import getPushNotificationPermissions from "../services/notification";
import { Alert } from "react-native";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [locationAllowed, setLocationAllowed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const storagedUser = await AsyncStorage.getItem(
        "@InmesPromotorAuth:user"
      );
      const storagedToken = await AsyncStorage.getItem(
        "@InmesPromotorAuth:token"
      );

      const storagedLocationAllowed = await AsyncStorage.getItem(
        "@InmesPromotorAuth:locationAllowed"
      );

      const userLoaded = JSON.parse(storagedUser);
      if (storagedUser && storagedToken) {
        setUser(userLoaded);
      }
      if (storagedLocationAllowed) {
        setLocationAllowed(storagedLocationAllowed);
      }
      setLoading(false);

      api.defaults.headers.Authorization = storagedToken;
    }

    loadStorageData();
  }, []);

  async function signIn(data) {
    const response = await auth.signIn(data);

    setUser(response.user);
    api.defaults.headers.Authorization = response.token;

    if (!!response.user) {
      await AsyncStorage.setItem(
        "@InmesPromotorAuth:user",
        JSON.stringify(response.user)
      );
      await AsyncStorage.setItem("@InmesPromotorAuth:token", response.token);

      if (!response.user.expo_push_token)
        await getPushNotificationPermissions(response.user);

      Alert.alert(
        "Aviso!",
        "Você permite compartilhar a sua localização atual, para mostramos as suas visitas nessa localização? \n\nCaso você não permita esse acesso, o aplicativo usará ao invés da sua localização atual, a localização da Inmes para iniciar o mapa.",
        [
          {
            text: "Não permitir",
            onPress: async () => {
              setLocationAllowed(false);
              await AsyncStorage.setItem(
                "@InmesPromotorAuth:locationAllowed",
                "false"
              );
            },
          },
          {
            text: "Permitir",
            onPress: async () => {
              setLocationAllowed(true);
              await AsyncStorage.setItem(
                "@InmesPromotorAuth:locationAllowed",
                "true"
              );
            },
          },
        ]
      );
    }

    return response;
  }

  async function signOut() {
    await AsyncStorage.clear();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        loading,
        signIn,
        signOut,
        locationAllowed,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
}

export { AuthProvider, useAuth };
