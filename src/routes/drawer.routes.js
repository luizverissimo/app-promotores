import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Settings from "../pages/User/Settings";
import Home from "../pages/Home";
import Checkin from "../pages/Checkin";
import Customers from "../pages/Customer/Customers";
import Resales from "../pages/Resale/Resales";
import Equipaments from "../pages/Equipament/Equipaments";
import Assistances from "../pages/Assistance/Assistances";
import Visits from "../pages/Visits";
import Notification from "../pages/Notification";
import ReportErrors from "../pages/ReportErrors";
import Logout from "../pages/Logout";

export default function Routes() {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        options={{ title: "Visitas", headerShown: true }}
        component={Home}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{ title: "Minha Conta", headerShown: true }}
      />
      <Drawer.Screen
        name="Visits"
        component={Visits}
        options={{ title: "Minhas Visitas", headerShown: true }}
      />
      <Drawer.Screen
        name="Checkin"
        component={Checkin}
        options={{ title: "Registrar Visitas", headerShown: true }}
      />
      <Drawer.Screen
        name="Customers"
        component={Customers}
        options={{ title: "Clientes", headerShown: true }}
      />
      <Drawer.Screen
        name="Resales"
        component={Resales}
        options={{ title: "Revendas", headerShown: true }}
      />
      <Drawer.Screen
        name="Equipaments"
        component={Equipaments}
        options={{ title: "Equipamentos", headerShown: true }}
      />
      <Drawer.Screen
        name="Assistances"
        component={Assistances}
        options={{ title: "Assistência Técnica", headerShown: true }}
      />
      <Drawer.Screen
        name="Notification"
        component={Notification}
        options={{ title: "Notificações", headerShown: true }}
      />
      <Drawer.Screen
        name="ReportErrors"
        component={ReportErrors}
        options={{ title: "Reportar Erros e Sugestões", headerShown: true }}
      />
      <Drawer.Screen name="Sair" component={Logout} />
    </Drawer.Navigator>
  );
}
