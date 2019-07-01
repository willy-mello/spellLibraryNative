import React from "react";
import {
  ScrollView,
  StyleSheet,
  Image,
  Button,
  View,
  AsyncStorage
} from "react-native";
import OneSpell from "../components/OneSpell";

export default class ItemsScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      allItems: []
    };
  }
  componentDidMount = async () => {
    try {
      const res = await fetch("http://dnd5eapi.co/api/equiptment/");
      const items = await res.json();
      this.setState({ allItems: items.results });
    } catch (error) {
      console.error(error);
    }
  };
  _saveToAsyncStorage = async obj => {
    try {
      await AsyncStorage.setItem(`${obj.name}`, JSON.stringify(obj));
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const items = this.state.allItems;
    return (
      <ScrollView style={styles.container}>
        {this.state.allItems.length ? (
          Items.map((elem, idx) => {
            return (
              <View key={idx + 1} style={styles.oneSpell}>
                <OneSpell spell={elem} />
                <Button
                  onPress={() => this._saveToAsyncStorage(elem)}
                  style={styles.addButton}
                  title="ADD +"
                >
                  {" "}
                  Add +{" "}
                </Button>
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
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10,
    backgroundColor: "#080808"
  },
  addButton: {
    width: "2vw",
    borderStyle: "solid",
    borderWidth: 10,
    borderRadius: 50,
    borderColor: "#696969",
    backgroundColor: "#696969"
  },
  oneSpell: {
    flexDirection: "row",
    backgroundColor: "#DEB887"
  }
});
