import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  Platform
} from "react-native";
import MoreInfo from "./MoreInfo";

export default class OneSpell extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      spell: {}
    };
  }
  click = () => {
    console.log("clicked clikc");
    this.setState({ open: !this.state.open });
  };

  componentDidMount = async () => {
    try {
      const res = await fetch(this.props.spell.url);
      const spell = await res.json();
      this.setState({ spell });
    } catch (error) {
      console.error(error);
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.spell.name}</Text>
        {this.state.open ? (
          <MoreInfo spell={this.state.spell} onPress={this.click} />
        ) : (
          <TouchableOpacity onPress={this.click}>
            <Text>show details</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}
const osText = Platform.OS === "ios" ? "Papyrus" : "Roboto";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DEB887",
    alignItems: "center",
    borderColor: "brown",
    borderWidth: 2
  },
  title: {
    fontFamily: osText,
    fontSize: 20
  }
});
