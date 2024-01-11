// JournalScreen.js
import React from "react";
import { View, FlatList, Text } from "react-native";
import JournalEntry from "../components/JournalEntry";
import Button from "../components/Buttons";
import { useJournal } from "../context/JournalContext";

const JournalScreen = () => {
  const { addEntry, entries } = useJournal();
  const handleAddEntry = () => {
    const newEntry = {
      id: entries.length + 1, //
      date: new Date().toLocaleDateString(),
      title: "New Entry",
      content: "Write your content here...",
    };
    addEntry(newEntry);
  };
  return (
    <View>
      <Button
        title="Add Entry"
        onPress={() => {
          handleAddEntry();
        }}
      />
      {entries !== null && entries !== undefined && entries.length > 0 ? (
        <FlatList
          data={entries}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <JournalEntry entry={item} />}
        />
      ) : (
        <Text> Add an entry and it will show up here.</Text>
      )}
    </View>
  );
};

export default JournalScreen;
