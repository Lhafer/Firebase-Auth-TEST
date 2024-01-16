import React, { useState, useEffect } from "react";
import { TextInput, View, Text, StyleSheet } from "react-native";

export const JournalEntry = ({ entry }) => {
  const Pages = ({ numberOfTimes }) => {
    const renderComponents = () => {
      const components = [];

      for (let i = 0; i < numberOfTimes; i++) {
        components.push(<Page page={i + 2} key={i} />);
      }

      return components;
    };

    return <View>{renderComponents()}</View>;
  };

  const Page = ({ page }) => {
    return (
      <View>
        <TextInput
          onChangeText={(e) => {}}
          style={styles.content}
          placeholder="Write Here..."
          multiline={true}
          numberOfLines={30}
        />

        <Text>──────── Pg.{page} ────────</Text>
      </View>
    );
  };

  const [content, setContent] = useState("");
  const [pages, setPages] = useState(0);

  useEffect(() => {
    // Calculate the number of pages based on the number of lines
    const lines = content.split("\n");
    const newPages = Math.ceil(lines.length / 30);
    setPages(newPages > 0 ? newPages : 1);
  }, [content]);

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
        numberOfLines={30}
      />

      <Text>──────── Pg.{1} ────────</Text>
      <Pages numberOfTimes={pages} />
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
    height: 800,
    width: 325,
  },
});
