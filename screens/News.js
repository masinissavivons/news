import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet, findNodeHandle } from "react-native";
import { Button, Card, ListItem, Icon } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

function AllNews(props) {
  const [sourcesList, setSourcesList] = useState([]);

  useEffect(() => {
    const findSources = async () => {
      const rowData = await fetch(
        "https://newsapi.org/v2/top-headlines/?country=fr&apiKey=de6fc534990f48c89bc855c825f3c4c5"
      );
      const data = await rowData.json();
      console.log("articles reçues: ", data);
      setSourcesList(data.sources);
    };
    findSources();
  }, []);

  // console.log("sourcesList category: ", sourcesList[0].category);

  let icon;
  sourcesList.map((source, i) => {
    <Icon key={i} name="" size={30} />
    // key={i}
    if (source.category == "general") {
      icon = <Icon name="business" size={30} />
    } else if (source.category == "business") {
      icon = <Icon name="business" size={30} />
    } else if (source.category == "sports") {
      icon = <Icon name="sports-soccer" size={30} />
    }
  });




  function read(source) {
    props.selectSource(source);
    props.navigation.navigate("NewsBySource");
  }

  return (
    <ScrollView>
      <View style={styles.wrappingCards}>
        {sourcesList.map((source, i) => (
          <ListItem
            key={i}
            containerStyle={{ width: "100%" }}
            onPress={() => read(source.id)}
            bottomDivider
          >
            {icon}
            <ListItem.Title>{source.name}</ListItem.Title>
            <Card.Image source={{ uri: source.urlToImage }}></Card.Image>
            {/* <Button
              title="enter"
              buttonStyle={{ backgroundColor: "#ff7979" }}
              onPress={() => read(source.id)}
            ></Button> */}
          </ListItem>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrappingCards: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#686de0",
  },
});

function mapDispatchToProps(dispatch) {
  return {
    selectSource: function (source) {
      dispatch({ type: "selectedSource", sourceSelected: source });
    },
  };
}

export default connect(null, mapDispatchToProps)(AllNews);
