import { StyleSheet } from "react-native";

export default StyleSheet.create({
  content: {
    flex: 1,
    marginStart: 30,
    marginEnd: 30,
  },
  searchView: {
    marginTop: 10,
  },
  searchHeader: {
    fontSize: 16,
  },
  formText: {
    fontSize: 16,
    marginTop: 10,
    marginLeft: 5,
  },
  textNotificationView: {
    marginTop: 20,
    marginBottom: 10,
  },
  formTextInput: {
    borderWidth: 2,
    borderRadius: 5,
    textAlignVertical: "top",
    paddingLeft: 10,
    paddingTop: 10,
    marginTop: 5,
    borderColor: "#C5CED6",
  },
  buttonText: {
    marginTop: 20,
    color: "#2C88D9",
    fontSize: 16,
  },
  buttonTextView: {
    alignItems: "center",
  },
  pickerView: {
    justifyContent: "center",
    alignItems: "center",
  },
  actions: {
    justifyContent: "center",
    alignItems: "stretch",
  },

  action: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 30,
    backgroundColor: "#207869",
    padding: 10,
    borderRadius: 10,
  },
});
