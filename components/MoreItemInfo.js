import React from "react";
import { Image, Stylesheet, Text, View, TouchableOpacity } from "react-native";

export default (MoreItemInfo = props => {
  const item = props.item;
  return (
    <View>
      <Text>{item.desc[0]}</Text>
      <Text>Range: {item.range} </Text>
      <Text>Casting Time: {item.casting_time}</Text>
      <Text>Duration: {item.duration}</Text>
      <Text>Material: {item.material}</Text>
      <Text>Higher Level: {item.higher_level}</Text>
      <TouchableOpacity onPress={props.onPress}>
        <Text>LESS</Text>
      </TouchableOpacity>
    </View>
  );
});
