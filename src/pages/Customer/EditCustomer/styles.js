import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export default StyleSheet.create({
  map: {
    height: 200,
    width: "80%",
    marginEnd: 30,

    alignSelf: "center",
  },
  locationView: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 6,
  },
  locationInput: {
    borderWidth: 2,
    borderRadius: 5,
    marginStart: 30,
    marginTop: 5,
    height: 40,
    paddingLeft: 10,
    marginEnd: 10,
    paddingEnd: 10,
    borderColor: "#C5CED6",
  },
  locationInputView: { flex: 9 / 10 },
  locationButtonView: {
    backgroundColor: "#C5CED6",
    height: 40,
    width: 40,
    borderRadius: 40,
    marginStart: 5,
  },

  locationButton: {
    alignItems: "center",
    paddingTop: 10,
  },
  mapView: {
    alignItems: "center",
    marginStart: 30,
  },
  actionMap: {
    marginStart: 10,
    height: 25,
    width: 20,
    backgroundColor: "#fff",
    borderColor: "#C5CED6",
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  mapAddress: {
    fontSize: 10,
    paddingBottom: 10,
    paddingTop: 10,
    marginStart: 30,
    marginEnd: 30,
    alignSelf: "center",
  },

  actions: {
    justifyContent: "center",
    alignItems: "stretch",
    marginStart: 30,
    marginEnd: 30,
  },

  action: {
    alignItems: "center",
    marginTop: 20,

    backgroundColor: "#207869",
    padding: 10,
    borderRadius: 10,
  },
  actionDelete: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
    backgroundColor: "#D3445B",
    padding: 10,
    borderRadius: 10,
  },

  actionText: {
    color: "#fff",
  },
  buttonListEmployee: {
    marginTop: 20,
    alignSelf: "center",
  },
  buttonListEmployeeText: {
    alignSelf: "center",
    color: "#2C88D9",
    fontSize: 16,
    fontWeight: "bold",
  },
  inputErrorText: {
    color: "#f00",
    fontSize: 12,
    paddingTop: 5,
    marginStart: 30,
  },
});
