import { StyleSheet } from "react-native";

export default StyleSheet.create({
  actionDelete: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 30,
    backgroundColor: "#D3445B",
    padding: 10,
    borderRadius: 10,
  },

  content: {
    flex: 1,
  },
  fixLayout: {
    marginStart: 30,
    marginEnd: 30,
  },
  formText: {
    fontSize: 18,
    marginTop: 15,
  },
  formTextFix: {
    fontSize: 18,
    marginTop: 15,
    marginLeft: 30,
  },
  formTextInputLine: {
    borderWidth: 2,
    borderRadius: 5,

    marginTop: 5,
    height: 40,
    paddingLeft: 10,
    marginStart: 30,
    marginEnd: 30,
    borderColor: "#C5CED6",
  },
  formTextInputView: {
    marginTop: 5,
    marginBottom: "10%",
  },
  formTextInput: {
    borderWidth: 2,
    borderRadius: 5,
    paddingLeft: 10,

    textAlignVertical: "top",
    marginStart: 30,
    marginEnd: 30,
    paddingTop: 10,

    borderColor: "#C5CED6",
  },
  actions: {
    justifyContent: "center",
    alignItems: "stretch",
  },

  action: {
    alignItems: "center",

    backgroundColor: "#207869",
    padding: 10,
    borderRadius: 10,
  },
});
