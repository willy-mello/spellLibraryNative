import React from "react";
import { StyleSheet, Text } from "react-native";
import OneItem from "./OneItem";

export default (UserItems = props => {
  return props.items.length ? (
    props.items.map((elem, idx) => {
      return <OneItem key={idx + 1} item={elem} />;
    })
  ) : (
    <Text>no items</Text>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DEB887",
    alignItems: "center"
  }
});
