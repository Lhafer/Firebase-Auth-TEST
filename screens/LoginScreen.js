import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { FIREBASE_AUTH, auth } from "../firebase";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  signInUserWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const auth = FIREBASE_AUTH;

  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Home");
      }
    });
    return unsubscribe;
  }, []);

  const handleSignUp = async () => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.temp}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              handleLogin();
              setEmail("");
              setPassword("");
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}> Login </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              handleSignUp();
              setEmail("");
              setPassword("");
            }}
            style={[styles.button, styles.buttonAlt]}
          >
            <Text style={[styles.buttonText, styles.buttonAltText]}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  temp: {
    borderWidth: 2,
    borderColor: "black",
    borderStyle: "solid",
    alignItems: "center",
    alignSelf: "center", // Align to the start of the container
    paddingHorizontal: 10, // Adjust as needed
    paddingVertical: 10, // Adjust as needed
    width: 200,
    borderRadius: 10,
  },
  inputContainer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 10,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingcenter: 10,
    paddingLeft: 10,
    borderRadius: 10,
  },
  button: {
    alignContent: "center",
    backgroundColor: "#0782F9",
    padding: 10,
    margin: 5,
    width: "80%",
    borderRadius: 10,
  },
  buttonAlt: {
    backgroundColor: "white",
    borderColor: "#0782F9",
    borderWidth: 1,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
  },
  buttonAltText: {
    color: "#0782F9",
    fontWeight: "700",
  },
});
