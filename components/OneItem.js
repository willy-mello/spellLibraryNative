import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import MoreInfo from "./MoreInfo";

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
        <Text>{this.props.item.name}</Text>
        {this.state.open ? (
          <MoreInfo item={this.state.item} onPress={this.click} />
        ) : (
          <TouchableOpacity onPress={this.click}>
            <Text>MORE</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DEB887",
    alignItems: "center"
  }
});
