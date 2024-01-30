import React from "react";
import { Text, View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import {
  Canvas,
  Group,
  LinearGradient,
  RoundedRect,
  mix,
  vec,
} from "@shopify/react-native-skia";
import type { SharedValue } from "react-native-reanimated";
import { useDerivedValue, withTiming } from "react-native-reanimated";

import type { Graphs } from "../Model";

const buttonWidth = 81;
const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  container: {
    borderRadius: 16,
    flexDirection: "row",
    top: 5
  },
  button: {
    height: 44,
    width: buttonWidth,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
  label: {
    fontFamily: "Helvetica",
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
});

export interface GraphState {
  next: number;
  current: number;
}

interface SelectionProps {
  state: SharedValue<GraphState>;
  transition: SharedValue<number>;
  graphs: Graphs;
}

export const Selection = ({ state, transition, graphs }: SelectionProps) => {
  const transform = useDerivedValue(() => {
    const { current, next } = state.value;
    return [
      {
        translateX: mix(
          transition.value,
          current * buttonWidth,
          next * buttonWidth
        ),
      },
    ];
  });
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <Canvas style={StyleSheet.absoluteFill}>
          <Group transform={transform}>
            <RoundedRect x={0} y={0} height={44} width={buttonWidth} r={16}>
              <LinearGradient
                colors={["#2a8ff7", "#6c60f1"]}
                start={vec(0, 0)}
                end={vec(buttonWidth, 64)}
              />
            </RoundedRect>
          </Group>
        </Canvas>
        {graphs.map((graph, index) => (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => {
              state.value = { current: state.value.next, next: index };
              transition.value = 0;
              transition.value = withTiming(1, {
                duration: 750,
              });
            }}
          >
            <View style={styles.button}>
              <Text style={styles.label}>{graph.label}</Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    </View>
  );
};
