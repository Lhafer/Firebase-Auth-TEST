// App.js
import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider } from "./context/AuthContext";
import LoginScreen from "./screens/LoginScreen.js";
import HomeScreen from "./screens/HomeScreen";
import { JournalProvider } from "./context/JournalContext";
import JournalScreen from "./screens/JournalScreen.js";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <JournalProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Journal"
              component={JournalScreen}
              options={{ headerShown: false }}
              style={styles.container}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
              style={styles.container}
            />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
              style={styles.container}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </JournalProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
