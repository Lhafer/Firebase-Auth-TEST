// App.js
import React from "react";
import { StyleSheet, StatusBar, SafeAreaView } from "react-native";
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
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Journal"
              component={JournalScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar></StatusBar>
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
