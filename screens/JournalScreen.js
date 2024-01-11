import React from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
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
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Button
          title="Add Entry"
          onPress={() => {
            handleAddEntry();
          }}
        />
        {entries && entries.length > 0 ? (
          entries.map((item) => <JournalEntry key={item.id} entry={item} />)
        ) : (
          <Text> Add an entry and it will show up here.</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default JournalScreen;
const styles = StyleSheet.create({
  buttonContainer: {
    width: "30%",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  listContainer: {
    height: "75%",
  },
  entryList: {
    borderColor: "black",
    borderWidth: 2,
  },
});
