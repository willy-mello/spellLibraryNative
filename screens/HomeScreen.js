import * as WebBrowser from "expo-web-browser";
import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage,
  Button
} from "react-native";
import { NavigationActions, StackActions } from "react-navigation";
import OneSpell from "../components/OneSpell";
import UserDeck from "../components/UserDeck";
import UserItems from "../components/UserItems";
import UserWallet from "../components/UserWallet";

import { MonoText } from "../components/StyledText";

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      deck: [],
      itemOpen: false,
      spellOpen: false,
      walletOpen: false,
      items: [],
      funds: 0
    };
    this._getSavedSpells = this._getSavedSpells.bind(this);
    this._getSavedItems = this._getSavedItems.bind(this);
    this._getAllPossessions = this._getAllPossessions.bind(this);
  }

  _armorTabLoad = () => {
    this._showItems();
    this._getSavedItems();
  };
  _showWallet = () => {
    this.setState({ walletOpen: !this.state.walletOpen });
  };
  _showSpells = () => this.setState({ spellOpen: !this.state.spellOpen });
  _showItems = () => this.setState({ itemOpen: !this.state.itemOpen });
  _initializeWallet = async () => {
    try {
      let req = await AsyncStorage.getItem("funds");
      if (req === null) {
        await AsyncStorage.setItem("funds", JSON.stringify(0));
      } else {
        this.setState({ funds: JSON.parse(req) });
      }
    } catch (error) {
      console.error(error);
    }
  };
  _getSavedSpells = async () => {
    try {
      let allSpells = await AsyncStorage.getItem("spells");
      if (allSpells !== null) this.setState({ deck: JSON.parse(allSpells) });
      return JSON.parse(allSpells);
    } catch (error) {
      console.error(error);
    }
  };
  _getSavedItems = async () => {
    try {
      let allItems = await AsyncStorage.getItem("items");
      if (allItems !== null) this.setState({ items: JSON.parse(allItems) });
      return JSON.parse(allItems);
    } catch (error) {
      console.error(error);
    }
  };
  _removeAllSpells = async () => {
    try {
      await AsyncStorage.removeItem("spells");
      this.setState({ deck: [], spellList: [] });
    } catch (error) {
      console.error(error);
    }
  };
  _removeAllItems = async () => {
    try {
      await AsyncStorage.removeItem("items");
      this.setState({ items: [] });
    } catch (error) {
      console.error(error);
    }
  };
  _getAllPossessions = () => {
    this._getSavedItems();
    this._getSavedSpells();
    this._initializeWallet();
  };

  componentDidMount = () => {
    this._getAllPossessions();
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.getStartedText} />
        <Text style={styles.getStartedText} />
        <Text style={styles.getStartedText}>Robby's DnD Pocket Handbook</Text>

        <View style={styles.welcomeContainer}>
          <TouchableOpacity
            style={styles.welcomeContainer}
            onPress={this._getAllPossessions}
          >
            <Image
              source={require("../assets/images/llama.gif")}
              style={styles.welcomeImage}
            />
            <Text style={styles.getStartedText}>
              {" "}
              Tap Llama to update deck{" "}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <TouchableOpacity onPress={this._showSpells}>
            <View style={styles.codeHighlightContainerSpells}>
              <Image
                source={require("../assets/images/ducks.gif")}
                style={styles.welcomeImage}
              />
            </View>
          </TouchableOpacity>
          {this.state.spellOpen ? <UserDeck deck={this.state.deck} /> : null}
          {this.state.deck.length && this.state.spellOpen ? (
            <Button title="remove all spells" onPress={this._removeAllSpells} />
          ) : null}

          <TouchableOpacity onPress={this._showItems}>
            <View style={styles.codeHighlightContainer}>
              <Image
                source={require("../assets/images/armour.gif")}
                style={styles.welcomeImage}
              />
            </View>
          </TouchableOpacity>

          {this.state.itemOpen ? <UserItems items={this.state.items} /> : null}

          {this.state.items.length && this.state.itemOpen ? (
            <Button title="remove all items" onPress={this._removeAllItems} />
          ) : null}
          <TouchableOpacity onPress={this._showWallet}>
            <View style={styles.codeHighlightContainerMoney}>
              <Image
                source={require("../assets/images/money.gif")}
                style={styles.welcomeImage}
              />
            </View>
          </TouchableOpacity>
          {this.state.walletOpen ? <UserWallet /> : null}
        </ScrollView>
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 0
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "#808080",
    borderRadius: 0,
    paddingHorizontal: 4,
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  codeHighlightContainerSpells: {
    backgroundColor: "#464643",
    borderRadius: 0,
    paddingHorizontal: 4,
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  codeHighlightContainerMoney: {
    backgroundColor: "#D5D5D1",
    borderRadius: 0,
    paddingHorizontal: 4,
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  }
});
