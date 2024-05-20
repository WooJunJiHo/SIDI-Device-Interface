export const filterPriceList = (list, asset, condition) => {

    // 예측된 모델 필터링   
    const modelList = list.filter((item) => item.AssetsName == asset)

    const conditionList = modelList.filter((item) => item.CONDITIONS == condition)


    let statList;
    if(conditionList.length == 0 || conditionList.length == 1){
        statList = modelList;
    } else {
        statList = conditionList;
    }

    // 날짜를 기준으로 오름차순으로 정렬
    statList.sort((a, b) => new Date(a.DATE) - new Date(b.DATE));


    // 빈 날짜 채우기
    const filledData = [];
    const earliestDate = new Date(statList[0].DATE);
    const latestDate = new Date(statList[statList.length - 1].DATE);

    let currentDate = new Date(earliestDate);

    while (currentDate <= latestDate) {
        const currentDateISO = currentDate.toISOString();
        const existingData = statList.find(item => item.DATE === currentDateISO);

        if (existingData) {
            filledData.push(existingData);
        } else {
            const previousDay = new Date(currentDate);
            previousDay.setDate(previousDay.getDate() - 1);
            const previousDayISO = previousDay.toISOString();
            const previousData = filledData.find(item => item.DATE === previousDayISO);

            if (previousData) {
                const newData = { ...previousData, DATE: currentDateISO };
                filledData.push(newData);
            }
        }

        currentDate.setDate(currentDate.getDate() + 1);
    }


    // 변환된 데이터
    const transformedData = filledData.map(item => ({
        value: Math.floor(item.PRICE),
        date: new Date(item.DATE).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    }));

    return transformedData;
}



export const priceAverage = (list) => {
    // 평균 가격 구하기
    const totalValue = list.reduce((acc, cur) => acc + cur.value, 0);
    const averageValue = totalValue / list.length;

    // 100원 단위에서 반올림
    const roundedAverageValue = Math.round(averageValue / 100) * 100;

    return roundedAverageValue
}



//배열에서 가장 비싼 값 찾기
export function subtractMaxValue(data) {
    // 데이터에서 value 속성만 추출하여 배열로 만듭니다.
    const values = data.map(item => item.value);
    
    // 배열에서 최대값을 찾습니다.
    const maxValue = Math.max(...values);
    
    return maxValue;
}