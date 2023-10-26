import { StyleSheet } from "react-native";

import Constants from "expo-constants";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 20,
    backgroundColor: "#fff",
  },
  formText: {
    marginStart: 20,
    marginEnd: 20,
    fontSize: 16,
    marginTop: 10,
  },
  formTextBold: {
    fontWeight: "bold",
  },
});
