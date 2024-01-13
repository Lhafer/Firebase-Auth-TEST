import { TextInput, View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import React from "react";
export const JournalEntry = ({ entry }) => {
  const [content, setContent] = useState("");
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
      <TextInput
        onChangeText={(e) => setContent(e)}
        style={styles.content}
        value={content}
        placeholder="Write Here..."
        multiline={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  entryContainer: {
    flex: 1,
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
