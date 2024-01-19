import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Button, ButtonAlt } from "../components/Buttons";
import React from "react";
import { auth } from "../firebase";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { user, setUser, isLoggedIn, setLogged } = useAuth();
  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && !loading) {
        setLogged(true);
        setUser(user);
        setEmail("");
        setPassword("");
        navigation.navigate("Home");
      } else {
        console.log("loading");
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const handleSignUp = async () => {
    setLoading(true);
    if (email != null && password != null) {
      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await signInWithEmailAndPassword(auth, email, password);
        alert(user.email + "signed up");
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    }
  };
  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
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
            <Button
              onPress={() => {
                handleLogin();
              }}
              title="Login"
            />
            <ButtonAlt
              onPress={() => {
                handleSignUp();
                setEmail("");
                setPassword("");
              }}
              title="Register"
            />
            <Button
              onPress={() => {
                navigation.navigate("Journal");
              }}
              title="Go To Your Journal"
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
    padding: 10, // Adjust as needed
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
    borderRadius: 10,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    paddingLeft: 10,
    borderRadius: 10,
  },
});
