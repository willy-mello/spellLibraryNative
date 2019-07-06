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
import MoreItemInfo from "./MoreItemInfo";

export default class OneItem extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      item: {}
    };
  }
  click = () => {
    console.log("clicked clikc");
    this.setState({ open: !this.state.open });
  };

  componentDidMount = async () => {
    try {
      const res = await fetch(this.props.item.url);
      const item = await res.json();
      this.setState({ item });
    } catch (error) {
      console.error(error);
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.item.name}</Text>
        {this.state.open ? (
          <MoreItemInfo item={this.state.item} onPress={this.click} />
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
    backgroundColor: "#CBCBC6",
    alignItems: "center",
    padding: 2,
    borderColor: "#7A7A79",
    borderWidth: 2
  },
  title: {
    fontFamily: osText,
    fontSize: 20
  },
  expand: {
    fontFamily: ""
  }
});
