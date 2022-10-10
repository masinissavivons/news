import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import selectedSource from "./reducers/selectedSource";
import selectedArticle from "./reducers/selectedArticle";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
const store = createStore(
  combineReducers({
    selectedSource,
    selectedArticle,
  })
);

import General from "./screens/categories/General";
import Science from "./screens/categories/Science";
import Sports from "./screens/categories/Sports";
import Business from "./screens/categories/Business";
import Technology from "./screens/categories/Technology";
import Health from "./screens/categories/Health";

import Article from "./screens/Article";

import { Icon } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function bottomNav() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let icon;
          if (route.name == "General") {
            icon = <FontAwesome name="newspaper-o" size={22} color={color} />;
          }
          if (route.name == "Science") {
            icon = <Icon name="science" size={22} color={color} />;
          }
          if (route.name == "Sports") {
            icon = <FontAwesome name="soccer-ball-o" size={22} color={color} />;
          }
          if (route.name == "Business") {
            icon = icon = (
              <FontAwesome5 name="wallet" size={22} color={color} />
            );
          }
          if (route.name == "Technology") {
            icon = <Icon name="computer" size={22} color={color} />;
          }
          if (route.name == "Health") {
            icon = <FontAwesome5 name="hospital" size={22} color={color} />;
          }
          return icon;
        },
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: [
          {
            height: 70,
            paddingBottom: 10,
            paddingTop: 10,
            elevation: 0,
          },
          null,
        ],
      })}
      tabBarOptions={{
        activeTintColor: "#fa8266",
        inactiveTintColor: "#afb7ba",
      }}
    >
      <Tab.Screen name="General" component={General} />
      <Tab.Screen name="Science" component={Science} />
      <Tab.Screen name="Sports" component={Sports} />
      <Tab.Screen name="Business" component={Business} />
      <Tab.Screen name="Technology" component={Technology} />
      <Tab.Screen name="Health" component={Health} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="AppCore" component={bottomNav} />
          <Stack.Screen name="Article" component={Article} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
