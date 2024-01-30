import { useFont, Text } from "@shopify/react-native-skia";
import React from "react";
import type { SharedValue } from "react-native-reanimated";
import { interpolate, useDerivedValue } from "react-native-reanimated";

import type { Graphs } from "../Model";
import { PADDING } from "../Model";

import type { GraphState } from "./Selection";

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
    const title = '원'; // "원" 텍스트는 항상 고정된 x 좌표에 있습니다.
    const titleWidth = titleFont.getTextWidth(title);
  
    // 숫자 부분의 텍스트 폭 계산
    const numericPart = format(graph.data.maxPrice);
    const numericPartWidth = titleFont.getTextWidth(numericPart);
  
    // "원" 텍스트의 x 좌표를 고정하고 숫자 부분에 맞게 조절합니다.
    return width / 1.2 - numericPartWidth; // 또는 다른 조절 방식에 따라 적절히 조정하십시오.
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
