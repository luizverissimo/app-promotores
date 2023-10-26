import { StyleSheet } from "react-native";

import Constants from "expo-constants";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 20,
    backgroundColor: "#FFF",
  },

  header: {
    alignItems: "center",
    marginBottom: 30,
    paddingTop: 30,
  },

  footerActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginStart: 30,
    marginEnd: 30,
  },
  footerActionText: {
    color: "#2C88D9",
    fontSize: 16,
    fontWeight: "bold",
  },
  headerBackText: {
    color: "#696969",
    fontSize: 16,
  },
});
