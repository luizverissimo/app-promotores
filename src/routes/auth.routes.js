import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

const AuthStack = createStackNavigator();

import PreLogin from "../pages/PreLogin";
import NewUser from "../pages/User/NewUser";
import Login from "../pages/Login";
import NewPassword from "../pages/NewPassword";

export default function AuthRoutes() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="PreLogin" component={PreLogin} />
      <AuthStack.Screen name="NewUser" component={NewUser} />
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="NewPassword" component={NewPassword} />
    </AuthStack.Navigator>
  );
}
