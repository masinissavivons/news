import React from "react";
import { connect } from "react-redux";
import { View, StyleSheet, Image, Linking, SafeAreaView } from "react-native";
import { Text, Button } from "react-native-elements";

function Article(props) {
  return (
    <SafeAreaView style={styles.mainView}>
      <View style={styles.titleView}>
        <Text style={styles.articleTitle}>{props.article.title}</Text>
      </View>

      <View style={styles.imageView}>
        <Image
          style={{ width: 200, height: 200 }}
          source={{ uri: props.article.urlToImage }}
        />
      </View>

      <View style={styles.articleCore}>
        <Text fontSize={18}> {props.article.content} </Text>
      </View>

      <View style={styles.buttonView}>
        <Button
          title="go to website"
          type="outline"
          buttonStyle={{
            width: 200,
            borderRadius: 10,
          }}
          onPress={() => Linking.openURL(props.article.url)}
        ></Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff0f0",
  },
  titleView: {
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    paddingTop: "10%",
    // backgroundColor: "#ffbe76",
  },
  articleTitle: {
    fontSize: 20,
    textAlign: "center",
    // backgroundColor: "#ff7979",
  },
  imageView: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
    // backgroundColor: "#badc58",
  },
  articleCore: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 30,
    // backgroundColor: "#e056fd",
  },
  buttonView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 50,
    // backgroundColor: "#686de0",
  },
});

function mapStateToProps(state) {
  return { article: state.selectedArticle };
}

export default connect(mapStateToProps, null)(Article);
