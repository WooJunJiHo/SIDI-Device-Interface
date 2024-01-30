import React, { useMemo } from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import {
  Canvas,
  Path,
  Group,
  LinearGradient,
  vec,
} from "@shopify/react-native-skia";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import { GestureDetector, ScrollView } from "react-native-gesture-handler";

import { PADDING, COLORS, getGraph } from "./Model";
import { getYForX } from "./Math";
import { Cursor } from "./components/Cursor";
import { Selection } from "./components/Selection";
import { Header } from "./components/Header";
import { Label } from "./components/Label";
import { useGraphTouchHandler } from "./components/useGraphTouchHandler";

const touchableCursorSize = 80;

const LineGraph = () => {
  const window = useWindowDimensions();
  const { width } = window;
  const height = Math.min(window.width, window.height) / 4;
  const translateY = 30;
  const graphs = useMemo(() => getGraph(width, height, 20, 330), [width, height]);
  // animation value to transition from one graph to the next
  const transition = useSharedValue(0);
  // indicices of the current and next graphs
  const state = useSharedValue({
    next: 0,
    current: 0,
  });
  // path to display
  const path = useDerivedValue(() => {
    const { current, next } = state.value;
    const start = graphs[current].data.path;
    const end = graphs[next].data.path;
    return end.interpolate(start, transition.value)!;
  });
  // x and y values of the cursor
  const x = useSharedValue(0);
  const y = useDerivedValue(() => getYForX(path.value.toCmds(), x.value));
  const gesture = useGraphTouchHandler(x, width);
  const style = useAnimatedStyle(() => {
    return {
      position: "absolute",
      width: touchableCursorSize,
      height: touchableCursorSize,
      left: x.value - touchableCursorSize / 2,
      top: translateY + y.value - touchableCursorSize / 2,
    };
  });

  const graphAndOthersTransform = [{ translateY: translateY }]
  const isScrollEnabled = false;

  return (
    <ScrollView scrollEnabled={isScrollEnabled}>
      <Header />

      <View>
        <Canvas style={{ width, height: 200, transform: graphAndOthersTransform}}>
          <Label
            state={state}
            y={y}
            graphs={graphs}
            width={width}
            height={height}
          />
          <Group transform={[{ translateY }]}>
            <Path
              style="stroke"
              path={path}
              strokeWidth={4}
              strokeJoin="round"
              strokeCap="round"
            >
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: width, y: 0 }}
                colors={COLORS}
              />
            </Path>
            <Cursor x={x} y={y} width={width} />
          </Group>
        </Canvas>
        <GestureDetector gesture={gesture}>
          <Animated.View style={style} />
        </GestureDetector>
      </View>
      <Selection state={state} transition={transition} graphs={graphs} />
    </ScrollView>
  );
};

export default LineGraph;