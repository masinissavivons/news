import React, { useEffect, useState, Image } from "react";
import { connect } from "react-redux";
import { View, Text, ScrollView, StyleSheet, Linking } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { ListItem, Avatar } from "react-native-elements";
import { Button } from "react-native-elements/dist/buttons/Button";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

function Favoris(props) {
  const [articles, setArticles] = useState([]);
  const isFocused = useIsFocused();

  let token = props.token;

  useEffect(() => {
    async function loadFavorites() {
      let rowArticlesFromDb = await fetch(
        `http://192.168.1.33:3000/getArticlesFromFavorites/${token}`
      );
      let articlesFromDb = await rowArticlesFromDb.json();
      // console.log("articles: ", articlesFromDb.articles[0].source);
      // props.updateFavorites(articlesFromDb.articles);
      // setArticles(articlesFromDb.articles);
    }
    loadFavorites();
  }, []);

  useEffect(() => {
    const loadFavorites = async () => {
      setArticles(props.articles);
    };
    loadFavorites();
  }, [isFocused]);

  function deleteArticle(i, article) {
    articles.splice(1, i);
    props.removeFromFavorites(article);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrowllView}
        contentContainerStyle={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={styles.welcome}>
          <Text style={styles.welcomeText}>Your to-read-later articles</Text>
        </View>
        {articles.map((article, i) => (
          // <ListItem>
          <ListItem.Swipeable
            key={i}
            leftContent={
              <Button
                icon={<FontAwesome name="share-alt" size={32} color="black" />}
                buttonStyle={{ height: "100%" }}
              />
            }
            rightContent={
              <Button
                icon={<FontAwesome name="remove" size={32} color="black" />}
                buttonStyle={{ height: "100%" }}
                onPress={() => deleteArticle(i, article)}
              />
            }
          >
            <Avatar
              source={{ uri: article.urlToImage }}
              style={styles.articlePicture}
            ></Avatar>
            <ListItem.Content>
              <ListItem.Title onPress={() => Linking.openURL(article.url)}>
                {article.title}
              </ListItem.Title>
            </ListItem.Content>
            {/* <ListItem.Subtitle>{article.source.name}</ListItem.Subtitle> */}
          </ListItem.Swipeable>
          // </ListItem>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 7,
    backgroundColor: "#FFEAEA",
  },
  scrowllView: {
    flex: 6,
    backgroundColor: "#FFEAEA",
  },
  welcome: {
    flex: 1,
    marginTop: 30,
    // backgroundColor: "#74b9ff",
  },
  welcomeText: {
    fontSize: 28,
  },
  articlePicture: {
    width: "25%",
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
  },
  deleteIcon: {
    color: "#81ecec",
  },
});

function mapDispatchToProps(dispatch) {
  return {
    removeFromFavorites: function (article) {
      dispatch({
        type: "removeFromFavorite",
        articleRemoved: article,
      });
    },
    updateFavorites: function (articlesFromDb) {
      dispatch({
        type: "updateStoreFromDb",
        updatedArticles: articlesFromDb,
      });
    },
  };
}

function mapStateToProps(state) {
  return {
    articles: state.favorites,
    token: state.token,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Favoris);
