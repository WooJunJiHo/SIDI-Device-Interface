/**
 * 자산명과 조건에 따라 가격 목록을 필터링하고, 빈 날짜를 채운 후
 * 동일 날짜의 가격을 평균 내어 변환된 데이터를 반환합니다.
 * 
 * @param {Array} list - 가격 데이터 객체 배열.
 * @param {string} asset - 필터링할 자산명.
 * @param {string} condition - 필터링할 조건.
 * @returns {Array} 변환된 가격 데이터 객체 배열.
 */
export const filterPriceList = (list, asset, condition) => {
    // 자산명에 따른 모델 필터링
    const modelList = list.filter((item) => item.AssetsName === asset);

    // 조건에 따른 필터링
    const conditionList = modelList.filter((item) => item.CONDITIONS === condition);

    let statList;
    if (conditionList.length === 0 || conditionList.length === 1) {
        statList = modelList;
    } else {
        statList = conditionList;
    }

    // 날짜를 기준으로 오름차순 정렬
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

    // 같은 날짜의 데이터를 합산하고 개수로 나누어 평균을 계산한 후, 평균 값을 가지고 있는 배열 생성
    const transformedData = filledData.reduce((acc, item) => {
        const dateKey = new Date(item.DATE).toLocaleDateString();
        if (!acc[dateKey]) {
            acc[dateKey] = { totalPrice: item.PRICE, count: 1 };
        } else {
            acc[dateKey].totalPrice += item.PRICE;
            acc[dateKey].count++;
        }
        return acc;
    }, {});

    // 평균 계산 및 데이터 형식 변환
    const averagedData = Object.keys(transformedData).map(dateKey => ({
        value: transformedData[dateKey].totalPrice / transformedData[dateKey].count,
        date: dateKey
    }));

    return averagedData;
};

/**
 * 가격 데이터 객체 배열에서 평균 가격을 계산하고, 100원 단위로 반올림합니다.
 * 
 * @param {Array} list - 변환된 가격 데이터 객체 배열.
 * @returns {number} 반올림된 평균 가격.
 */
export const priceAverage = (list) => {
    // 평균 가격 구하기
    const totalValue = list.reduce((acc, cur) => acc + cur.value, 0);
    const averageValue = totalValue / list.length;

    // 100원 단위에서 반올림
    const roundedAverageValue = Math.round(averageValue / 100) * 100;

    return roundedAverageValue;
};

/**
 * 가격 데이터 객체 배열에서 최대 값을 찾습니다.
 * 
 * @param {Array} data - 변환된 가격 데이터 객체 배열.
 * @returns {number} 최대 가격 값.
 */
export function subtractMaxValue(data) {
    // 데이터에서 value 속성만 추출하여 배열로 만듭니다.
    const values = data.map(item => item.value);

    // 배열에서 최대값을 찾습니다.
    const maxValue = Math.max(...values);

    return maxValue;
}
