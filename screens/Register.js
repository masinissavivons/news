import React, { useState } from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Text } from "react-native";
import { Button, Input } from "react-native-elements";
import PROXY from "../package.json";

function Register(props) {
  const [usernameRegister, setUsernameRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [confirmPasswordRegister, setConfirmePasswordRegister] = useState("");
  const [errorRegister, setErrorRegister] = useState([]);

  async function register() {
    let data = await fetch("http://localhost:3000/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `usernameFromFront=${usernameRegister}&passwordFromFront=${passwordRegister}&confirmPasswordFromFront=${confirmPasswordRegister}`,
    });
    let body = await data.json();

    if (body.result == false) {
      setErrorRegister(body.errorRegister);
    }

    if (body.result == true) {
      let token = body.savedUser.token;
      props.registerUsername(usernameRegister);
      props.addToken(token);
      props.navigation.navigate("AppCore", { screen: "General" });
    }
  }

  return (
    <View style={styles.register}>
      <Input
        placeholder="your username"
        containerStyle={{ width: "70%" }}
        onChangeText={(value) => setUsernameRegister(value)}
        value={usernameRegister}
      />
      <Input
        placeholder="your password"
        secureTextEntry={true}
        containerStyle={{ width: "70%" }}
        onChangeText={(value) => setPasswordRegister(value)}
        value={passwordRegister}
      />
      <Input
        placeholder="confirm your password"
        secureTextEntry={true}
        containerStyle={{ width: "70%" }}
        onChangeText={(value) => setConfirmePasswordRegister(value)}
        value={confirmPasswordRegister}
      />

      <View style={styles.errorMessage}>
        <Text>{errorRegister}</Text>
      </View>

      <Button
        title="register"
        titleStyle={{
          width: "40%",
        }}
        buttonStyle={{
          borderRadius: 15,
          backgroundColor: "#ff7979",
          marginTop: 50,
          marginBottom: 20,
        }}
        onPress={() => register()}
      ></Button>
      <Button
        title="Already an account? login"
        titleStyle={{ color: "#535c68" }}
        type="clear"
        onPress={() => props.navigation.navigate("Login")}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  register: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorMessage: {
    width: "80%",
    alignItems: "center",
  },
});

function mapDispatchToProps(dispatch) {
  return {
    addToken: function (token) {
      dispatch({ type: "saveToken", token: token });
    },
    registerUsername: function (usernameRegister) {
      dispatch({
        type: "saveUsername",
        saveUsername: usernameRegister,
      });
    },
  };
}

export default connect(null, mapDispatchToProps)(Register);
