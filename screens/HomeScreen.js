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
import OneSpell from "../components/OneSpell";
import UserDeck from "../components/UserDeck";

import { MonoText } from "../components/StyledText";

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      deck: [],
      spellList: []
    };
    this._getSavedSpells = this._getSavedSpells.bind(this);
  }
  // getRandomSpell = async () => {
  //   console.log("pressed llama");
  //   try {
  //     const res = await fetch("http://dnd5eapi.co/api/spells/1/");
  //     const spell = await res.json();
  //     this.setState({
  //       randomSpell: spell
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  _getSavedSpells = async () => {
    try {
      // let spellArray = [];
      let allSpells = await AsyncStorage.getAllKeys();
      this.setState({ spellList: allSpells, deck: [] });

      if (allSpells.length) {
        let spellArray = await allSpells.map(async elem => {
          let oneSpell = await AsyncStorage.getItem(elem);

          this.setState({ deck: [...this.state.deck, JSON.parse(oneSpell)] });
          console.log("spells array in deck", this.state.deck);
          return JSON.parse(oneSpell);
          // spellArray.push(JSON.parse(oneSpell));
          // console.log("spell array", spellArray);
        });
        // this.setState({ deck: spellArray });
        return spellArray;
      }
    } catch (error) {
      console.error(error);
    }
  };
  _removeAllSpells = async () => {
    try {
      await AsyncStorage.clear();
      this.setState({ deck: [], spellList: [] });
    } catch (error) {
      console.error(error);
    }
  };
  _spellCountCorrect = async () => {
    try {
      let allSpells = await AsyncStorage.getAllKeys();

      return allSpells.length === this.state.deck.length;
    } catch (error) {
      console.error(error);
    }
  };

  componentDidMount = () => {
    this._getSavedSpells();
  };
  componentDidUpdate = (prevProps, prevState) => {
    if (!this._getSavedSpells.length === prevState.deck.length) {
      console.log("got to consitional in diduopdate");
      this.setState({ deck: this._getSavedSpells() });
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.getStartedText} />
          <Text style={styles.getStartedText} />
          <Text style={styles.getStartedText}>Robby's DnD Pocket Handbook</Text>
          <TouchableOpacity
            style={styles.welcomeContainer}
            onPress={this._getSavedSpells}
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
        <View style={styles.codeHighlightContainer}>
          <TouchableOpacity onPress={this.componentDidUpdate}>
            <Image
              source={require("../assets/images/ducks.gif")}
              style={styles.welcomeImage}
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <UserDeck deck={this.state.deck} />
          {/* {this.state.deck.length ? (
            this.state.deck.map((elem, idx) => {
              return <OneSpell key={idx + 1} spell={elem} />;
            })
          ) : (
            <Text>no spells</Text>
          )} */}
          {this.state.deck.length ? (
            <Button title="remove all spells" onPress={this._removeAllSpells} />
          ) : null}

          {/* <View style={styles.getStartedContainer}>
          <DevelopmentModeNotice />

          <Text style={styles.getStartedText}>Get started by opening</Text>

          <View
            style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
            <MonoText>screens/HomeScreen.js</MonoText>
          </View>

          <Text style={styles.getStartedText}>
            Change this text and your app will automatically reload.
          </Text>
        </View> */}

          {/* <View style={styles.helpContainer}>
          <TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
            <Text style={styles.helpLinkText}>
              Help, it didn’t automatically reload!
            </Text>
          </TouchableOpacity>
        </View> */}
        </ScrollView>

        <View style={styles.codeHighlightContainer}>
          <TouchableOpacity>
            <Image
              source={require("../assets/images/armour.gif")}
              style={styles.welcomeImage}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.componentDidUpdate}>
            <Image
              source={require("../assets/images/ducks.gif")}
              style={styles.welcomeImage}
            />
          </TouchableOpacity>
          {/* <View
            style={[styles.codeHighlightContainer, styles.navigationFilename]}
          >
            <MonoText style={styles.codeHighlightText}>
              navigation/MainTabNavigator.js
            </MonoText>
          </View> */}
        </View>
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null
};

// function DevelopmentModeNotice() {
//   if (__DEV__) {
//     const learnMoreButton = (
//       <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
//         Learn more
//       </Text>
//     );

//     return (
//       <Text style={styles.developmentModeText}>
//         Development mode is enabled: your app will be slower but you can use
//         useful development tools. {learnMoreButton}
//       </Text>
//     );
//   } else {
//     return (
//       <Text style={styles.developmentModeText}>
//         You are not in development mode: your app will run at full speed.
//       </Text>
//     );
//   }
// }

// function handleLearnMorePress() {
//   WebBrowser.openBrowserAsync(
//     "https://docs.expo.io/versions/latest/workflow/development-mode/"
//   );
// }

// function handleHelpPress() {
//   WebBrowser.openBrowserAsync(
//     "https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes"
//   );
// }

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
    paddingTop: 30
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
    borderRadius: 3,
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
