import React from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback, Image } from "react-native";


const styles = StyleSheet.create({
  container: {
    height: 24,
    top: 20,
    left: 20,
    justifyContent:'center',
  },
  title: {
    fontSize: 18,
    color: "white",
    left: 32,
  },
});

export const Header = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/icons/LineGraph.png')}
      />
      <View style={[StyleSheet.absoluteFill, { justifyContent: "center" }]}>
        <Text style={styles.title}>자산 그래프</Text>
      </View>
    </View>
  );
};
