import { StyleSheet } from "react-native";

export default StyleSheet.create({
  item: {
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 5,
  },
  titleView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    width: 280,
  },
  titleText: {
    fontSize: 16,
    paddingLeft: 10,
  },

  trace: {
    backgroundColor: "#2C88D9",
    width: 10,
    height: 2,
    marginLeft: 20,
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
  dateView: {
    marginEnd: 30,
    marginStart: 30,
  },

  secondTitleView: {
    alignItems: "center",
    marginStart: 30,
    flex: 1,
  },
  subtitleView: {
    marginLeft: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    marginEnd: 100,
    marginTop: 5,
  },
  subtitleText: {
    fontSize: 12,
    color: "#2C88D9",
  },
});
