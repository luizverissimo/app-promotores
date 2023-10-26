import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  item: {
    borderColor: "#C5CED6",
    borderWidth: 2,
    padding: 10,
  },

  titleView: {},
  titleText: { fontSize: 16 },
  dateView: {
    paddingTop: 5,
    alignSelf: "flex-end",
  },
  dateText: { fontSize: 12, color: "#2C88D9" },
});
