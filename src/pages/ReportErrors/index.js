import React, { useState, useEffect } from "react";
import { View, Text, TextInput } from "react-native";
import { successSentMail } from "../../utils/SystemMessages";
import api from "../../services/api";
import { useNavigation } from "@react-navigation/native";

import mainStyle from "../../../mainStyle";
import ActionButton from "../../components/form/ActionButton";
import styles from "./styles";
import { useAuth } from "../../contexts/auth";
import validationFunctions from "../../validation/ValidationFunctions";

export default function ReportErrors() {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { user } = useAuth();
  const [content, setContent] = useState("");

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setLoading(false);
    });

    return unsubscribe;
  }, [navigation]);

  async function sendEmail() {
    try {
      if (!loading) {
        setLoading(true);
        await api
          .post("/send-mail", {
            sender: `"${user.name}" <${user.email}>`,
            receivers: "dev@movelin.com.br",
            subject: "Erro no sistema.",
            text: content,
            html: "",
          })
          .then((response) => {
            if (!!response?.data) {
              setContent("");
              successSentMail(navigation, "Home");
            }
          })
          .catch((error) => {
            setLoading(false);
            validationFunctions.errorsResponseDefault(error);
          });
      }
    } catch (error) {
      setLoading(false);
      validationFunctions.errorsResponseDefault(error);
    }
  }

  return (
    <View style={mainStyle.containerDrawer}>
      <Text style={styles.formText}>Qual o problema ou sugestão?</Text>
      <TextInput
        multiline
        numberOfLines={20}
        style={styles.formTextInput}
        value={content}
        onChangeText={(text) => setContent(text)}
      />
      <View style={mainStyle.actions}>
        <ActionButton
          onPress={() => sendEmail()}
          loading={loading}
          text="Enviar"
          style={mainStyle.action}
        />
      </View>
    </View>
  );
}
