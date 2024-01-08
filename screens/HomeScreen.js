import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

const HomeScreen = () => {
  return (
    <KeyboardAvoidingView style={styles.container}>
      <TouchableOpacity>
        <Text>HomeScreen</Text>
      </TouchableOpacity>
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
