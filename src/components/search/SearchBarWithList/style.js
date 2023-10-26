import { StyleSheet } from "react-native";

export default StyleSheet.create({
  content: {
    flex: 1,
    marginStart: 30,
    marginEnd: 30,
  },
  searchView: {
    marginTop: 10,
    alignItems: "center",
  },
  searchHeader: {
    fontSize: 25,
  },
  search: {
    flexDirection: "row",
    marginTop: 10,
  },
  iconSearch: {
    width: 20,
    height: 20,
    position: "absolute",
    top: 10,
    left: 10,
  },
  textSearch: {
    width: "100%",
    borderWidth: 2,
    borderColor: "#C5CED6",
    borderRadius: 5,
    height: 40,
  },

  inputErrorText: {
    color: "#f00",
    fontSize: 12,
    paddingTop: 5,
  },
});
