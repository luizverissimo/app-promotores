import { StyleSheet } from "react-native";

import Constants from "expo-constants";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 20,
    backgroundColor: "#fff",
  },

  containerDrawer: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  headerTitle: {
    marginBottom: 20,
  },

  headerTitleText: {
    fontSize: 25,
  },

  headerBackText: {
    color: "#696969",
    fontSize: 16,
    marginTop: 5,
  },

  formText: {
    marginStart: 40,
    fontSize: 18,
    marginTop: 10,
  },

  // formPickerView: {
  //   borderWidth: 2,
  //   borderColor: "#C5CED6",
  //   marginStart: 30,
  //   marginEnd: 30,
  //   marginTop: 20,
  // },

  // formPicker: { height: 40 },

  formTextInput: {
    borderWidth: 2,
    borderRadius: 5,
    marginStart: 30,
    marginEnd: 30,
    marginTop: 5,
    height: 40,
    paddingLeft: 10,
    borderColor: "#C5CED6",
  },

  actions: {
    justifyContent: "center",
    alignItems: "stretch",
    marginStart: 30,
    marginEnd: 30,
  },

  action: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 30,
    backgroundColor: "#207869",
    padding: 10,
    borderRadius: 10,
  },

  actionText: {
    color: "#fff",
  },

  inputErrorText: {
    color: "#f00",
    fontSize: 12,
    marginLeft: 35,
    marginTop: 5,
  },

  content: {
    flex: 1,
    justifyContent: "space-between",
  },

  inputSearch: {
    borderWidth: 2,
    borderRadius: 5,
    marginStart: 30,
    marginEnd: 30,
    marginTop: 5,
    height: 40,
    paddingLeft: 10,
    paddingRight: 20,

    borderColor: "#C5CED6",
  },

  searchBar: {
    flexDirection: "row",
  },

  imageSearch: {
    paddingLeft: 10,
  },

  insertView: {
    backgroundColor: "#DFE6ED",
    height: 80,
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "row",
  },

  insertText: {
    paddingRight: 20,
  },

  buttonText: {
    color: "#fff",
    fontSize: 30,
    paddingBottom: 5,
  },

  insertButton: {
    backgroundColor: "green",
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
