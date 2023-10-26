import { StyleSheet } from "react-native";

export default StyleSheet.create({
  userPhoto: {
    marginTop: 10,
    color: "#2C88D9",
    fontSize: 16,
  },
  buttonPassword: {
    alignSelf: "center",
  },
  buttonPasswordText: {
    alignSelf: "center",
    color: "#2C88D9",
    fontSize: 16,
    fontWeight: "bold",
  },
  actionDelete: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
    backgroundColor: "#D3445B",
    padding: 10,
    borderRadius: 10,
  },
  // ---------------------------
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,

    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  formTextInput: {
    fontSize: 14,
    paddingLeft: 5,
    color: "black",
    marginBottom: 30,
    width: 150,
    borderBottomColor: "#2196F3",
    borderBottomWidth: 2,
  },
  actionsModal: {
    flexDirection: "row",
    alignSelf: "flex-end",
  },
});
