import { useFont, Text } from "@shopify/react-native-skia";
import React from "react";
import type { SharedValue } from "react-native-reanimated";
import { interpolate, useDerivedValue } from "react-native-reanimated";

import type { Graphs } from "../Model";
import { PADDING } from "../Model";

import type { GraphState } from "./Selection";

import { View, StyleSheet, TouchableWithoutFeedback, Image } from "react-native";

const Pretendard = require("../../../assets/fonts/PretendardVariable.ttf");
const format = (value: number) => {
  "worklet";
  return (
    Math.round(value)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
      + "원"
  );
};



interface LabelProps {
  y: SharedValue<number>;
  state: SharedValue<GraphState>;
  graphs: Graphs;
  width: number;
  height: number;
}

export const Label = ({ state, y, graphs, width, height }: LabelProps) => {
  const titleFont = useFont(Pretendard, 18);
  const translateY = height + 50;
  const AJUSTED_SIZE = height - PADDING * 2;
  const text = useDerivedValue(() => {
    const graph = graphs[state.value.current];
    return format(
      interpolate(
        y.value,
        [0, AJUSTED_SIZE],
        [graph.data.maxPrice, graph.data.minPrice]
      )
    );
  }, [y, state]);

  const titleX = useDerivedValue(() => {
    if (!titleFont) {
      return 0;
    }
    const graph = graphs[state.value.current];
    const title = format(graph.data.maxPrice);
    const titleWidth = titleFont.getTextWidth(title);
    return width / 1.35 - titleWidth / 2;
  }, [state, titleFont]);

  return (
    <>
      <Text
        x={titleX}
        y={translateY}
        text={text}
        font={titleFont}
        color="white"
      />
    </>
  );
};

