import { StyleSheet } from "react-native";

export default StyleSheet.create({
  item: {
    borderColor: "#C5CED6",
    borderWidth: 2,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
  },
  subtitle: {
    fontSize: 12,
    color: "#788896",
  },
  editButton: {
    paddingRight: 10,
  },
  editTextButton: {
    color: "#788896",
    fontSize: 12,
    marginRight: 5,
  },
  editButtonPosicion: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  verticalContentView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderLeftColor: "#C5CED6",
    borderLeftWidth: 2,
    width: "30%",
  },
  verticalContentText: {
    paddingLeft: 10,
    color: "#434141",
  },
});
