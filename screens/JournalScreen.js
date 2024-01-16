import React, { useState } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import { JournalEntry } from "../components/JournalEntry";
import { Button } from "../components/Buttons";
import { useJournal } from "../context/JournalContext";
import { useNavigation } from "@react-navigation/native";

const JournalScreen = () => {
  const navigation = useNavigation();
  const { addEntry, entries } = useJournal();
  const [marginTop, setMarginTop] = useState(0);

  const handleAddEntry = () => {
    const newEntry = {
      id: entries.length + 1,
      date: new Date().toLocaleDateString(),
      title: "New Entry",
      content: "Write your content here...",
    };
    addEntry(newEntry);
  };

  return (
    <View
      id="outerContainer"
      style={[styles.outerContainer, { marginTop: marginTop }]}
    >
      <Button
        title="Add Entry"
        onPress={() => {
          handleAddEntry();
          setMarginTop(20);
        }}
      />
      <Button title="Go Back" onPress={navigation.goBack} />
      {entries && entries.length > 0 ? (
        <FlatList
          data={entries}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.innerContainer}>
              <JournalEntry entry={item} />
            </View>
          )}
        />
      ) : (
        <Text> Add an entry and it will show up here.</Text>
      )}
    </View>
  );
};

export default JournalScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    width: "30%",
  },
  outerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    borderColor: "Black",
    borderWidth: 1,
  },
  innerContainer: {
    flex: 1,
    height: "100%", // Each item takes up the entire height of the screen
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0", // Optional background color
    borderBottomWidth: 1,
    borderColor: "Black",
    borderWidth: 1,
  },
});
