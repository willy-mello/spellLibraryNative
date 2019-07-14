import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import CreateCharacterScreen from "../screens/CreateCharacterScreen";

import SpellsScreen from "../screens/SpellsScreen";
import ItemsScreen from "../screens/ItemsScreen";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  )
};

HomeStack.path = "";
const CharacterStack = createStackNavigator(
  {
    Character: CreateCharacterScreen
  },
  config
);

CharacterStack.navigationOptions = {
  tabBarLabel: "Create Character",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-options" : "md-options"}
    />
  )
};
CharacterStack.path = "";

const SpellsStack = createStackNavigator(
  {
    Character: SpellsScreen
  },
  config
);

SpellsStack.navigationOptions = {
  tabBarLabel: "Spells",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-options" : "md-options"}
    />
  )
};
SpellsStack.path = "";

const ItemsStack = createStackNavigator(
  {
    Items: ItemsScreen
  },
  config
);

ItemsStack.navigationOptions = {
  tabBarLabel: "Items",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-options" : "md-options"}
    />
  )
};
ItemsStack.path = "";

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  CharacterStack,
  SpellsStack,
  ItemsStack
});

tabNavigator.path = "";

export default tabNavigator;
