import React from "react";
import { Image, Stylesheet, Text, View, TouchableOpacity } from "react-native";

export default (MoreInfo = props => {
  const spell = props.spell;
  return (
    <View>
      <Text>{spell.desc[0]}</Text>
      <Text>Range: {spell.range} </Text>
      <Text>Casting Time: {spell.casting_time}</Text>
      <Text>Duration: {spell.duration}</Text>
      <Text>Material: {spell.material}</Text>
      <Text>Higher Level: {spell.higher_level}</Text>
      <TouchableOpacity onPress={props.onPress}>
        <Text>hide details</Text>
      </TouchableOpacity>
    </View>
  );
});
