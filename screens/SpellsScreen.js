import React from "react";
import {
  ScrollView,
  StyleSheet,
  Image,
  Button,
  View,
  AsyncStorage,
  TouchableOpacity,
  Text
} from "react-native";
import { NavigationActions, StackActions } from "react-navigation";
import OneSpell from "../components/OneSpell";

export default class SpellsScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      allSpells: []
    };
  }
  componentDidMount = async () => {
    try {
      // this.reset();
      const res = await fetch("http://dnd5eapi.co/api/spells/");
      const spells = await res.json();
      this.setState({ allSpells: spells.results });
    } catch (error) {
      console.error(error);
    }
  };
  _saveToAsyncStorage = async obj => {
    try {
      let req = await AsyncStorage.getItem("spells");
      let spellsList = [];
      if (req !== null) {
        let spellsList = JSON.parse(req);
        spellsList.push(obj);
        await AsyncStorage.setItem(`spells`, JSON.stringify(spellsList));
      } else {
        spellsList.push(obj);
        await AsyncStorage.setItem(`spells`, JSON.stringify(spellsList));
      }
    } catch (error) {
      console.error(error);
    }
  };

  // reset = () => {
  //   const resetToHome = NavigationActions.reset({
  //     index: 0,
  //     key: null,
  //     actions: [NavigationActions.navigate({ routeName: "Home" })]
  //   });
  //   const resetAction = StackActions.reset({
  //     index: 0,
  //     actions: [NavigationActions.navigate({ routeName: "Spells" })]
  //   });
  //   console.log("reset executed");
  //   // return this.props.navigation.dispatch(resetToHome);
  // };

  render() {
    const spells = this.state.allSpells;
    return (
      // <View>
      //   <Button title="go home" onPress={this.reset} />
      <ScrollView title={"Spells"} style={styles.container}>
        {this.state.allSpells.length ? (
          spells.map((elem, idx) => {
            return (
              <View key={idx + 1} style={styles.oneSpell}>
                <OneSpell spell={elem} />
                <TouchableOpacity
                  onPress={() => this._saveToAsyncStorage(elem)}
                  style={styles.addButton}
                >
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
      // </View>
    );
  }
}

SpellsScreen.navigationOptions = {
  title: "Spells"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexBasis: "auto"
  },
  welcomeImage: {
    width: 80,
    height: 45,
    resizeMode: "contain",

    backgroundColor: "#CBCBC6"
  },
  addButton: {
    backgroundColor: "#CBCBC6",
    alignItems: "center",
    padding: 2,
    borderColor: "#7A7A79",
    borderWidth: 2,
    width: 100,
    fontSize: 20
  },
  oneSpell: {
    flexDirection: "row",
    backgroundColor: "#DEB887"
  }
});
