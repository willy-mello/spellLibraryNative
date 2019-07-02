import React from "react";
import {
  ScrollView,
  StyleSheet,
  Image,
  Button,
  View,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import { NavigationActions, StackActions } from "react-navigation";
import OneItem from "../components/OneItem";
import everyItem from "../assets/data/items.json";

export default class ItemsScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      allItems: []
    };
  }
  componentDidMount = async () => {
    try {
      // this.reset();
      const res = await fetch("http://dnd5eapi.co/api/equipment/");

      const items = await res.json();

      this.setState({ allItems: items.results });
    } catch (error) {
      console.error(error);
    }
  };

  _saveToAsyncStorage = async obj => {
    try {
      let req = await AsyncStorage.getItem("items");
      let itemsList = [];
      if (req !== null) {
        let itemsList = JSON.parse(req);
        itemsList.push(obj);
        await AsyncStorage.setItem(`items`, JSON.stringify(itemsList));
      } else {
        itemsList.push(obj);
        await AsyncStorage.setItem(`items`, JSON.stringify(itemsList));
      }
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const items = this.state.allItems;
    return (
      <ScrollView style={styles.container}>
        {this.state.allItems.length ? (
          items.map((elem, idx) => {
            return (
              <View key={idx + 1} style={styles.oneSpell}>
                <OneItem item={elem} />
                <TouchableOpacity style={styles.addButton}>
                  <Image
                    source={require("../assets/images/addSpell.gif")}
                    style={styles.welcomeImage}
                  />
                </TouchableOpacity>
              </View>
            );
          })
        ) : (
          <Image
            source={require("../assets/images/armour.gif")}
            style={styles.welcomeImage}
          />
        )}
      </ScrollView>
    );
  }
}

ItemsScreen.navigationOptions = {
  title: "Items"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  welcomeImage: {
    width: 80,
    height: 45,
    resizeMode: "contain",

    backgroundColor: "#DEB887"
  },
  addButton: {
    width: 100,
    alignItems: "center",
    borderStyle: "solid",
    borderWidth: 2,
    backgroundColor: "#DEB887",
    borderColor: "brown",
    width: 100
  },
  oneSpell: {
    flexDirection: "row",
    backgroundColor: "#DEB887"
  }
});
