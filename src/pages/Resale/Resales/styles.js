import { StyleSheet } from "react-native";

export default StyleSheet.create({
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
