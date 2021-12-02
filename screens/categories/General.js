import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import envs from "../../config/env";


function General(props) {
  const {NEWS_API_KEY} = envs;
  const [generalSourcesList, setGeneralSourcesList] = useState([]);

  useEffect(() => {
    const findSources = async () => {
      const rowDataGeneral = await fetch(
        `https://newsapi.org/v2/top-headlines?country=fr&category=general&apiKey=${NEWS_API_KEY}`
      );
      const dataGeneral = await rowDataGeneral.json();
      console.log("dataGeneral: ", dataGeneral);
      setGeneralSourcesList(dataGeneral.articles);
    };
    findSources();
  }, []);

  function read(article) {
    props.selectedArticle(article);
    props.navigation.navigate("Article");
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrowllView}>
        <View style={{ width: "100%" }}>
          <View style={styles.categoryView}>
            <Text style={styles.categoryText}>General</Text>
          </View>

          {generalSourcesList.map((article, i) => (
            <ListItem key={i}>
              <Avatar
                source={{ uri: article.urlToImage }}
                style={styles.articlePicture}
              ></Avatar>
              <ListItem.Content>
                <ListItem.Title onPress={() => read(article)}>
                  {article.title}
                </ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrowllView: {
    flex: 6,
    // backgroundColor: "#FFEAEA",
  },
  categoryView: {
    height: 50,
    paddingTop: 10,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#a29bfe",
  },
  categoryText: {
    fontWeight: "100",
    fontSize: 22,
  },
  articlePicture: {
    width: "25%",
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
  },
});

function mapDispatchToProps(dispatch) {
  return {
    selectedArticle: function (article) {
      dispatch({ type: "selectedArticle", selectedArticle: article });
    },
  };
}

function mapStateToProps(state) {
  return { usernameLogin: state.username, userRegister: state.username };
}

export default connect(mapStateToProps, mapDispatchToProps)(General);
