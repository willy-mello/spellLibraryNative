import React from "react";
import { Image, Stylesheet, Text, View, TouchableOpacity } from "react-native";

export default (MoreItemInfo = props => {
  const item = props.item;
  if (item.equipment_category === "Weapon") {
    return (
      <View>
        {/* <Text>{item.desc[0]}</Text> */}
        <Text>Type: {item.weapon_range} weapon</Text>

        <Text>
          Cost: {item.cost.quantity} {item.cost.unit}
        </Text>
        <Text>
          Damage: {item.damage.dice_count}d{item.damage.dice_value}{" "}
          {item.damage.damage_type.name} damage
        </Text>
        <Text>Normal Range: {item.range.normal}</Text>
        {item.range.long !== null ? (
          <Text>Long Range: {item.range.long}</Text>
        ) : null}

        <TouchableOpacity onPress={props.onPress}>
          <Text>hide details</Text>
        </TouchableOpacity>
      </View>
    );
  }
  if (item.equipment_category === "Armor") {
    <View>
      {/* <Text>{item.desc[0]}</Text> */}
      <Text>Type: {item.armor_category} armor</Text>
      <Text>Base Armor: {item.armor_class.base}</Text>
      <Text>DEX Bonus: {item.armor_class.dex_bonus ? "Yes" : "No"}</Text>
      <Text>STR Requirement: {item.str_minimum}</Text>
      <Text>
        Stealth Disadvantage: {item.stealth_disadvantage ? "Yes" : "No"}
      </Text>
      <Text>Weight: {item.weight}</Text>
      <Text>
        Cost: {item.cost.quantity} {item.cost.unit}
      </Text>

      <TouchableOpacity onPress={props.onPress}>
        <Text>hide details</Text>
      </TouchableOpacity>
    </View>;
  }
  return (
    <View>
      {/* <Text>{item.desc[0]}</Text> */}
      <Text>Range: {item.range.normal} </Text>
      {/* <Text>Casting Time: {item.casting_time}</Text>
      <Text>Duration: {item.duration}</Text>
      <Text>Material: {item.material}</Text>
      <Text>Higher Level: {item.higher_level}</Text> */}
      <TouchableOpacity onPress={props.onPress}>
        <Text>LESS</Text>
      </TouchableOpacity>
    </View>
  );
});
