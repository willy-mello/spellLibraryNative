import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";

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

const SpellsStack = createStackNavigator(
  {
    Spells: SpellsScreen
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
  SpellsStack,
  ItemsStack
});

tabNavigator.path = "";

export default tabNavigator;
