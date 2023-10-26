import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

const AppStack = createStackNavigator();

import DrawerRouter from "./drawer.routes";
import NewCustomer from "../pages/Customer/NewCustomer";
import NewResale from "../pages/Resale/NewResale";
import EditCustomer from "../pages/Customer/EditCustomer";
import EditResale from "../pages/Resale/EditResale";
import CustomerEmployers from "../pages/Customer/CustomerEmployers";
import EditCustomerEmployer from "../pages/Customer/EditCustomerEmployer";
import NewCustomerEmployer from "../pages/Customer/NewCustomerEmployer";
import ResaleEmployers from "../pages/Resale/ResaleEmployers";
import EditResaleEmployer from "../pages/Resale/EditResaleEmployer";
import NewResaleEmployer from "../pages/Resale/NewResaleEmployer";
import NewEquipament from "../pages/Equipament/NewEquipament";
import EditEquipament from "../pages/Equipament/EditEquipament";
import EditBrand from "../pages/Equipament/EditBrand";
import EditModel from "../pages/Equipament/EditModel";
import NewBrand from "../pages/Equipament/NewBrand";
import NewModel from "../pages/Equipament/NewModel";
import NewAssistance from "../pages/Assistance/NewAssistance";
import EditAssistance from "../pages/Assistance/EditAssistance";
import EquipamentsCheckin from "../pages/Equipament/EquipamentsCheckin";
import ReadVisit from "../pages/ReadVisit";

export default function AppRoutes() {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="Home" component={DrawerRouter} />
      <AppStack.Screen name="NewCustomer" component={NewCustomer} />
      <AppStack.Screen name="NewResale" component={NewResale} />
      <AppStack.Screen name="EditCustomer" component={EditCustomer} />
      <AppStack.Screen name="EditResale" component={EditResale} />
      <AppStack.Screen name="CustomerEmployers" component={CustomerEmployers} />
      <AppStack.Screen
        name="EditCustomerEmployer"
        component={EditCustomerEmployer}
      />
      <AppStack.Screen
        name="NewCustomerEmployer"
        component={NewCustomerEmployer}
      />
      <AppStack.Screen name="ResaleEmployers" component={ResaleEmployers} />
      <AppStack.Screen
        name="EditResaleEmployer"
        component={EditResaleEmployer}
      />
      <AppStack.Screen name="NewResaleEmployer" component={NewResaleEmployer} />
      <AppStack.Screen name="NewEquipament" component={NewEquipament} />
      <AppStack.Screen name="EditEquipament" component={EditEquipament} />
      <AppStack.Screen name="EditBrand" component={EditBrand} />
      <AppStack.Screen name="EditModel" component={EditModel} />
      <AppStack.Screen name="NewBrand" component={NewBrand} />
      <AppStack.Screen name="NewModel" component={NewModel} />
      <AppStack.Screen name="NewAssistance" component={NewAssistance} />
      <AppStack.Screen name="EditAssistance" component={EditAssistance} />
      <AppStack.Screen
        name="EquipamentsCheckin"
        component={EquipamentsCheckin}
      />
      <AppStack.Screen name="ReadVisit" component={ReadVisit} />
    </AppStack.Navigator>
  );
}
