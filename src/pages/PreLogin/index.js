import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";

import styles from "./styles";

import LogoImg from "../../assets/LogoPreLogin/inmes.png";

export default function PreLogin() {
  const navigation = useNavigation();

  function navigateToNewUser() {
    navigation.navigate("NewUser");
  }

  function navigateToLogin() {
    navigation.navigate("Login");
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={LogoImg} />
        <Text style={styles.headerText}>O que você deseja?</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.action, styles.actionCreate]}
          onPress={() => navigateToNewUser()}
        >
          <Text style={styles.actionText}>Criar Conta</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.action, styles.actionLogin]}
          onPress={() => {
            navigateToLogin();
          }}
        >
          <Text style={styles.actionText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
