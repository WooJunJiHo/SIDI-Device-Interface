import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from "react-native-gifted-charts";
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const Chart = (props) => {
  const ptData = props.ptData

  const spacing = (width / ptData.length) -13;

  return (
    <View
      style={{
        marginTop: 80,
        marginLeft: 50,
      }}>
      <LineChart
        style={styles.chart}
        areaChart
        data={ptData}
        rotateLabel={false}
        width={width}
        hideDataPoints={true}
        spacing={spacing}
        rulesType="none"
        color="#00FF80"
        thickness={6}
        startOpacity={0}
        endOpacity={0}
        initialSpacing={36}
        noOfSections={6}
        maxValue={1500000}
        yAxisThickness={0}
        rulesColor="#fafafa"
        xAxisThickness={0}
        xAxisLabelsHeight={20}
        yAxisLabelWidth={0}
        yAxisSide='right'
        xAxisColor="#111111"
        disableScroll={true}
        curved={true}
        lineGradient={true}
        lineGradientStartColor='#CE9FFC'
        lineGradientEndColor='#7367F0'
        pointerConfig={{
          pointerStripHeight: 150,
          pointerStripColor: '#6C60F1',
          pointerStripWidth: 2,
          pointerColor: '#6C60F1',
          radius: 6,
          pointerLabelWidth: 100,
          pointerLabelHeight: 90,
          activatePointersOnLongPress: true,
          autoAdjustPointerLabelPosition: false,

          pointerLabelComponent: items => {

            return (
              <View
                style={{
                  height: 150,
                  width: 70,
                  justifyContent: 'center',
                  marginTop: -50,
                  marginLeft: -25,
                }}>
                <Text style={{ color: '#111111', fontSize: 14, marginBottom: 10, textAlign: 'center' }}>
                  {items[0].date}
                </Text>
                

                <View style={{ paddingHorizontal: 14, paddingVertical: 6, borderRadius: 16, backgroundColor: '#6C60F1', width: 70 }}>
                  <Text style={{ fontWeight: 'bold', textAlign: 'center', color: '#FFFFFF' }}>
                    {'$' + items[0].value + '.0'}
                  </Text>
                </View>
              </View>
            );
          },
        }}
      />
    </View>
  );
};

export default Chart;

const styles = StyleSheet.create({
  chart: {
    overflow: 'visible',
  },
});