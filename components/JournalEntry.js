import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const JournalEntry = ({ entry }) => {
  // Check if entry is null or undefined
  if (!entry) {
    return (
      <View style={styles.entryContainer}>
        <Text style={styles.errorText}>Invalid Entry</Text>
      </View>
    );
  }

  return (
    <View style={styles.entryContainer}>
      <Text style={styles.date}>{entry.date}</Text>
      <Text style={styles.title}>{entry.title}</Text>
      <Text style={styles.content}>{entry.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  entryContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  date: {
    fontSize: 12,
    color: "#888",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    fontSize: 16,
    marginTop: 8,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    fontStyle: "italic",
  },
});
