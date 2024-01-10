// Buttons.js
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import React from "react";

export const Button = ({ onPress, title }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export const ButtonAlt = ({ onPress, title }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, styles.buttonAlt]}
    >
      <Text style={styles.buttonAltText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#0782F9",
    padding: 10,
    margin: 5,
    width: "80%",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
  },
  buttonAlt: {
    backgroundColor: "white",
    borderColor: "#0782F9",
    borderWidth: 1,
  },
  buttonAltText: {
    color: "#0782F9",
    fontWeight: "700",
  },
});
