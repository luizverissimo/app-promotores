import { StyleSheet } from "react-native";

export default StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  searchView: {
    marginTop: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  insertView: {
    backgroundColor: "#DFE6ED",
    height: 80,
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "row",
  },

  filterView: {
    alignItems: "center",
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
  },
  buttonText: {
    alignSelf: "center",
  },
  buttonTextText: {
    alignSelf: "center",
    color: "#2C88D9",
    fontSize: 16,
    fontWeight: "bold",
  },
  listView: {
    flex: 1,
  },
});
