import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { View, StyleSheet, Image, Linking, SafeAreaView } from "react-native";
import { Text, Button } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";

function Article(props) {
  //not useful for now, I kept it just in case
  // const [articleToFavorite, setArticleToFavorite] = useState("");

  // useEffect(() => {
  //   const favorite = async () => {
  //     setArticleToFavorite(props.article);
  //   };
  //   favorite();
  // }, []);

  // let articleToFavorite = props.article;
  // console.log("article: ", props.article);

  // save article in favorites
  // async function saveArticle() {
  //   let rowData = await fetch("http://192.168.1.33:3000/articleSavedToFavorites", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //     body: `titleFromFront=${props.article.title}&contentFromFront=${props.article.content}&sourceFromFront=${props.article.source.name}&imageFromFront=${props.article.urlToImage}&token=${props.token}`,
  //   });
  //   let data = await rowData.json();
  //   if (data.result == true) {
  //     props.addToFavorite(props.article);
  //   }
  // }

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
        {/* <Button
          title="read later"
          titleStyle={{
            textAlign: "center",
            marginLeft: 30,
          }}
          type="outline"
          icon={<FontAwesome name="bookmark" size={24} color="#fdcb6e" />}
          buttonStyle={{
            width: 200,
            borderRadius: 10,
            marginBottom: 30,
          }}
          onPress={
            () => saveArticle()
            // props.addToFavorite(articleToFavorite)
          }
        ></Button> */}
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

function mapDispatchToProps(dispatch) {
  return {
    addToFavorite: function (articleToFavorite) {
      dispatch({
        type: "addToFavorite",
        articleAddedToFavorite: articleToFavorite,
      });
    },
  };
}

function mapStateToProps(state) {
  return { article: state.selectedArticle, token: state.token };
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);
