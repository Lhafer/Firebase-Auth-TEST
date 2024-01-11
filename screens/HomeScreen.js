// HomeScreen.js
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useState, React, useEffect } from "react";
import { Button } from "../components/Buttons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";

const HomeScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    if (!isLoggedIn) {
      navigation.navigate("Login");
    }
  }, []);

  const handleLogout = async () => {
    setLogged(false);
    await logout();
    navigation.navigate("Login");
  };

  const { user, setUser, isLoggedIn, setLogged, logout } = useAuth();

  return (
    <KeyboardAvoidingView style={styles.container}>
      <TouchableOpacity>
        <Text>HomeScreen </Text>
        <Text>Welcome {isLoggedIn ? user.email : "Not Logged In"}</Text>
      </TouchableOpacity>

      <Button onPress={handleLogout} title="Logout?" />
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
