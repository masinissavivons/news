import React, { useState } from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Text } from "react-native";
import { Button, Input } from "react-native-elements";

function Login(props) {
  const [usernameLogin, setUsernameLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [errorLogin, setErrorLogin] = useState("");

  async function login() {
    let data = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `usernameFromFront=${usernameLogin}&passwordFromFront=${passwordLogin}`,
    });
    let body = await data.json();
    setErrorLogin(body.errorLogin);

    if (body.login == true) {
      let token = body.user.token;
      props.loginUsername(usernameLogin);
      props.addToken(token);
      props.navigation.navigate("AppCore", { screen: "General" });
    }
  }

  return (
    <View style={styles.login}>
      <Input
        placeholder="your username"
        containerStyle={{ width: "70%" }}
        onChangeText={(value) => setUsernameLogin(value)}
        value={usernameLogin}
      />
      <Input
        placeholder="your password"
        secureTextEntry={true}
        containerStyle={{ width: "70%" }}
        onChangeText={(value) => setPasswordLogin(value)}
        value={passwordLogin}
      />
      <View style={styles.errorMessage}>
        <Text>{errorLogin}</Text>
      </View>
      <Button
        title="login"
        titleStyle={{
          width: "40%",
        }}
        buttonStyle={{
          borderRadius: 15,
          backgroundColor: "#ff7979",
          marginTop: 50,
          marginBottom: 20,
        }}
        onPress={() => login()}
      ></Button>
      <Button
        title="Don't have an account? register"
        titleStyle={{ color: "#535c68" }}
        type="clear"
        onPress={() => props.navigation.navigate("Register")}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  login: {
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
    // addToken: function (token) {
    //   dispatch({ type: "saveToken", token: token });
    // },
    loginUsername: function (usernameLogin) {
      dispatch({type: "saveUsername", saveUsername: usernameLogin})
    }
  };
}

export default connect(null, mapDispatchToProps)(Login);
