import type { SharedValue } from "react-native-reanimated";

import { withDecay } from "react-native-reanimated";
import { Gesture } from "react-native-gesture-handler";
import Animated, { useSharedValue, clamp } from "react-native-reanimated";
import { useMemo, useEffect } from "react";

export const useGraphTouchHandler = (
  x: Animated.SharedValue<number>,
  width: number
) => {
  const minGraphX = 30; // 최소 x 값
  const maxGraphX = 325; // 최대 x 값

  useEffect(() => {
    // 처음 랜더링 될 때 x 값의 초기 위치를 설정
    x.value = minGraphX;
  }, [x, minGraphX]);

  const gesture = useMemo(
    () =>
      Gesture.Pan()
        .onChange((pos) => {
          // 현재 x 값에 pos.x를 더한 후, 범위를 [minGraphX, maxGraphX]로 제한
          x.value = clamp(x.value + pos.x, minGraphX, maxGraphX);
        })
        .onEnd(({ velocityX }) => {
          // 감속 애니메이션을 적용하며 범위를 [minGraphX, maxGraphX]로 제한
          x.value = withDecay({
            velocity: velocityX,
            clamp: [minGraphX, maxGraphX],
          });
        }),
    [width, x]
  );
  return gesture;
};
