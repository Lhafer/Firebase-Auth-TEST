import React from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import { JournalEntry } from "../components/JournalEntry";
import { Button } from "../components/Buttons";
import { useJournal } from "../context/JournalContext";
import { useNavigation } from "@react-navigation/native";

const JournalScreen = () => {
  const navigation = useNavigation();
  const { addEntry, entries } = useJournal();

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
    <View style={styles.outerContainerr}>
      <Button
        title="Add Entry"
        onPress={() => {
          handleAddEntry();
        }}
      />

      {entries && entries.length > 0 ? (
        <FlatList
          contentContainerStyle={styles.container}
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
const styles = StyleSheet.create({
  buttonContainer: {
    width: "30%",
  },
  container: {
    width: "100vh",
    height: "90vh",
    flex: 1,
  },
  outerContainer: {
    width: "100vh",
    height: "100vh",
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});
