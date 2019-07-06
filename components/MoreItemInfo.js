import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import EquipmentPack from "./EquipmentPack";

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

        {/* <TouchableOpacity onPress={props.onPress}>
          <Text style={styles.hideButton}>hide details</Text>
        </TouchableOpacity> */}
      </View>
    );
  }
  if (item.equipment_category === "Armor") {
    return (
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

        {/* <TouchableOpacity onPress={props.onPress}>
          <Text style={styles.hideButton}>hide details</Text>
        </TouchableOpacity> */}
      </View>
    );
  }
  if (
    item.equipment_category === "Adventuring Gear" &&
    item.gear_category === "Equipment Pack"
  ) {
    return (
      <View>
        {item.desc
          ? item.desc.map((str, idx) => {
              return <Text key={idx + 1}>{str}</Text>;
            })
          : null}

        <Text>
          Cost: {item.cost.quantity} {item.cost.unit}
        </Text>
        {item.contents.map((elem, idx) => {
          console.log(elem, "item contents");
          return (
            <EquipmentPack
              key={idx + 1}
              url={elem.item_url}
              quantity={elem.quantity}
            />
          );
        })}
        {/* <TouchableOpacity onPress={props.onPress}>
          <Text style={styles.hideButton}>hide details</Text>
        </TouchableOpacity> */}
      </View>
    );
  }
  if (
    item.equipment_category === "Adventuring Gear" ||
    item.equipment_category === "Tools"
  ) {
    return (
      <View>
        {item.desc
          ? item.desc.map((str, idx) => {
              return <Text key={idx + 1}>{str}</Text>;
            })
          : null}

        <Text>
          Cost: {item.cost.quantity} {item.cost.unit}
        </Text>
        <Text>Weight: {item.weight}</Text>
        {/* <TouchableOpacity onPress={props.onPress}>
          <Text style={styles.hideButton}>hide details</Text>
        </TouchableOpacity> */}
      </View>
    );
  }
  if (item.equipment_category === "Mounts and Vehicles") {
    return (
      <View>
        {item.desc
          ? item.desc.map((str, idx) => {
              return <Text key={idx + 1}>{str}</Text>;
            })
          : null}

        <Text>
          Cost: {item.cost.quantity} {item.cost.unit}
        </Text>
        <Text>Weight: {item.weight}</Text>
        {item.speed ? (
          <Text>
            Speed: {item.speed.quantity} {item.speed.unit}
          </Text>
        ) : null}

        {/* <TouchableOpacity onPress={props.onPress}>
          <Text style={styles.hideButton}>hide details</Text>
        </TouchableOpacity> */}
      </View>
    );
  }
});
const styles = StyleSheet.create({
  hideButton: {
    alignSelf: "center",
    paddingTop: 2,
    paddingBottom: 2
  }
});
