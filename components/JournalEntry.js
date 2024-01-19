import React, { useState, useEffect } from "react";
import { TextInput, View, Text, StyleSheet } from "react-native";
import { useJournal } from "../context/JournalContext";

export const JournalEntry = ({ entry }) => {
  const { updateEntry } = useJournal();
  const Pages = ({ numberOfTimes }) => {
    const renderComponents = () => {
      const components = [];

      for (let i = 0; i < numberOfTimes; i++) {
        components.push(
          <Page
            content={entry.pages[i]}
            pgNumber={i + 1}
            key={i}
            updateContent={(newContent) => updateContent(i, newContent)}
          />
        );
      }

      return components;
    };

    return <View>{renderComponents()}</View>;
  };

  const Page = ({ pgNumber }) => {
    const [content, setContent] = useState("");

    return (
      <View>
        <TextInput
          onChangeText={(e) => {
            setContent(e);
          }}
          value={content}
          style={styles.content}
          placeholder="Write Here..."
          multiline={true}
          numberOfLines={30}
          textAlignVertical="top"
        />
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text>──────── Pg.{pgNumber} ────────</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.entryContainer}>
      <Text style={styles.date}>{entry.date}</Text>
      <Text style={styles.title}>{entry.title}</Text>
      <Pages numberOfTimes={entry.pages.length} />
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
    height: "auto",
    width: 325,
  },
});
