import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator,
  NavigationActions,
  StackActions
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import LinksScreen from "../screens/LinksScreen";
// import SettingsScreen from "../screens/SettingsScreen";
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

// const reset = () => console.log("clickered");

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      // onPress={reset}
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

const LinksStack = createStackNavigator(
  {
    Links: LinksScreen
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: "Links",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "md-link"}
    />
  )
};

LinksStack.path = "";

// const SettingsStack = createStackNavigator(
//   {
//     Settings: SettingsScreen
//   },
//   config
// );

// SettingsStack.navigationOptions = {
//   tabBarLabel: "Settings",
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === "ios" ? "ios-options" : "md-options"}
//     />
//   )
// };
// SettingsStack.path = "";

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
  LinksStack,
  SpellsStack,
  ItemsStack
  // SettingsStack
});

tabNavigator.path = "";

export default tabNavigator;
