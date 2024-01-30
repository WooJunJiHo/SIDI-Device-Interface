import React from 'react';
import { View, Text, Image } from 'react-native';
import { BarChart, LineChart } from 'react-native-gifted-charts';

const BarGraph = () => {
  const barData = [
    {
      value: 40,
      label: '핸드폰',
      spacing: 42,
      labelTextStyle: { color: '#DBDBDB' },
    },
    {
      value: 50,
      label: '이어폰',
      spacing: 42,
      labelTextStyle: { color: '#DBDBDB' },
    },
    {
      value: 75,
      label: '컴퓨터',
      spacing: 42,
      labelTextStyle: { color: '#DBDBDB' },
    },
    {
      value: 30,
      label: '태블릿',
      spacing: 42,
      labelTextStyle: { color: '#DBDBDB' },
    },
    {
      value: 60,
      label: '모니터',
      spacing: 42,
      labelTextStyle: { color: '#DBDBDB' },
    },
    {
      value: 65,
      label: '마우스',
      spacing: 42,
      labelTextStyle: { color: '#DBDBDB' },
    },
  ];

  const renderTitle = () => {
    return (
      <View style={{ marginVertical: 20, flexDirection: 'row', left: 20, alignItems: 'flex-start' }}>
        <Image
          source={require('../../assets/icons/BarGraph.png')}
        />
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            fontWeight: 'light',
            left: 12,
          }}>
          자산 비율
        </Text>
      </View>
    )
  }

  return (
    <View
      style={{
        paddingBottom: 40,
        height: 310,
      }}>
      {renderTitle()}
      <BarChart
        data={barData}
        barWidth={10}
        spacing={30}
        barMarginBottom={8}
        roundedTop
        hideRules
        showGradient
        frontColor={'#538dfe'}
        gradientColor={'#6c60f1'}
        xAxisThickness={0}
        isAnimated={true}
        animationDuration={1200}
        yAxisThickness={0}
        hideYAxisText
        disablePress
      />
    </View>
  );
};

export default BarGraph;