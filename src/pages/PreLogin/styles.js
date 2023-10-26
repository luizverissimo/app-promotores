import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 80,
    backgroundColor: "#FFF",
  },

  header: {
    alignItems: "center",
    marginBottom: 30,
  },

  headerText: {
    alignItems: "center",
    marginTop: 60,
    marginBottom: 10,
  },

  action: {
    borderRadius: 8,
    marginBottom: 20,
    marginStart: 30,
    marginEnd: 30,
    padding: 10,
    alignItems: "center",
  },

  actionCreate: {
    backgroundColor: "#D3445B",
  },

  actionLogin: {
    backgroundColor: "#207869",
  },

  actionText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "bold",
  },
});
