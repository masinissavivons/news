import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {Card, Button } from "react-native-elements";

function BySource(props) {
  const [articlesList, setArticlesList] = useState([]);
  const [articleSource, setArticleSource] = useState("");

  useEffect(() => {
    const articlesBySource = async () => {
      const rowData = await fetch(
        `https://newsapi.org/v2/top-headlines?sources=${props.source}&apiKey=de6fc534990f48c89bc855c825f3c4c5`
      );
      const data = await rowData.json();
      setArticlesList(data.articles);
      setArticleSource(data.articles[0].source.name);
    };
    articlesBySource();
  }, []);

  function readArticle(article) {
    props.selectedArticle(article);
    props.navigation.navigate("Article");
  }

  return (
    <SafeAreaView>
      <View style={styles.bySource}>
        <Text style={styles.sourceName}>
          {articleSource}
        </Text>
      </View>
      <ScrollView style={styles.scrowllView}>
        <View style={styles.articleList}>
          {articlesList.map((article, i) => (
            <Card key={i} containerStyle={{ width: "90%" }}>
              <Card.Title>{article.title}</Card.Title>
              <Card.Image source={{ uri: article.urlToImage }}></Card.Image>
              <Button
                title="read"
                buttonStyle={{ backgroundColor: "#7ed6df" }}
                onPress={() => readArticle(article)}
              ></Button>
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrowllView: {
    backgroundColor: "#FFEAEA",
  },
  bySource: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  sourceName: {
    textAlign: "center",
  },
  articleTitle: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
  },
  articleList: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
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
  return { source: state.selectedSource };
}

export default connect(mapStateToProps, mapDispatchToProps)(BySource);
