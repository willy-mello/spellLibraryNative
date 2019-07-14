import React from "react";
import { StyleSheet, Text, View } from "react-native";
import OneSpell from "./OneSpell";

export default (CharacterInfo = props => {
  const character = props.character;
  return props.character.name ? (
    <View>
      <Text>
        {" "}
        {character.name}, the {character.background}, {character.subrace},{" "}
        {character.class} {character.race}
      </Text>
      <Text>
        STR: {character.stats.str} `(+{character.asi.str})`
      </Text>
      <Text>
        DEX: {character.stats.dex} `(+{character.asi.dex})`
      </Text>
      <Text>
        INT: {character.stats.int} `(+{character.asi.int})`
      </Text>
      <Text>
        WIS: {character.stats.wis} `(+{character.asi.wis})`
      </Text>
      <Text>
        CON: {character.stats.con} `(+{character.asi.con})`
      </Text>
      <Text>
        CMA: {character.stats.cma} `(+{character.asi.cma})`
      </Text>
      <Text>Skills: {character.skills}</Text>
      <Text>HP:{character.HP}</Text>
    </View>
  ) : (
    <Text>go make a character</Text>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DEB887",
    alignItems: "center"
  }
});
