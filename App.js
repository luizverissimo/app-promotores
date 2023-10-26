import "intl";
import "intl/locale-data/jsonp/pt-BR";

import React from "react";
import Routes from "./src/routes/routes";

import { NavigationContainer } from "@react-navigation/native";

import { AuthProvider } from "./src/contexts/auth";
import { LogBox } from "react-native";

export default function App() {
  LogBox.ignoreLogs(["Require cycle"]);
  LogBox.ignoreAllLogs();
  return (
    <NavigationContainer>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}
