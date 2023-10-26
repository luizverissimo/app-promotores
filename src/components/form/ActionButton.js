import React from "react";
import { TouchableOpacity, Text, View, ActivityIndicator } from "react-native";
import mainStyle from "../../../mainStyle";

function ActionButton({ text, loading, ...rest }) {
  return (
    <TouchableOpacity {...rest}>
      {loading && (
        <View
          style={[
            {
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          <ActivityIndicator size="small" color="#fff" />
        </View>
      )}
      {!loading && <Text style={mainStyle.actionText}>{text}</Text>}
    </TouchableOpacity>
  );
}
export default ActionButton;
